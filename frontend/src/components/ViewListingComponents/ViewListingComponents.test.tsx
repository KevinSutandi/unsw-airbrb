import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ReviewModal from './ReviewModal';
import React from 'react';
import ResizeObserver from 'resize-observer-polyfill';
import * as axiosHelpers from '../../utils/axiosHelper'; // Import the module to mock the makeRequest function
import { localStorageMock } from '../../utils/helpers';

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

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('Review Modal', () => {
  const reviewModalSetup = () => {
    const open = true;
    const onClose = jest.fn();
    const listingId = '143360162';
    const bookingId = '142360162';

    render(
      <ReviewModal
        open={open}
        onClose={onClose}
        listingId={listingId}
        bookingId={bookingId}
      />
    );

    return { onClose };
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Clicking on stars', () => {
    reviewModalSetup();

    const thirdStar = screen.getByTestId('star-3');
    fireEvent.click(thirdStar);

    // Check if the first three stars are filled
    for (let i = 1; i <= 3; i++) {
      expect(screen.getByTestId(`star-${i}`)).toHaveClass('fill-yellow-500');
    }

    // Check if the remaining stars are not filled
    for (let i = 4; i <= 5; i++) {
      expect(screen.getByTestId(`star-${i}`)).not.toHaveClass(
        'fill-yellow-500'
      );
    }
  });

  it('Capturing user input in textarea', () => {
    reviewModalSetup();

    const textarea = screen.getByPlaceholderText(
      'Leave a review'
    ) as HTMLTextAreaElement;
    fireEvent.change(textarea, { target: { value: 'This is a test review' } });

    expect(textarea.value).toBe('This is a test review');
  });

  it('Submitting a review', async () => {
    (axiosHelpers.makeRequest as jest.Mock).mockResolvedValue({
      data: {},
    });

    window.localStorage.setItem('token', 'token');

    const { onClose } = reviewModalSetup();

    const fourthStar = screen.getByTestId('star-4');
    fireEvent.click(fourthStar);

    const textarea = screen.getByPlaceholderText(
      'Leave a review'
    ) as HTMLTextAreaElement;
    fireEvent.change(textarea, {
      target: { value: 'Good place but lack something' },
    });

    const submitBtn = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(onClose).toHaveBeenCalled();
    });
  });
});
