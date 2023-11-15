import React from 'react';

type ViewListingHeaderProps = {
  status: string;
};

export default function ViewListingHeader ({ status }: ViewListingHeaderProps) {
  return (
    <section className="w-full bg-blue-500">
      {status === 'pending' && (
        <div>You have a pending booking for this listing</div>
      )}
    </section>
  );
}
