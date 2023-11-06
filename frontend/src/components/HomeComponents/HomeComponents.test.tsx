import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import HomeProfileMenu from './HomeProfileMenu';
import React from 'react';

describe('Home Components', () => {
  const mockOpenLoginModal = jest.fn();
  const mockOpenRegisterModal = jest.fn();
  const mockHandleLogout = jest.fn();
  const mockNavigateHostedListings = jest.fn();

  const setup = () => {
    render(
      <HomeProfileMenu
        openLoginModal={mockOpenLoginModal}
        openRegisterModal={mockOpenRegisterModal}
        isLoggedIn={false}
        handleLogout={mockHandleLogout}
        navigateHostedListings={mockNavigateHostedListings}
      />
    );
    const profileButton = screen.getByRole('button', { name: /profile icon/i });
    fireEvent.click(profileButton);
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Opening profile icon menu', async () => {
    setup();

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
    setup();
    const signUpButton = screen.getByRole('menuitem', { name: /Sign up/i });
    fireEvent.click(signUpButton);
    expect(mockOpenRegisterModal).toHaveBeenCalled();
  });

  it('Opening log in modal', () => {
    setup();
    const loginButton = screen.getByRole('menuitem', { name: /Login/i });

    fireEvent.click(loginButton);
    expect(mockOpenLoginModal).toHaveBeenCalled();
  });
});
