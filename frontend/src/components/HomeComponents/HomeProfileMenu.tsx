import { Menu, Transition } from '@headlessui/react';
import React, { Fragment } from 'react';
import ProfileIcon from '../../assets/profileIcon.svg';
import { HomeProfileMenuProps } from '../../types/types';

export default function HomeProfileMenu ({
  openLoginModal,
  openRegisterModal,
  isLoggedIn,
  handleLogout,
  navigateHostedListings,
}: HomeProfileMenuProps) {
  return (
    <div>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button
            className={`w-10 justify-center rounded-full h-10 px-4 py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 ${
              isLoggedIn
                ? 'bg-blue-500 hover:bg-black'
                : 'bg-black hover:bg-blue-500'
            }`}
          >
            <img src={ProfileIcon} alt="Profile Icon" className="w-6 h-6" />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
            <div className="px-1 py-1 ">
              {isLoggedIn
                ? (
                <>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? 'bg-blue-500 text-white' : 'text-gray-900'
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm font-bold`}
                        onClick={navigateHostedListings}
                        name='view-listings'
                      >
                        View Listings
                      </button>
                    )}
                  </Menu.Item>
                  <hr />
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={handleLogout}
                        className={`${
                          active ? 'bg-blue-500 text-white' : 'text-red-500'
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        name='logout'
                      >
                        Log out
                      </button>
                    )}
                  </Menu.Item>
                </>
                  )
                : (
                <>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? 'bg-blue-500 text-white' : 'text-gray-900'
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm font-bold`}
                        onClick={openRegisterModal}
                        name='register'
                      >
                        Sign up
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={openLoginModal}
                        className={`${
                          active ? 'bg-blue-500 text-white' : 'text-gray-900'
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        name='login'
                      >
                        Login
                      </button>
                    )}
                  </Menu.Item>
                </>
                  )}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
