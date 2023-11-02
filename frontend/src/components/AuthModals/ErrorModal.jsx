import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
// eslint-disable-next-line no-unused-vars
import { XMarkIcon } from '@heroicons/react/24/outline';

export default function ErrorModals ({ open, onClose, errorMessage }) {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
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
              <div className='group absolute top-1 right-1 z-12 p-2 cursor-pointer rounded-lg hover:bg-gray-300'>
                <XMarkIcon
                  className="w-5 h-5 text-gray-500 group-hover:text-gray-800"
                  onClick={onClose}
                ></XMarkIcon>
              </div>

              <div className="text-center">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-semibold leading-6 text-gray-900 mt-4"
                >
                  {errorMessage}
                </Dialog.Title>
              </div>

              <div className="mt-6"></div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
