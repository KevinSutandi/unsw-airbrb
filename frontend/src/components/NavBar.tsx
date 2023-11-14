import React, { useState, useEffect } from 'react';
import { Dialog, Popover } from '@headlessui/react';
import {
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { getToken, setEmail, setToken } from '../utils/auth';
import logo from '../assets/logo.jpeg';
import LoginModal from './AuthModals/LoginModal';
import RegisterModal from './AuthModals/RegisterModal';
import { useNavigate } from 'react-router-dom';
import HomeProfileMenu from './HomeComponents/HomeProfileMenu';
import { makeRequest } from '../utils/axiosHelper';
import { NavBarProps } from '../types/types';
import axios from 'axios';
import Dropdown from './Dropdown';

export default function NavBar ({
  isLoggedIn,
  setIsLoggedIn,
  setErrorModalOpen,
  setErrorMessage,
  product,
  setProduct,
  setIsFiltered
}: NavBarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [token, setNewToken] = useState('');

  useEffect(() => {
    const userToken = getToken();
    if (userToken) {
      setNewToken(userToken);
      setIsLoggedIn(userToken !== 'null');
    } else {
      console.log('Cannot get Token');
    }
  }, []);

  const navigate = useNavigate();

  const openLoginModal = () => {
    setRegisterModalOpen(false);
    setLoginModalOpen(true);
  };

  const openRegisterModal = () => {
    setLoginModalOpen(false);
    setRegisterModalOpen(true);
  };

  const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      if (token) {
        await makeRequest('POST', 'user/auth/logout', { token });
        setIsLoggedIn(false);
        setToken('');
        setEmail('');
        navigate('/');
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.data) {
          setErrorMessage(err.response.data.error);
          setErrorModalOpen(true);
          console.error('Login failed:', err.response.data.error);
        }
      } else {
        setErrorMessage('An unexpected error occurred.');
        setErrorModalOpen(true);
        console.error('Login failed:', err);
      }
    }
  };

  const navigateHome = () => {
    navigate('/');
  };

  const navigateHostedListings = () => {
    setMobileMenuOpen(false)
    navigate('/listings');
  };

  return (
    <header className="bg-white">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <a
            className="-m-1.5 p-1.5 flex hover:scale-105 ease-in duration-200 cursor-pointer"
            onClick={navigateHome}
          >
            <span className="sr-only">AirBRB</span>
            <img className="h-10 w-auto" src={logo} alt="" />
            <span className="hidden mx-3 my-auto text-2xl underline underline-offset-3 lg:block">
              AirBRB
            </span>
          </a>
        </div>

        <Popover.Group className="lg:flex lg:gap-x-12">
          <Dropdown products={product} setProducts={setProduct} setIsFiltered={setIsFiltered}/>
        </Popover.Group>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end items-center">
          <HomeProfileMenu
            openLoginModal={openLoginModal}
            openRegisterModal={openRegisterModal}
            isLoggedIn={isLoggedIn}
            handleLogout={handleLogout}
            navigateHostedListings={navigateHostedListings}
          />
        </div>
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5 flex">
              <span className="sr-only">AirBRB</span>
              <img className="h-8 w-auto" src={logo} alt="" />
              <span className="mx-3 my-auto text-2xl underline underline-offset-3">
                AirBRB
              </span>
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon
                className="h-6 w-6 hover:bg-gray-50"
                aria-hidden="true"
              />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              {isLoggedIn
                ? (
                <div className="py-6">
                  <button
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-bold leading-7 text-gray-900 hover:bg-gray-50"
                    onClick={navigateHostedListings}
                  >
                    View Listings
                  </button>
                  <button
                    onClick={handleLogout}
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-red-500 hover:bg-gray-50"
                  >
                    Log out
                  </button>
                </div>
                  )
                : (
                <div className="py-6">
                  <button
                    onClick={openRegisterModal}
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-bold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Sign up
                  </button>
                  <button
                    onClick={openLoginModal}
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Log in
                  </button>
                </div>
                  )}
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
      <LoginModal
        open={loginModalOpen}
        setIsLoggedIn={setIsLoggedIn}
        onClose={() => setLoginModalOpen(false)}
        openRegisterModal={openRegisterModal}
        setLoginModalOpen={setLoginModalOpen}
        setErrorMessage={setErrorMessage}
        setErrorModalOpen={setErrorModalOpen}
        setNewToken={setNewToken}
      />
      <RegisterModal
        open={registerModalOpen}
        setIsLoggedIn={setIsLoggedIn}
        onClose={() => setRegisterModalOpen(false)}
        openLoginModal={openLoginModal}
        setRegisterModalOpen={setRegisterModalOpen}
        setErrorMessage={setErrorMessage}
        setErrorModalOpen={setErrorModalOpen}
        setNewToken={setNewToken}
      />
    </header>
  );
}
