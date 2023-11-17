import React from 'react';
import BedIcon from '../../assets/double-bed-icon.svg';
export default function BedCard(_a) {
    var bedroomName = _a.bedroomName, bedTotal = _a.bedTotal;
    var getBedroomName = function () {
        var nameSplit = bedroomName.split('_');
        return "Bedroom ".concat(nameSplit[1]);
    };
    return (React.createElement("div", { key: bedroomName, className: "inline-block" },
        React.createElement("div", { className: "rounded-md border ring-1 ring-inset ring-gray-500 flex flex-col pl-8 pr-20 py-5" },
            React.createElement("img", { src: BedIcon, alt: "Bed Icon", className: "h-8 w-8" }),
            React.createElement("div", { className: "font-bold text-lg" }, getBedroomName()),
            React.createElement("div", { className: "text-md" },
                bedTotal,
                " bed"))));
}
//# sourceMappingURL=BedCard.js.map