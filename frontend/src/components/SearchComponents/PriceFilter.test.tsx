import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PriceFilter from './PriceFilter';
import { useNavigate } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('PriceFilter', () => {
  const mockProps = {
    minPrice: 0,
    setMinPrice: jest.fn(),
    maxPrice: 100,
    setMaxPrice: jest.fn(),
    detailedListings: [],
    setProducts: jest.fn(),
    setIsFiltered: jest.fn(),
  };

  beforeEach(() => {
    // Reset the mock before each test
    jest.clearAllMocks();

    // Mock the navigate function
    (useNavigate as jest.Mock).mockClear();
    (useNavigate as jest.Mock).mockReturnValue(jest.fn());

    render(<PriceFilter {...mockProps} />);
  });

  it('renders the component with correct props', () => {
    expect(screen.getByText('Minimum Price')).toBeInTheDocument();
    expect(screen.getByText('Maximum Price')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
  });

  it('calls setMinPrice when minimum price input is changed', () => {
    const minPriceInput = screen.getByTestId('minPrice');
    fireEvent.change(minPriceInput, { target: { value: '50' } });
    expect(mockProps.setMinPrice).toHaveBeenCalledTimes(1);
    expect(mockProps.setMinPrice).toHaveBeenCalledWith(50);
  });

  it('calls setMaxPrice when maximum price input is changed', () => {
    const maxPriceInput = screen.getByTestId('maxPrice');
    fireEvent.change(maxPriceInput, { target: { value: '200' } });
    expect(mockProps.setMaxPrice).toHaveBeenCalledTimes(1);
    expect(mockProps.setMaxPrice).toHaveBeenCalledWith(200);
  });

  it('calls setProducts, setIsFiltered, and navigate when search button is clicked', () => {
    const searchButton = screen.getByRole('button', { name: 'Search' });
    fireEvent.click(searchButton);
    expect(mockProps.setProducts).toHaveBeenCalledTimes(1);
    expect(mockProps.setIsFiltered).toHaveBeenCalledTimes(1);
    expect(mockProps.setIsFiltered).toHaveBeenCalledWith(true);
  });
});
