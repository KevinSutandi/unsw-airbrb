import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import LoginModal from './LoginModal';
import React from 'react';
import RegisterModal from './RegisterModal';
import ResizeObserver from 'resize-observer-polyfill';
import * as axiosHelpers from '../../utils/axiosHelper'; // Import the module to mock the makeRequest function

interface GlobalThisWithResizeObserver {
  ResizeObserver?: typeof ResizeObserver;
}
beforeAll(() => {
  (globalThis as GlobalThisWithResizeObserver).ResizeObserver = ResizeObserver;
});

afterAll(() => {
  delete (globalThis as GlobalThisWithResizeObserver).ResizeObserver;
});

jest.mock('../../utils/axiosHelper', () => ({
  makeRequest: jest.fn(),
}));

describe('Auth Modals', () => {
  const registerSetup = () => {
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

    return {
      setIsLoggedIn,
      openLoginModal,
      onClose,
      setRegisterModalOpen,
      setErrorMessage,
      setErrorModalOpen,
      setNewToken,
    };
  };

  const loginSetup = () => {
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

    return {
      setIsLoggedIn,
      openRegisterModal,
      onClose,
      setLoginModalOpen,
      setErrorMessage,
      setErrorModalOpen,
      setNewToken,
    };
  };

  const submitRegisterForm = () => {
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@gmail.com' },
    });
    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: 'Mark' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'test1234567890' },
    });
    fireEvent.change(screen.getByLabelText(/confirm password/i), {
      target: { value: 'test1234567890' },
    });
    fireEvent.click(screen.getByRole('button', { name: /register/i }));
  };

  const submitLoginForm = () => {
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@gmail.com' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'passtest' },
    });

    fireEvent.click(screen.getByRole('button', { name: /login/i }));
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Switch between login to register modal', () => {
    const { openRegisterModal } = loginSetup();
    const registerButton = screen.getByRole('button', { name: /Register/i });
    fireEvent.click(registerButton);
    expect(openRegisterModal).toHaveBeenCalledTimes(1);
  });

  it('Switch between register to login modal', () => {
    const { openLoginModal } = registerSetup();
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

    const { setIsLoggedIn, setErrorModalOpen, setErrorMessage } =
      registerSetup();
    submitRegisterForm();

    await waitFor(() => {
      expect(setErrorModalOpen).toHaveBeenCalledWith(true);
      expect(setErrorMessage).toHaveBeenCalledWith('Register failed');
      expect(setIsLoggedIn).not.toHaveBeenCalled();
    });
  });

  it('Register successful', async () => {
    (axiosHelpers.makeRequest as jest.Mock).mockResolvedValue({
      data: {
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhheWRlbkB1bnN3LmVkdS5hdSIsImlhdCI6MTYwMzk0MzIzMH0.b37PfwlcH_cue6yhgvDt2IiNvhRACf79hTNtacYB94Q',
      },
    });

    const { setIsLoggedIn, setNewToken } = registerSetup();
    submitRegisterForm();

    await waitFor(() => {
      expect(setIsLoggedIn).toHaveBeenCalledWith(true);
      expect(setNewToken).toHaveBeenCalledWith(
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhheWRlbkB1bnN3LmVkdS5hdSIsImlhdCI6MTYwMzk0MzIzMH0.b37PfwlcH_cue6yhgvDt2IiNvhRACf79hTNtacYB94Q'
      );
    });
  });

  it('Login fails', async () => {
    (axiosHelpers.makeRequest as jest.Mock).mockRejectedValue({
      response: {
        data: {
          error: 'Invalid input',
        },
      },
      isAxiosError: true,
    });
    const { setErrorModalOpen, setErrorMessage, setIsLoggedIn } = loginSetup();
    submitLoginForm();

    await waitFor(() => {
      expect(setErrorModalOpen).toHaveBeenCalledWith(true);
      expect(setErrorMessage).toHaveBeenCalledWith('Invalid input');
      expect(setIsLoggedIn).not.toHaveBeenCalled();
    });
  });

  it('Login successful', async () => {
    (axiosHelpers.makeRequest as jest.Mock).mockResolvedValue({
      data: {
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhheWRlbkB1bnN3LmVkdS5hdSIsImlhdCI6MTYwMzk0MzIzMH0.b37PfwlcH_cue6yhgvDt2IiNvhRACf79hTNtacYB94Q',
      },
    });
    const { setIsLoggedIn, setNewToken } = loginSetup();
    submitLoginForm();
    await waitFor(() => {
      expect(setIsLoggedIn).toHaveBeenCalledWith(true);
      expect(setNewToken).toHaveBeenCalledWith(
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhheWRlbkB1bnN3LmVkdS5hdSIsImlhdCI6MTYwMzk0MzIzMH0.b37PfwlcH_cue6yhgvDt2IiNvhRACf79hTNtacYB94Q'
      );
    });
  });
});
