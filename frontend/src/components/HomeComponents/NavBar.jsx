import React, { useState } from 'react';
import '../../App.css';
import { Dialog, Popover } from '@headlessui/react';
import { Bars3Icon, XMarkIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import logo from '../../assets/logo.jpeg';
import LoginModal from '../AuthModals/LoginModal';
import RegisterModal from '../AuthModals/RegisterModal';
import { useNavigate } from 'react-router-dom';

export default function NavBar () {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [registerModalOpen, setRegisterModalOpen] = useState(false);

  const navigate = useNavigate()

  const openLoginModal = () => {
    setRegisterModalOpen(false);
    setLoginModalOpen(true);
  };

  const openRegisterModal = () => {
    setLoginModalOpen(false);
    setRegisterModalOpen(true);
  };

  const navigateHome = () => {
    navigate('/')
  }

  return (
    <header className='bg-white'>
      <nav
        className='mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8'
        aria-label='Global'
      >
        <div className='flex lg:flex-1'>
          <a className='-m-1.5 p-1.5 flex hover:scale-105 ease-in duration-200' onClick={navigateHome}>
            <span className='sr-only'>AirBRB</span>
            <img className='h-10 w-auto' src={logo} alt='' />
            <span className='mx-3 my-auto text-2xl underline underline-offset-3'>AirBRB</span>
          </a>
        </div>
        <div className='flex lg:hidden'>
          <button
            type='button'
            className='-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700'
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className='sr-only'>Open main menu</span>
            <Bars3Icon className='h-6 w-6' aria-hidden='true' />
          </button>
        </div>
        <Popover.Group className='hidden lg:flex lg:gap-x-12'>
          <a href='#' className='text-sm font-semibold leading-6 text-gray-900 hover:text-gray-500 ease-in duration-100'>
            We
          </a>
          <a href='#' className='text-sm font-semibold leading-6 text-gray-900 hover:text-gray-500 ease-in duration-100'>
            Love
          </a>
          <a href='#' className='text-sm font-semibold leading-6 text-gray-900 hover:text-gray-500 ease-in duration-100'>
          AirBRB your home
          </a>
        </Popover.Group>
        <div className='hidden lg:flex lg:flex-1 lg:justify-end'>
        <MagnifyingGlassIcon className='h-6 w-6 mr-10 hover:text-gray-500 cursor-pointer'/>
          <button
            onClick={openLoginModal}
            className='text-sm font-semibold leading-6 text-gray-900 hover:text-gray-500 ease-in duration-100'
          >
            Log in <span aria-hidden='true'>&rarr;</span>
          </button>
        </div>
      </nav>
      <Dialog
        as='div'
        className='lg:hidden'
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className='fixed inset-0 z-10' />
        <Dialog.Panel className='fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10'>
          <div className='flex items-center justify-between'>
            <a href='#' className='-m-1.5 p-1.5 flex'>
              <span className='sr-only'>AirBRB</span>
              <img className='h-8 w-auto' src={logo} alt='' />
              <span className='mx-3 my-auto text-2xl underline underline-offset-3'>AirBRB</span>
            </a>
            <button
              type='button'
              className='-m-2.5 rounded-md p-2.5 text-gray-700'
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className='sr-only'>Close menu</span>
              <XMarkIcon className='h-6 w-6 hover:bg-gray-50' aria-hidden='true' />
            </button>
          </div>
          <div className='mt-6 flow-root'>
            <div className='-my-6 divide-y divide-gray-500/10'>
              <div className='space-y-2 py-6'>
                <a
                  href='#'
                  className='-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50'
                >
                  We
                </a>
                <a
                  href='#'
                  className='-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50'
                >
                  Love
                </a>
                <a
                  href='#'
                  className='-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50'
                >
                  List your home
                </a>
              </div>
              <div className='py-6'>
                <button
                  onClick={openLoginModal}
                  className='-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50'
                >
                  Log in
                </button>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
      <LoginModal
        open={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        openRegisterModal={openRegisterModal}
      />
      <RegisterModal
        open={registerModalOpen}
        onClose={() => setRegisterModalOpen(false)}
        openLoginModal={openLoginModal}
      />
    </header>
  );
}
