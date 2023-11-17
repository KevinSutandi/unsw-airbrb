import React from 'react';
import { PropertyImageProps } from '../../types/types';
import { TrashIcon } from '@heroicons/react/24/solid';

export default function PropertyImage ({
  src,
  idx,
  deletePropertyImage,
}: PropertyImageProps) {
  return (
    <div className="items-center flex">
      <div className="relative">
        <img className="object-scale-down rounded-md" data-cy="property-image" src={src} />
        <button
          onClick={() => deletePropertyImage(idx)}
          aria-label="delete image"
        >
          <TrashIcon className="absolute top-0 right-0 w-5 h-5 bg-gray-600 text-red-500 hover:opacity-50 rounded-sm" />
        </button>
      </div>
    </div>
  );
}
