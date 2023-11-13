import React from 'react';

export default function DateForm () {
  return (
    <div className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full flex box-border gap-1 text-left justify-between">
      <div className="flex flex-1 py-2.5 px-2.5 border-r-2 border-black">
        <div>
          <div>CHECK-IN</div>
          <input
            type="date"
            className="w-full border-none h-5 p-0"
            placeholder="Select date"
          />
        </div>
      </div>
      <div className="flex flex-1 py-2.5 px-2.5">
        <div>
          <div>CHECKOUT</div>
          <input type="date" className="w-full border-none h-5 p-0" />
        </div>
      </div>
    </div>
  );
}
