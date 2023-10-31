import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';

function SearchBar () {
  const [isOpen, setIsOpen] = useState(false);
  const openSearchDialog = () => setIsOpen(true);
  const closeSearchDialog = () => setIsOpen(false);

  const handleSearch = (query) => {
    // Replace this with your search functionality
    console.log(`Searching for: ${query}`);
  };

  return (
    <div className="relative">
      <button
        className="bg-blue-500 text-white p-2 rounded-full"
        onClick={openSearchDialog}
      >
        Search
      </button>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        open={isOpen}
        onClose={closeSearchDialog}
      >
        <div className="min-h-screen px-4 text-center">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

          <div className="flex justify-center items-center min-h-screen">
            <div className="w-full max-w-md p-4">
              <Dialog.Title className="text-2xl font-semibold">
                Search
              </Dialog.Title>
              <div className="mt-4">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full px-4 py-2 rounded-md border"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleSearch(e.target.value);
                      closeSearchDialog();
                    }
                  }}
                />
              </div>
              <div className="mt-4">
                <button
                  onClick={closeSearchDialog}
                  className="bg-red-500 text-white p-2 rounded-md"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export default SearchBar;
