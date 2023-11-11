import React from 'react';
import { PropertyImageProps } from '../../../types/types';
import { TrashIcon } from '@heroicons/react/24/solid';

export default function PropertyImage ({ src, idx, deletePropertyImage }: PropertyImageProps) {
  return (
    <div className="relative">
      <img className="object-scale-down" src={src} />
      <button onClick={() => deletePropertyImage(idx)}>
        <TrashIcon className="absolute top-0 right-0 w-5 h-5 bg-red-100" />
      </button>
    </div>
  );
}
