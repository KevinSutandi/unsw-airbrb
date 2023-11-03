import React, { Fragment, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { UserIcon } from '@heroicons/react/24/outline';
import { setEmail, setToken } from '../../utils/auth.js';
import { makeRequest } from '../../utils/axiosHelper.js';
import { AuthReturn, LoginModalProps } from '../../types/types.js';
import axios from 'axios';

export default function LoginModal ({
  open,
  setIsLoggedIn,
  onClose,
  openRegisterModal,
  setLoginModalOpen,
  setErrorMessage,
  setErrorModalOpen,
  setNewToken,
}: LoginModalProps) {
  const cancelButtonRef = useRef(null);
  const [formData, setFormData] = useState({ email: '', password: '' });

  function clearForm () {
    setFormData({ email: '', password: '' });
  }

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await makeRequest<AuthReturn>('POST', 'AUTH_LOGIN', formData);
      setToken(res.data.token);
      setEmail(formData.email);
      setIsLoggedIn(true);
      setNewToken(res.data.token);
      clearForm();
      setLoginModalOpen(false);
    } catch (err) {
      setErrorModalOpen(true);
      if (axios.isAxiosError(err)) {
        if (err.response?.data) {
          setErrorMessage(err.response.data.error);
          console.error('Login failed:', err.response.data.error);
        }
      } else {
        setErrorMessage('An unexpected error occurred.');
        console.error('Login failed:', err);
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
              <div className="text-center">
                <UserIcon
                  className="h-12 w-12 mx-auto text-blue-400"
                  aria-hidden="true"
                />
                <Dialog.Title
                  as="h3"
                  className="text-lg font-semibold leading-6 text-gray-900 mt-4"
                >
                  Login
                </Dialog.Title>
              </div>

              <div className="mt-6">
                <form className="space-y-4" onSubmit={handleLogin}>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="mt-1 p-2 block w-full rounded-md border border-gray-300"
                      placeholder="youremail@example.com"
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                      value={formData.email}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      className="mt-1 p-2 block w-full rounded-md border border-gray-300"
                      placeholder="********"
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          password: e.target.value,
                        }))
                      }
                      value={formData.password}
                    />
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
                    >
                      Login
                    </button>
                  </div>
                </form>
              </div>

              <div className="mt-6">
                <p className="text-sm text-gray-500">
                  Don&apos;t have an account?&nbsp;
                  <button
                    onClick={openRegisterModal}
                    className="text-sm text-blue-500 hover:text-blue-700 hover:underline"
                  >
                    Register
                  </button>
                </p>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
