import React from 'react';
import BedIcon from '../../assets/double-bed-icon.svg'
import { BedCardProps } from '../../types/types';

export default function BedCard ({ bedroomName, bedTotal }: BedCardProps) {
  const getBedroomName = () => {
    const nameSplit = (bedroomName.split('_'))
    return `Bedroom ${nameSplit[1]}`
  }

  return (
    <div key={bedroomName} className="inline-block">
      <div className="rounded-md border ring-1 ring-inset ring-gray-500 flex flex-col pl-8 pr-20 py-5">
        <img src={BedIcon} alt="Bed Icon" className="h-8 w-8" />
        <div className="font-bold text-lg">{getBedroomName()}</div>
        <div className="text-md">{bedTotal} bed</div>
      </div>
    </div>
  );
}
