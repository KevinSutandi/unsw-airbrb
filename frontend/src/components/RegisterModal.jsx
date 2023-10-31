import React, { Fragment, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { UserIcon } from '@heroicons/react/24/outline';

export default function RegisterModal ({ open, onClose, openLoginModal }) {
  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={onClose}>
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
              <div className="text-center">
                <UserIcon className="h-12 w-12 mx-auto text-blue-400" aria-hidden="true" />
                <Dialog.Title as="h3" className="text-lg font-semibold leading-6 text-gray-900 mt-4">
                  Login
                </Dialog.Title>
              </div>

              <div className="mt-6">
                <form className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="mt-1 p-2 block w-full rounded-md border border-gray-300"
                      placeholder="youremail@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                      Name
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      className="mt-1 p-2 block w-full rounded-md border border-gray-300"
                      placeholder="********"
                    />
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      className="mt-1 p-2 block w-full rounded-md border border-gray-300"
                      placeholder="********"
                    />
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      className="mt-1 p-2 block w-full rounded-md border border-gray-300"
                      placeholder="********"
                    />
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
                    >
                      Register
                    </button>
                  </div>
                </form>
              </div>

              <div className="mt-6">
                <p className="text-sm text-gray-500">
                  Already have an account                   <button
                    onClick={openLoginModal}
                    className='text-sm text-gray-500 hover:text-blue-600 hover:underline'
                  >Login</button>
                </p>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
