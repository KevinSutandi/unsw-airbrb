import React from 'react';
import { TrashIcon } from '@heroicons/react/24/solid';
export default function PropertyImage(_a) {
    var src = _a.src, idx = _a.idx, deletePropertyImage = _a.deletePropertyImage;
    return (React.createElement("div", { className: "items-center flex" },
        React.createElement("div", { className: 'relative' },
            React.createElement("img", { className: "object-scale-down rounded-md", src: src }),
            React.createElement("button", { onClick: function () { return deletePropertyImage(idx); } },
                React.createElement(TrashIcon, { className: "absolute top-0 right-0 w-5 h-5 bg-gray-600 text-red-500 hover:opacity-50 rounded-sm" })))));
}
//# sourceMappingURL=PropertyImage.js.map