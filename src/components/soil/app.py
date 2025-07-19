# app.py
# VERSION CORRIGÉE DU TypeError
# Prérequis : pip install Flask pandas Pillow scikit-learn

from flask import Flask, request, jsonify, redirect, url_for
from flask_cors import CORS
import pandas as pd
import numpy as np
from PIL import Image
from sklearn.cluster import KMeans
import os

# --- Initialisation ---
app = Flask(__name__)
CORS(app)
app.config['UPLOAD_FOLDER'] = 'uploads/'
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

# Charger la base de connaissances au démarrage
try:
    db_path = os.path.join(os.path.dirname(__file__), 'knowledge_base_afrique.csv')
    db = pd.read_csv(db_path)
    print("Base de connaissances chargée.")
except Exception as e:
    print(f"Erreur lors du chargement du CSV : {e}")
    db = None

# --- Fonctions de l'IA (Analyseur de Couleur) ---
def get_dominant_color(image_path, k=1):
    image = Image.open(image_path).convert('RGB')
    image = image.resize((100, 100)) 
    pixels = np.array(image).reshape(-1, 3)
    kmeans = KMeans(n_clusters=k, n_init=10, random_state=0)
    kmeans.fit(pixels)
    dominant_color = kmeans.cluster_centers_.astype(int)[0]
    return tuple(dominant_color)

def get_soil_type_from_color(rgb_tuple):
    r, g, b = rgb_tuple
    if r < 80 and g < 80 and b < 80:
        return "Vertisol"
    if r > g and r > b and r > 130 and b < 100:
        return "Ferrallitique"
    if r > b and g > b and (r - g) < 50 and r > 100:
        return "Ferrugineux"
    if abs(r - g) < 40 and abs(r - b) < 40 and abs(g - b) < 40:
        return "Hydromorphe"
    return "Ferrugineux"

# --- Routes de l'Application ---
@app.route('/')
def index():
    return "Index page"

@app.route('/predict', methods=['POST'])
def predict():
    try:
        if db is None:
            return jsonify({'error': "Erreur: La base de connaissances n'a pas pu être chargée."}), 500

        # 1. Récupérer les données du formulaire
        if 'soil_image' not in request.files:
            return jsonify({'error': 'Aucune image reçue.'}), 400
        file = request.files['soil_image']
        city = request.form['city']
        try:
            superficie_m2 = float(request.form['area'])
        except ValueError:
            superficie_m2 = 0
        if file.filename == '':
            return jsonify({'error': 'Aucun fichier sélectionné.'}), 400

        # 2. Sauvegarder l'image et déterminer le type de sol
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
        file.save(filepath)
        dominant_color_rgb = get_dominant_color(filepath)
        predicted_soil = get_soil_type_from_color(dominant_color_rgb)

        # 3. Logique de recherche avec fallback
        match_level_message = ""
        results = db[(db['type_de_sol'].str.lower() == predicted_soil.lower()) & (db['ville'].str.lower() == city.lower())]
        if not results.empty:
            match_level_message = "Résultat exact pour votre ville et type de sol."
        if results.empty:
            results = db[db['type_de_sol'].str.lower() == predicted_soil.lower()]
            if not results.empty:
                match_level_message = f"Note : Aucune donnée pour '{city}', voici une recommandation générale pour un sol de type '{predicted_soil}'."
        if results.empty:
            results = db[db['ville'].str.lower() == city.lower()]
            if not results.empty:
                match_level_message = f"Note : Type de sol non reconnu, voici une recommandation générale pour la région de '{city}'."

        # 4. Préparer les données pour l'affichage
        prediction_data = {
            'type_de_sol_predit': predicted_soil.capitalize(),
            'ville': city.capitalize(),
            'superficie': superficie_m2,
            'found': False
        }

        if not results.empty:
            results.loc[:, 'besoin_marche_val'] = results['besoin_marche'].map({'Forte': 3, 'Moyenne': 2, 'Faible': 1})
            best_choice = results.loc[results['besoin_marche_val'].idxmax()]
            rendement_base_t_ha = float(best_choice['rendement_par_hectare'])
            superficie_ha = superficie_m2 / 10000
            rendement_total = superficie_ha * rendement_base_t_ha
            prediction_data.update({
                'found': True,
                'match_level': str(match_level_message),
                'culture_optimale': str(best_choice['culture_recommandee']),
                'pH': float(best_choice['pH']),
                'N': float(best_choice['N']),
                'P': float(best_choice['P']),
                'K': float(best_choice['K']),
                'besoin_marche': str(best_choice['besoin_marche']),
                'type_engrais': str(best_choice['type_engrais']),
                'formule_NPK': str(best_choice['formule_NPK']),
                'frequence_application': str(best_choice['frequence_application']),
                'mode_application': str(best_choice['mode_application']),
                'rendement_estime': f"{rendement_total:.2f}"
            })
        else:
            prediction_data['found'] = False
            prediction_data['match_level'] = "Désolé, aucune information disponible pour ce contexte."

        # Retourne toujours du JSON pour React
        return jsonify(prediction_data)
    except Exception as e:
        print("Erreur dans /predict :", e)
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)