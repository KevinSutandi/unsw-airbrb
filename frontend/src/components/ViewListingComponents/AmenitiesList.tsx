import React from 'react';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

type AmenitiesListProps = {
  amenity: string;
  idx: number;
};

export default function AmenitiesList ({ amenity }: AmenitiesListProps) {
  return (
    <li className="flex items-center gap-2">
      <CheckCircleIcon className="w-5 h-5" />
      <div className="text-xl">{amenity}</div>
    </li>
  );
}
