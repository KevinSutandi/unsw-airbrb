import React from 'react';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
export default function AmenitiesList(_a) {
    var amenity = _a.amenity;
    return (React.createElement("li", { className: "flex items-center gap-2" },
        React.createElement(CheckCircleIcon, { className: "w-5 h-5" }),
        React.createElement("div", { className: "text-xl" }, amenity)));
}
//# sourceMappingURL=AmenitiesList.js.map