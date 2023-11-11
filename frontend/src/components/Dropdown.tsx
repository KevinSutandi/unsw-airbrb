import { Popover, Tab, Transition } from '@headlessui/react';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import React, { Fragment, useState } from 'react';
import SearchForm from './SearchComponents/SearchBar';
import Counter from './SearchComponents/Counter';
import MinMaxCounter from './SearchComponents/MinMaxCounter';

export default function Dropdown () {
  function classNames (...classes: string[]) {
    return classes.filter(Boolean).join(' ');
  }

  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);

  const [categories, setCategories] = useState({
    'Title / Country': [
      {
        id: 1,
        title: 'Does drinking coffee make you smarter?',
        date: '5h ago',
        commentCount: 5,
        shareCount: 2,
      },
      {
        id: 2,
        title: "So you've bought coffee... now what?",
        date: '2h ago',
        commentCount: 3,
        shareCount: 2,
      },
    ],
    'Number of Bedrooms': [
      {
        id: 1,
        title: 'Is tech making coffee better or worse?',
        date: 'Jan 7',
        commentCount: 29,
        shareCount: 16,
      },
      {
        id: 2,
        title: 'The most innovative things happening in coffee',
        date: 'Mar 19',
        commentCount: 24,
        shareCount: 12,
      },
    ],
    'Check in / Check out': [
      {
        id: 1,
        title: 'Ask Me Anything: 10 answers to your questions about coffee',
        date: '2d ago',
        commentCount: 9,
        shareCount: 5,
      },
      {
        id: 2,
        title: "The worst advice we've ever heard about coffee",
        date: '4d ago',
        commentCount: 1,
        shareCount: 2,
      },
    ],
    Price: [
      {
        id: 1,
        title: 'Ask Me Anything: 10 answers to your questions about coffee',
        date: '2d ago',
        commentCount: 9,
        shareCount: 5,
      },
      {
        id: 2,
        title: "The worst advice we've ever heard about coffee",
        date: '4d ago',
        commentCount: 1,
        shareCount: 2,
      },
    ],
  });

  return (
    <div>
      <Popover className='relative'>
        {({ open }) => (
          <>
            <Popover.Button className='border-1 w-full ring-1 ring-gray-500 md:w-auto py-2 rounded-full shadow-md hover:shadow-lg transition cursor-pointer'>
              <div className='flex flex-row item-center justify-between'>
                <div className='text-gray-900 flex flex-row gap-3 items-center text-xs md:text-base px-4'>
                  <MagnifyingGlassIcon className='h-4 w-4 md:h-5 md:w-5 inline-block' />{' '}
                  Search by category
                </div>
                <Transition
                  as={Fragment}
                  enter='transition ease-out duration-200'
                  enterFrom='opacity-0 translate-y-1'
                  enterTo='opacity-100 translate-y-0'
                  leave='transition ease-in duration-150'
                  leaveFrom='opacity-100 translate-y-0'
                  leaveTo='opacity-0 translate-y-1'
                >
                  {open
                    ? (
                    <div className='fixed z-40 inset-0 bg-gray-500 bg-opacity-50 transition-opacity' />
                      )
                    : (
                    <div />
                      )}
                </Transition>
              </div>
            </Popover.Button>
            <Transition
              as={Fragment}
              enter='transition ease-out duration-200'
              enterFrom='opacity-0 translate-y-1'
              enterTo='opacity-100 translate-y-0'
              leave='transition ease-in duration-150'
              leaveFrom='opacity-100 translate-y-0'
              leaveTo='opacity-0 translate-y-1'
            >
              <Popover.Panel className='absolute left-1/2 z-50 mt-3 w-screen max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl'>
                <Tab.Group>
                  <Tab.List className='flex space-x-1 rounded-xl bg-gray-500/90 p-1'>
                    {Object.keys(categories).map((category) => (
                      <Tab
                        key={category}
                        className={({ selected }) =>
                          classNames(
                            'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                            'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                            selected
                              ? 'bg-white shadow text-blue-700'
                              : 'text-gray-200 hover:bg-white/[0.12] hover:text-white'
                          )
                        }
                      >
                        {category}
                      </Tab>
                    ))}
                  </Tab.List>
                  <Tab.Panels className='mt-2'>
                    <Tab.Panel
                      key='titleCity'
                      className={classNames(
                        'rounded-xl bg-white p-5',
                        'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
                      )}
                    >
                      <SearchForm />
                    </Tab.Panel>

                    <Tab.Panel
                      key='bedrooms'
                      className={classNames(
                        'rounded-xl bg-white p-3',
                        'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
                      )}
                    >
                      <MinMaxCounter min={min} setMin={setMin} max={max} setMax={setMax} />
                    </Tab.Panel>

                    <Tab.Panel
                      key='checkInOut'
                      className={classNames(
                        'rounded-xl bg-white p-3',
                        'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
                      )}
                    >
                      <div>Hello this is Check in / Check Out</div>
                    </Tab.Panel>

                    <Tab.Panel
                      key='price'
                      className={classNames(
                        'rounded-xl bg-white p-3',
                        'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
                      )}
                    >
                      <div>Hello this is price</div>
                    </Tab.Panel>
                  </Tab.Panels>
                </Tab.Group>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
}
