import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import HomeProfileMenu from './HomeProfileMenu';
import React from 'react';

describe('Home Components', () => {
  it('Opening profile icon menu', async () => {
    const mockOpenLoginModal = jest.fn();
    const mockOpenRegisterModal = jest.fn();
    const mockHandleLogout = jest.fn();
    const mockNavigateHostedListings = jest.fn();

    const { getByRole } = render(
      <HomeProfileMenu
        openLoginModal={mockOpenLoginModal}
        openRegisterModal={mockOpenRegisterModal}
        isLoggedIn={false}
        handleLogout={mockHandleLogout}
        navigateHostedListings={mockNavigateHostedListings}
      />
    );
    const profileButton = screen.getByRole('button', {
      name: /profile icon/i,
    });
    fireEvent.click(profileButton);

    await waitFor(() => {
      expect(getByRole('menuitem', { name: /Sign up/i })).toBeInTheDocument();
      expect(getByRole('menuitem', { name: /Login/i })).toBeInTheDocument();
    });
  });

  it('Opening sign up modal', () => {
    const mockOpenLoginModal = jest.fn();
    const mockOpenRegisterModal = jest.fn();
    const mockHandleLogout = jest.fn();
    const mockNavigateHostedListings = jest.fn();

    const { getByRole } = render(
      <HomeProfileMenu
        openLoginModal={mockOpenLoginModal}
        openRegisterModal={mockOpenRegisterModal}
        isLoggedIn={false}
        handleLogout={mockHandleLogout}
        navigateHostedListings={mockNavigateHostedListings}
      />
    );
    const profileButton = screen.getByRole('button', {
      name: /profile icon/i,
    });
    fireEvent.click(profileButton);

    const signUpButton = getByRole('menuitem', { name: /Sign up/i });

    fireEvent.click(signUpButton);
    expect(mockOpenRegisterModal).toHaveBeenCalled();
  });

  it('Opening log in modal', () => {
    const mockOpenLoginModal = jest.fn();
    const mockOpenRegisterModal = jest.fn();
    const mockHandleLogout = jest.fn();
    const mockNavigateHostedListings = jest.fn();

    const { getByRole } = render(
      <HomeProfileMenu
        openLoginModal={mockOpenLoginModal}
        openRegisterModal={mockOpenRegisterModal}
        isLoggedIn={false}
        handleLogout={mockHandleLogout}
        navigateHostedListings={mockNavigateHostedListings}
      />
    );
    const profileButton = screen.getByRole('button', {
      name: /profile icon/i,
    });
    fireEvent.click(profileButton);

    const loginButton = getByRole('menuitem', { name: /Login/i });

    fireEvent.click(loginButton);
    expect(mockOpenLoginModal).toHaveBeenCalled();
  });
});
