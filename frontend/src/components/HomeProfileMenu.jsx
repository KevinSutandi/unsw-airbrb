import { Menu, Transition } from '@headlessui/react';
import { Fragment, React } from 'react';
// import { ChevronDownIcon } from '@heroicons/react/20/solid';
import ProfileIcon from '../assets/profileIcon.svg'

export default function Example ({ onClick }) {
  return (
    <div className="hidden lg:flex lg:flex-1 lg:justify-end">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-12 justify-center rounded-full h-12 bg-black px-4 py-2 text-sm font-medium text-white hover:bg-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
            <img src={ProfileIcon} alt='Profile Icon' className="w-8 h-8" />
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
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? 'bg-blue-500 text-white' : 'text-gray-900'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm font-bold`}
                  >
                    Sign up
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button onClick={onClick}
                    className={`${
                      active ? 'bg-blue-500 text-white' : 'text-gray-900'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    Login
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
