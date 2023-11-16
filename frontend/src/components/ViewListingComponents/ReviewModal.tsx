import React, { Fragment, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { StarIcon } from '@heroicons/react/24/outline';
import { getToken } from '../../utils/auth';
import { makeRequest } from '../../utils/axiosHelper';

type ReviewModalProps = {
  open: boolean;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
  listingId: string | undefined;
  bookingId: string;
};

export default function ReviewModal ({
  open,
  onClose,
  listingId,
  bookingId,
}: ReviewModalProps) {
  const cancelButtonRef = useRef(null);
  const [reviewForm, setReviewForm] = useState({
    rating: 1,
    textValue: '',
  });

  const handleSubmitReview = async () => {
    const token = getToken();
    if (token && listingId) {
      try {
        const body = { review: reviewForm };
        await makeRequest('PUT', `listings/${listingId}/review/${bookingId}`, {
          token,
          ...body,
        });
        onClose(false);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={onClose}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 flex items-center justify-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="relative w-full max-w-sm p-6 bg-white rounded-lg shadow-xl">
              <div className="text-center flex flex-col">
                <Dialog.Title
                  as="h3"
                  className="text-2xl font-semibold leading-6 text-gray-900 text-left mb-5"
                >
                  How was your experience?
                </Dialog.Title>
                <div className="flex">
                  {Array.from({ length: 5 }, (_, index) => (
                    <StarIcon
                      key={index}
                      data-testid={`star-${index + 1}`}
                      onClick={() =>
                        setReviewForm((prev) => ({
                          ...prev,
                          rating: index + 1,
                        }))
                      }
                      className={`${
                        index < reviewForm.rating
                          ? 'fill-yellow-500'
                          : 'fill-white'
                      } cursor-pointer`}
                    />
                  ))}
                </div>
                <textarea
                  className="w-full h-32 mt-5"
                  placeholder="Leave a review"
                  value={reviewForm.textValue}
                  onChange={(e) =>
                    setReviewForm((prev) => ({
                      ...prev,
                      textValue: e.target.value,
                    }))
                  }
                ></textarea>
                <button
                  onClick={handleSubmitReview}
                  className="ml-auto mt-5 inline-block rounded-md disabled:opacity-40 disabled:bg-blue-600 bg-blue-600 px-5 py-3 text-center text-xl font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Submit
                </button>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
