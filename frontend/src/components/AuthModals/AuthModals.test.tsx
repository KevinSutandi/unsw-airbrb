import { fireEvent, render, screen } from '@testing-library/react';
import LoginModal from './LoginModal';
import React from 'react';
import RegisterModal from './RegisterModal';
import ResizeObserver from 'resize-observer-polyfill';

beforeAll(() => {
  (globalThis as any).ResizeObserver = ResizeObserver;
});

afterAll(() => {
  delete (globalThis as any).ResizeObserver;
});

describe('Auth Modals', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Switch between login to register modal', () => {
    const setIsLoggedIn = jest.fn();
    const openRegisterModal = jest.fn();
    const onClose = jest.fn();
    const setLoginModalOpen = jest.fn();
    const setErrorMessage = jest.fn();
    const setErrorModalOpen = jest.fn();
    const setNewToken = jest.fn();

    render(
      <LoginModal
        open={true}
        setIsLoggedIn={setIsLoggedIn}
        openRegisterModal={openRegisterModal}
        onClose={onClose}
        setLoginModalOpen={setLoginModalOpen}
        setErrorMessage={setErrorMessage}
        setErrorModalOpen={setErrorModalOpen}
        setNewToken={setNewToken}
      />
    );
    const registerButton = screen.getByRole('button', { name: /Register/i });
    fireEvent.click(registerButton);
    expect(openRegisterModal).toHaveBeenCalledTimes(1);
  });

  it('Switch between register to login modal', () => {
    const setIsLoggedIn = jest.fn();
    const openLoginModal = jest.fn();
    const onClose = jest.fn();
    const setRegisterModalOpen = jest.fn();
    const setErrorMessage = jest.fn();
    const setErrorModalOpen = jest.fn();
    const setNewToken = jest.fn();

    render(
      <RegisterModal
        open={true}
        setIsLoggedIn={setIsLoggedIn}
        openLoginModal={openLoginModal}
        onClose={onClose}
        setRegisterModalOpen={setRegisterModalOpen}
        setErrorMessage={setErrorMessage}
        setErrorModalOpen={setErrorModalOpen}
        setNewToken={setNewToken}
      />
    );
    const loginButton = screen.getByRole('button', { name: /Login/i });
    fireEvent.click(loginButton);
    expect(openLoginModal).toHaveBeenCalledTimes(1);
  });
});
