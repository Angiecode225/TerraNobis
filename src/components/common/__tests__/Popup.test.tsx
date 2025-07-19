import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Popup from '../Popup';

describe('Popup Component', () => {
  const mockOnClose = jest.fn();
  const defaultProps = {
    isOpen: true,
    onClose: mockOnClose,
    children: <div>Test content</div>
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders when isOpen is true', () => {
    render(<Popup {...defaultProps} />);
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('does not render when isOpen is false', () => {
    render(<Popup {...defaultProps} isOpen={false} />);
    expect(screen.queryByText('Test content')).not.toBeInTheDocument();
  });

  it('renders with title when provided', () => {
    render(<Popup {...defaultProps} title="Test Title" />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('calls onClose when backdrop is clicked', () => {
    render(<Popup {...defaultProps} />);
    const backdrop = screen.getByRole('presentation');
    fireEvent.click(backdrop);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when close button is clicked', () => {
    render(<Popup {...defaultProps} title="Test Title" />);
    const closeButton = screen.getByRole('button');
    fireEvent.click(closeButton);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('applies correct size classes', () => {
    const { rerender } = render(<Popup {...defaultProps} size="sm" />);
    const modal = screen.getByRole('dialog');
    expect(modal).toHaveClass('max-w-md');

    rerender(<Popup {...defaultProps} size="md" />);
    expect(modal).toHaveClass('max-w-2xl');

    rerender(<Popup {...defaultProps} size="lg" />);
    expect(modal).toHaveClass('max-w-4xl');

    rerender(<Popup {...defaultProps} size="xl" />);
    expect(modal).toHaveClass('max-w-6xl');
  });

  it('prevents body scroll when open', () => {
    render(<Popup {...defaultProps} />);
    expect(document.body.style.overflow).toBe('hidden');
  });

  it('restores body scroll when closed', () => {
    const { unmount } = render(<Popup {...defaultProps} />);
    unmount();
    expect(document.body.style.overflow).toBe('unset');
  });
}); 