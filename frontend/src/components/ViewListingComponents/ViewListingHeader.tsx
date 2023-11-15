import React from 'react';

type ViewListingHeaderProps = {
  status: string;
};

export default function ViewListingHeader ({ status }: ViewListingHeaderProps) {
  return (
    <>
      {status === 'pending' && (
        <section className="w-full bg-blue-500 p-5 text-white font-bold text-lg mb-5 flex justify-between items-center">
          <div>You have a pending booking for this listing</div>
        </section>
      )}

      {status === 'accepted' && (
        <section className="w-full bg-blue-500 p-5 text-white font-bold text-lg mb-5 flex justify-between items-center">
          <div>Your booking has been accepted</div>
          <button className="border px-4 py-2">Leave a review</button>
        </section>
      )}
    </>
  );
}
