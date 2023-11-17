import React from 'react';
export default function ViewListingHeader(_a) {
    var status = _a.status, openReviewModal = _a.openReviewModal;
    return (React.createElement(React.Fragment, null,
        status === 'pending' && (React.createElement("section", { className: "w-full bg-blue-500 p-5 text-white font-bold text-lg mb-5 flex justify-between items-center" },
            React.createElement("div", null, "You have a pending booking for this listing"))),
        status === 'accepted' && (React.createElement("section", { className: "w-full bg-blue-500 p-5 text-white font-bold text-lg mb-5 flex justify-between items-center" },
            React.createElement("div", null, "Your booking has been accepted"),
            React.createElement("button", { className: "border px-4 py-2", onClick: openReviewModal }, "Leave a review")))));
}
//# sourceMappingURL=ViewListingHeader.js.map