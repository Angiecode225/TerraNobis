import React, { useEffect, useState } from 'react';

interface ConfettiProps {
  isActive: boolean;
}

const Confetti: React.FC<ConfettiProps> = ({ isActive }) => {
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    color: string;
    size: number;
    speed: number;
    angle: number;
  }>>([]);

  useEffect(() => {
    if (isActive) {
      // Créer des particules de confettis
      const newParticles = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * window.innerWidth,
        y: -20,
        color: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8'][Math.floor(Math.random() * 7)],
        size: Math.random() * 10 + 5,
        speed: Math.random() * 3 + 2,
        angle: Math.random() * 360
      }));
      
      setParticles(newParticles);

      // Animation des confettis
      const interval = setInterval(() => {
        setParticles(prev => 
          prev.map(particle => ({
            ...particle,
            y: particle.y + particle.speed,
            x: particle.x + Math.sin(particle.angle * Math.PI / 180) * 0.5,
            angle: particle.angle + 2
          })).filter(particle => particle.y < window.innerHeight + 50)
        );
      }, 50);

      return () => clearInterval(interval);
    }
  }, [isActive]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute w-2 h-2 rounded-full animate-bounce"
          style={{
            left: particle.x,
            top: particle.y,
            backgroundColor: particle.color,
            width: particle.size,
            height: particle.size,
            transform: `rotate(${particle.angle}deg)`
          }}
        />
      ))}
    </div>
  );
};

export default Confetti; 