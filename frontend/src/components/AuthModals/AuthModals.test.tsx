import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import LoginModal from './LoginModal';
import React from 'react';
import RegisterModal from './RegisterModal';
import ResizeObserver from 'resize-observer-polyfill';
import * as axiosHelpers from '../../utils/axiosHelper'; // Import the module to mock the makeRequest function

// To prevent ResizeObserver error
beforeAll(() => {
  (globalThis as any).ResizeObserver = ResizeObserver;
});

afterAll(() => {
  delete (globalThis as any).ResizeObserver;
});

jest.mock('../../utils/axiosHelper', () => ({
  makeRequest: jest.fn(),
}));

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

  it('Register fails', async () => {
    (axiosHelpers.makeRequest as jest.Mock).mockRejectedValue({
      response: {
        data: {
          error: 'Register failed',
        },
      },
      isAxiosError: true,
    });

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

    const emailInput = screen.getByLabelText(/email/i);
    const nameInput = screen.getByLabelText(/name/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i);

    fireEvent.change(emailInput, { target: { value: 'test@gmail.com' } });
    fireEvent.change(nameInput, { target: { value: 'Mark' } });
    fireEvent.change(passwordInput, { target: { value: 'test1234567890' } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: 'test1234567890' },
    });

    fireEvent.click(screen.getByRole('button', { name: /register/i }));

    await waitFor(() => {
      expect(setErrorModalOpen).toHaveBeenCalledWith(true);
      expect(setErrorMessage).toHaveBeenCalledWith('Register failed');
    });
  });

  it('Register successful', async () => {
    (axiosHelpers.makeRequest as jest.Mock).mockResolvedValue({
      data: {
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhheWRlbkB1bnN3LmVkdS5hdSIsImlhdCI6MTYwMzk0MzIzMH0.b37PfwlcH_cue6yhgvDt2IiNvhRACf79hTNtacYB94Q',
      },
    });

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

    const emailInput = screen.getByLabelText(/email/i);
    const nameInput = screen.getByLabelText(/name/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i);

    fireEvent.change(emailInput, { target: { value: 'test@gmail.com' } });
    fireEvent.change(nameInput, { target: { value: 'Mark' } });
    fireEvent.change(passwordInput, { target: { value: 'test1234567890' } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: 'test1234567890' },
    });

    fireEvent.click(screen.getByRole('button', { name: /register/i }));

    console.log((axiosHelpers.makeRequest as jest.Mock).mock.calls);

    await waitFor(() => {
      expect(setIsLoggedIn).toHaveBeenCalledWith(true);
    });
  });
});
