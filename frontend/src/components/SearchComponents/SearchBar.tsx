import React from 'react';
import { SingleDetailListing } from '../../types/types';
import { useNavigate } from 'react-router-dom';

interface SearchFormProps {
  detailedListings: SingleDetailListing[],
  setProducts: React.Dispatch<React.SetStateAction<SingleDetailListing[]>>
  setIsFiltered: React.Dispatch<React.SetStateAction<boolean>>
}

function SearchForm ({ detailedListings, setProducts, setIsFiltered }: SearchFormProps) {
  const navigate = useNavigate()

  const [showError, setShowError] = React.useState(false);

  async function filterTitleCity (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    event.preventDefault();
    const searchTerm = (document.getElementById('default-search') as HTMLInputElement)?.value.trim();

    if (!searchTerm) {
      setShowError(true);
      return;
    }

    const searchTermsArray = searchTerm.split(' ');

    const filteredProducts = detailedListings.filter((product) => {
      const title = product.title.toLowerCase();
      const city = product.address.city.toLowerCase();

      // Check if all search terms are included in the title or city
      return searchTermsArray.every((term) =>
        title.includes(term.toLowerCase()) || city.includes(term.toLowerCase())
      );
    });

    setProducts(filteredProducts);
    setShowError(false);
    navigate('/')
    setIsFiltered(true);
  }

  return (
    <form>
      <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only">
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="search"
          id="default-search"
          className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
          placeholder="Search by Title or City"
          required
        />
        <button
          type="submit"
          onClick={(e) => { filterTitleCity(e) }}
          className="text-white absolute end-2.5 bottom-2.5 bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
        >
          Search
        </button>
      </div>
      {showError && (
      <div className="text-red-500 text-sm mt-2">
        Please enter a search term
      </div>
      )}
    </form>

  );
}

export default SearchForm;
