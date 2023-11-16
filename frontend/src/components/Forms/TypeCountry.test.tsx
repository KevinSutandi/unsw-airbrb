import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import axios from 'axios';
import { CountryList } from './TypeCountry';

jest.mock('axios');

describe('CountryList', () => {
  const mockProps = {
    selectedCountry: null,
    setSelectedCountry: jest.fn(),
  };

  const mockCountries = [
    { name: { common: 'Australia' } },
    { name: { common: 'Canada' } },
    { name: { common: 'United States' } },
  ];

  beforeEach(() => {
    (axios.get as jest.Mock).mockResolvedValue({ data: mockCountries });
  });

  it('renders the component with correct props', async () => {
    await act(async () => {
      render(<CountryList {...mockProps} />);
    });

    const input = screen.getByRole('combobox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('');
    expect(screen.queryByText('Nothing found.')).not.toBeInTheDocument();
    expect(screen.queryByText('Australia')).not.toBeInTheDocument();
    expect(screen.queryByText('Canada')).not.toBeInTheDocument();
    expect(screen.queryByText('United States')).not.toBeInTheDocument();
  });

  it('displays the list of countries when input is clicked', async () => {
    await act(async () => {
      render(<CountryList {...mockProps} />);
    });

    await act(async () => {
      const button = screen.getByRole('button', { name: /toggle/i });
      fireEvent.click(button);
    });

    const list = screen.getByRole('listbox');

    expect(screen.queryByText('Nothing found.')).not.toBeInTheDocument();
    expect(list).toHaveTextContent('Australia');
    expect(list).toHaveTextContent('Canada');
    expect(list).toHaveTextContent('United States');
  });

  it('filters the list of countries when input is typed in', async () => {
    await act(async () => {
      render(<CountryList {...mockProps} />);
    });

    const input = screen.getByRole('combobox');

    await act(async () => {
      fireEvent.click(input);
      fireEvent.change(input, { target: { value: 'au' } });
    });

    const list = screen.getByRole('listbox');

    expect(screen.queryByText('Nothing found.')).not.toBeInTheDocument();
    expect(list).toHaveTextContent('Australia');
    expect(list).not.toHaveTextContent('Canada');
    expect(list).not.toHaveTextContent('United States');
  });

  it('displays "Nothing found." when no countries match the input', async () => {
    await act(async () => {
      render(<CountryList {...mockProps} />);
    });

    const input = screen.getByRole('combobox');

    await act(async () => {
      fireEvent.click(input);
      fireEvent.change(input, { target: { value: 'zs' } });
    });

    const list = screen.getByRole('listbox');

    expect(screen.queryByText('Nothing found.')).toBeInTheDocument();
    expect(list).not.toHaveTextContent('Australia');
    expect(list).not.toHaveTextContent('Canada');
    expect(list).not.toHaveTextContent('United States');
  });

  it('calls setSelectedCountry when a country is selected', async () => {
    await act(async () => {
      render(<CountryList {...mockProps} />);
    });

    const input = screen.getByRole('combobox');

    await act(async () => {
      fireEvent.click(input);
      fireEvent.change(input, { target: { value: 'au' } });
    });

    const list = screen.getByRole('listbox');

    await act(async () => {
      fireEvent.click(screen.getByText('Australia'));
    });

    const toBeCalled = {
      name: 'Australia',
      id: 'Australia'
    }

    expect(mockProps.setSelectedCountry).toHaveBeenCalledTimes(1);
    expect(mockProps.setSelectedCountry).toHaveBeenCalledWith(toBeCalled);
  });
});
