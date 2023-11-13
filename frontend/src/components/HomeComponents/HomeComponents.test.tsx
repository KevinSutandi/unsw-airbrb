import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import HomeProfileMenu from './HomeProfileMenu';
import React from 'react';
import * as axiosHelpers from '../../utils/axiosHelper';
import NavBar from './NavBar';
import { BrowserRouter } from 'react-router-dom';
import { Product, SingleDetailListing } from '../../types/types';

jest.mock('../../utils/axiosHelper', () => ({
  makeRequest: jest.fn(),
}));

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

  it('Log out', () => {
    const { handleLogout } = profileIconSetup(true);
    const logoutButton = screen.getByRole('menuitem', { name: /log out/i });
    fireEvent.click(logoutButton);
    expect(handleLogout).toHaveBeenCalled();
  });
});
