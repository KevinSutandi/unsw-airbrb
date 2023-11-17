import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import HomeProfileMenu from './HomeProfileMenu';
import React from 'react';
import NavBar from '../NavBar';
import { BrowserRouter } from 'react-router-dom';
import { SingleDetailListing } from '../../types/types';
import { localStorageMock } from '../../utils/helpers';
import * as axiosHelpers from '../../utils/axiosHelper'; // Import the module to mock the makeRequest function

jest.mock('../../utils/axiosHelper', () => ({
  makeRequest: jest.fn(),
}));

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('Home Components Not Logged In', () => {
  const navbarSetup = (isLoggedIn: boolean) => {
    const setIsLoggedIn = jest.fn();
    const setErrorModalOpen = jest.fn();
    const setErrorMessage = jest.fn();
    const setProducts = jest.fn();
    const products: SingleDetailListing[] = [];

    render(
      <BrowserRouter>
        <NavBar
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          setErrorMessage={setErrorMessage}
          setErrorModalOpen={setErrorModalOpen}
          product={products}
          setProduct={setProducts}
          setIsFiltered={jest.fn()}
          setRunEffect={jest.fn()}
          runEffect={false}
        />
      </BrowserRouter>
    );
    return { setIsLoggedIn, setErrorMessage, setErrorModalOpen, isLoggedIn };
  };

  const profileIconSetup = (isLoggedIn: boolean) => {
    const openLoginModal = jest.fn();
    const openRegisterModal = jest.fn();
    const handleLogout = jest.fn();
    const navigateHostedListings = jest.fn();
    render(
      <HomeProfileMenu
        openLoginModal={openLoginModal}
        openRegisterModal={openRegisterModal}
        isLoggedIn={isLoggedIn}
        handleLogout={handleLogout}
        navigateHostedListings={navigateHostedListings}
      />
    );
    const profileButton = screen.getByRole('button', { name: /profile icon/i });
    fireEvent.click(profileButton);

    return {
      openLoginModal,
      openRegisterModal,
      handleLogout,
      navigateHostedListings,
      isLoggedIn,
    };
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Opening profile icon menu', async () => {
    profileIconSetup(false);

    await waitFor(() => {
      expect(
        screen.getByRole('menuitem', { name: /Sign up/i })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('menuitem', { name: /Login/i })
      ).toBeInTheDocument();
    });
  });

  it('Opening sign up modal', () => {
    const { openRegisterModal } = profileIconSetup(false);
    const signUpButton = screen.getByRole('menuitem', { name: /Sign up/i });
    fireEvent.click(signUpButton);
    expect(openRegisterModal).toHaveBeenCalled();
  });

  it('Opening log in modal', () => {
    const { openLoginModal } = profileIconSetup(false);
    const loginButton = screen.getByRole('menuitem', { name: /Login/i });
    fireEvent.click(loginButton);
    expect(openLoginModal).toHaveBeenCalled();
  });

  it('Log out', async () => {
    (axiosHelpers.makeRequest as jest.Mock).mockResolvedValue({
      data: {},
    });
    window.localStorage.setItem('token', 'token');

    const { setIsLoggedIn } = navbarSetup(true);
    const profileBtn = screen.getByAltText('Profile Icon');

    fireEvent.click(profileBtn);

    const logoutBtn = screen.getByRole('menuitem', { name: /log out/i });
    fireEvent.click(logoutBtn);

    await waitFor(() => {
      expect(setIsLoggedIn).toHaveBeenCalledWith(false);
    });
  });
});
