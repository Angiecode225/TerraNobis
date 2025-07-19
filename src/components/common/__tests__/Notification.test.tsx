import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import Notification from '../Notification';

describe('Notification Component', () => {
  const mockOnClose = jest.fn();
  const defaultProps = {
    id: 'test-id',
    type: 'success' as const,
    title: 'Test Title',
    message: 'Test Message',
    onClose: mockOnClose
  };

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders with correct content', () => {
    render(<Notification {...defaultProps} />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Message')).toBeInTheDocument();
  });

  it('displays correct icon for success type', () => {
    render(<Notification {...defaultProps} type="success" />);
    const icon = screen.getByTestId('success-icon');
    expect(icon).toBeInTheDocument();
  });

  it('displays correct icon for error type', () => {
    render(<Notification {...defaultProps} type="error" />);
    const icon = screen.getByTestId('error-icon');
    expect(icon).toBeInTheDocument();
  });

  it('displays correct icon for warning type', () => {
    render(<Notification {...defaultProps} type="warning" />);
    const icon = screen.getByTestId('warning-icon');
    expect(icon).toBeInTheDocument();
  });

  it('displays correct icon for info type', () => {
    render(<Notification {...defaultProps} type="info" />);
    const icon = screen.getByTestId('info-icon');
    expect(icon).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    render(<Notification {...defaultProps} />);
    const closeButton = screen.getByRole('button');
    fireEvent.click(closeButton);
    expect(mockOnClose).toHaveBeenCalledWith('test-id');
  });

  it('auto-closes after specified duration', () => {
    render(<Notification {...defaultProps} duration={3000} />);
    
    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(mockOnClose).toHaveBeenCalledWith('test-id');
  });

  it('applies correct styling for success type', () => {
    render(<Notification {...defaultProps} type="success" />);
    const notification = screen.getByRole('alert');
    expect(notification).toHaveClass('border-green-200', 'bg-green-50');
  });

  it('applies correct styling for error type', () => {
    render(<Notification {...defaultProps} type="error" />);
    const notification = screen.getByRole('alert');
    expect(notification).toHaveClass('border-red-200', 'bg-red-50');
  });

  it('applies correct styling for warning type', () => {
    render(<Notification {...defaultProps} type="warning" />);
    const notification = screen.getByRole('alert');
    expect(notification).toHaveClass('border-yellow-200', 'bg-yellow-50');
  });

  it('applies correct styling for info type', () => {
    render(<Notification {...defaultProps} type="info" />);
    const notification = screen.getByRole('alert');
    expect(notification).toHaveClass('border-blue-200', 'bg-blue-50');
  });

  it('animates in on mount', () => {
    render(<Notification {...defaultProps} />);
    const notification = screen.getByRole('alert');
    
    act(() => {
      jest.advanceTimersByTime(100);
    });

    expect(notification).toHaveClass('translate-x-0', 'opacity-100');
  });

  it('animates out before calling onClose', () => {
    render(<Notification {...defaultProps} duration={3000} />);
    const notification = screen.getByRole('alert');
    
    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(notification).toHaveClass('translate-x-full', 'opacity-0');
  });
}); 