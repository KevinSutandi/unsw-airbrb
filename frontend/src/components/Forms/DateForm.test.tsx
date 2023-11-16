import React, { fireEvent, render, screen } from '@testing-library/react';
import DateForm from './DateForm';

describe('DateForm', () => {
  const mockProps = {
    fromValue: '2022-01-01',
    toValue: '2022-01-02',
    idx: 0,
    removeAvailability: jest.fn(),
    handleDateChange: jest.fn(),
    errorMessage: '',
  };

  it('renders the component with correct props', () => {
    render(<DateForm {...mockProps} />);
    expect(screen.getByDisplayValue('2022-01-01')).toBeInTheDocument();
    expect(screen.getByDisplayValue('2022-01-02')).toBeInTheDocument();
  });

  it('calls handleDateChange when date input is changed', () => {
    render(<DateForm {...mockProps} />);
    const fromDateInput = screen.getByDisplayValue('2022-01-01');
    const toDateInput = screen.getByDisplayValue('2022-01-02');
    fireEvent.change(fromDateInput, { target: { value: '2022-01-03' } });
    fireEvent.change(toDateInput, { target: { value: '2022-01-04' } });
    expect(mockProps.handleDateChange).toHaveBeenCalledTimes(2);
    expect(mockProps.handleDateChange).toHaveBeenCalledWith(0, 'from', '2022-01-03');
    expect(mockProps.handleDateChange).toHaveBeenCalledWith(0, 'to', '2022-01-04');
  });

  it('calls removeAvailability when remove button is clicked', () => {
    render(<DateForm {...mockProps} />);
    const removeButton = screen.getByRole('button');
    fireEvent.click(removeButton);
    expect(mockProps.removeAvailability).toHaveBeenCalledTimes(1);
    expect(mockProps.removeAvailability).toHaveBeenCalledWith(0);
  });

  it('displays error message when errorMessage prop is not empty', () => {
    render(<DateForm {...mockProps} errorMessage="Invalid date range" />);
    expect(screen.getByText('Invalid date range')).toBeInTheDocument();
  });

  it('displays an error when from date is greater than to date', () => {
    render(<DateForm {...mockProps} fromValue="2022-01-03" toValue="2022-01-02" errorMessage="To date cannot be earlier than From date" />);
    expect(screen.getByText('To date cannot be earlier than From date')).toBeInTheDocument();
  });

  it('displays an error when no dates are filled', () => {
    render(<DateForm {...mockProps} fromValue="" toValue="" errorMessage="Please fill in the dates" />);
    expect(screen.getByText('Please fill in the dates')).toBeInTheDocument();
  });
});
