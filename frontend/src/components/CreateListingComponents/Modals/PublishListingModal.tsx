import React, { Fragment, useEffect, useRef, useState } from 'react';
import { Availability, DeleteListingProps } from '../../../types/types';
import { Dialog, Transition } from '@headlessui/react';
import DateForm from '../../Forms/DateForm';
import { getToken } from '../../../utils/auth';
import { makeRequest } from '../../../utils/axiosHelper';
import axios from 'axios';

export default function PublishListingModal ({
  open,
  setOpen,
  listingId,
  setErrorModalOpen,
  setErrorMessage,
  setRunEffect,
}: DeleteListingProps) {
  const cancelButtonRef = useRef(null);

  const [availability, setAvailability] = useState<Availability[]>([
    { from: '', to: '' },
  ]);

  const [availabilityErrors, setAvailabilityErrors] = useState<string[]>([]);
  const [disabled, setDisabled] = useState(false)

  // Reset the date input when modal is closed
  useEffect(() => {
    if (!open) {
      setAvailability([{ from: '', to: '' }]);
    }
  }, [open]);

  // Check for publish button state
  useEffect(() => {
    setDisabled(checkForErrors())
  }, [availabilityErrors])

  const handlePublishListing = async () => {
    if (listingId) {
      const token = getToken();
      if (token) {
        try {
          await makeRequest('PUT', `listings/publish/${listingId}`, {
            token,
            availability,
          });
          setOpen(false);
          setRunEffect(true);
        } catch (err) {
          setErrorModalOpen(true);
          if (axios.isAxiosError(err)) {
            if (err.response?.data) {
              setErrorMessage(err.response.data.error);
              console.error('Publish failed:', err.response.data.error);
            }
          } else {
            setErrorMessage('An unexpected error occurred.');
            console.error('Publish listing failed:', err);
          }
        }
      }
    }
  };

  const handleDateChange = (
    idx: number,
    field: 'from' | 'to',
    value: string
  ) => {
    setAvailability((prev) => {
      const newDates = [...prev];
      const currentInput = newDates[idx];

      if (currentInput) {
        if (field === 'to' && new Date(value) < new Date(currentInput.from)) {
          const newErrors = [...availabilityErrors];
          newErrors[idx] = 'To date cannot be earlier than From date';
          setAvailabilityErrors(newErrors);
        } else if (
          field === 'from' &&
          new Date(value) > new Date(currentInput.from)
        ) {
          const newErrors = [...availabilityErrors];
          newErrors[idx] = 'To date cannot be earlier than From date';
          setAvailabilityErrors(newErrors);
        } else {
          const newErrors = [...availabilityErrors];
          // Clear error if input is valid
          newErrors[idx] = '';
          setAvailabilityErrors(newErrors);
        }
      }

      if (newDates[idx]) {
        newDates[idx] = { ...newDates[idx], [field]: value } as Availability;
      }
      return newDates;
    });
  };

  const checkForErrors = () => {
    return availabilityErrors.some(err => err === 'To date cannot be earlier than From date')
  }

  const removeAvailability = (idx: number) => {
    setAvailability((prev) => prev.filter((_, index) => index !== idx));
    setAvailabilityErrors((prev) => prev.filter((_, index) => index !== idx));
  };

  const addAvailability = () => {
    setAvailability((prev) => [...prev, { from: '', to: '' }]);
    setAvailabilityErrors((prev) => [...prev, '']);
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900"
                      >
                        Set availability
                      </Dialog.Title>
                      {availability.map((elem, idx) => (
                        <DateForm
                          key={idx}
                          fromValue={elem.from}
                          toValue={elem.to}
                          idx={idx}
                          removeAvailability={removeAvailability}
                          handleDateChange={handleDateChange}
                          errorMessage={availabilityErrors[idx] as string}
                        />
                      ))}
                      <button
                        onClick={addAvailability}
                        className="text-blue-500 mt-2.5 text-sm hover:underline"
                      >
                        + Add availability
                      </button>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto disabled:opacity-50"
                    onClick={handlePublishListing}
                    disabled={disabled}
                  >
                    Publish
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
