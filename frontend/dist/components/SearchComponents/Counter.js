import React from 'react';
import NumberForm from '../Forms/NumberForm';
var Counter = function (_a) {
    var count = _a.count, setCount = _a.setCount, min = _a.min;
    var increment = function () {
        if (count === 50)
            return;
        setCount(count + 1);
    };
    var decrement = function () {
        if (count === 0 || count === min)
            return;
        setCount(count - 1);
    };
    // if min has changed value and the max has lower value than min, set max to min
    if (min && count < min) {
        setCount(min);
    }
    return (React.createElement("div", { className: 'flex flex-row justify-center items-center gap-5' },
        React.createElement("button", { className: 'bg-gray-500 px-5 py-2 rounded-full text-white hover:bg-gray-700 disabled:bg-gray-500 disabled:opacity-50', onClick: decrement, disabled: count === 0 || count === min }, "-"),
        React.createElement(NumberForm, { name: 'beds', id: 'beds', value: count, className: 'block w-10 rounded-md border-0 py-1.5 text-center text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 lg:w-64 sm:text-md sm:leading-6', disabled: true }),
        React.createElement("button", { className: 'bg-gray-500 px-5 py-2 rounded-full text-white hover:bg-gray-700 disabled:bg-gray-500 disabled:opacity-50', onClick: increment, disabled: count === 50 }, "+")));
};
export default Counter;
//# sourceMappingURL=Counter.js.map