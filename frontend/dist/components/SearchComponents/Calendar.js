// import { Menu, Transition } from '@headlessui/react';
// import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import { add, eachDayOfInterval, endOfMonth, format, getDay, isEqual, isSameMonth, isToday, parse, startOfToday, isBefore, } from 'date-fns';
import React, { useState } from 'react';
function classNames() {
    var classes = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        classes[_i] = arguments[_i];
    }
    return classes.filter(Boolean).join(' ');
}
export default function Calendar(_a) {
    var selectedDay = _a.selectedDay, setSelectedDay = _a.setSelectedDay, checkIn = _a.checkIn, setFiltered = _a.setFiltered;
    var today = startOfToday();
    var yesterday = add(today, { days: -1 });
    var _b = useState(format(today, 'MMM-yyyy')), currentMonth = _b[0], setCurrentMonth = _b[1];
    var firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date());
    var days = eachDayOfInterval({
        start: firstDayCurrentMonth,
        end: endOfMonth(firstDayCurrentMonth),
    });
    function previousMonth() {
        var firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
        setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'));
    }
    function nextMonth() {
        var firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
        setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'));
    }
    if (checkIn && isBefore(selectedDay, add(checkIn, { days: 1 }))) {
        setSelectedDay(add(checkIn, { days: 1 }));
        setFiltered(add(checkIn, { days: 1 }));
    }
    var setDay = function (day) {
        setSelectedDay(day);
        setFiltered(day);
    };
    return (React.createElement("div", { className: 'pt-5' },
        React.createElement("div", { className: 'ring-1 ring-gray-200 rounded-md max-w-md px-4 mx-auto sm:px-7 md:max-w-4xl md:px-6' },
            React.createElement("div", null,
                React.createElement("div", null,
                    React.createElement("div", { className: 'flex items-center pt-4' },
                        React.createElement("h2", { className: 'flex-auto font-semibold text-gray-900' }, format(firstDayCurrentMonth, 'MMMM yyyy')),
                        React.createElement("button", { type: 'button', onClick: previousMonth, className: '-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500' },
                            React.createElement("span", { className: 'sr-only' }, "Previous month"),
                            React.createElement(ChevronLeftIcon, { className: 'w-5 h-5', "aria-hidden": 'true' })),
                        React.createElement("button", { onClick: nextMonth, type: 'button', className: '-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500' },
                            React.createElement("span", { className: 'sr-only' }, "Next month"),
                            React.createElement(ChevronRightIcon, { className: 'w-5 h-5', "aria-hidden": 'true' }))),
                    React.createElement("div", { className: 'grid grid-cols-7 mt-10 text-xs leading-6 text-center text-gray-500' },
                        React.createElement("div", null, "S"),
                        React.createElement("div", null, "M"),
                        React.createElement("div", null, "T"),
                        React.createElement("div", null, "W"),
                        React.createElement("div", null, "T"),
                        React.createElement("div", null, "F"),
                        React.createElement("div", null, "S")),
                    React.createElement("div", { className: 'grid grid-cols-7 mt-2 text-sm' }, days.map(function (day, dayIdx) { return (React.createElement("div", { key: day.toString(), className: classNames(dayIdx === 0 && colStartClasses[getDay(day)], 'py-1.5') },
                        React.createElement("button", { type: 'button', onClick: function () { setDay(day); }, className: classNames(isEqual(day, selectedDay) && 'text-white', !isEqual(day, selectedDay) &&
                                isToday(day) &&
                                'text-red-500', !isEqual(day, selectedDay) &&
                                !isToday(day) &&
                                isSameMonth(day, firstDayCurrentMonth) &&
                                'text-gray-900', !isEqual(day, selectedDay) &&
                                !isToday(day) &&
                                !isSameMonth(day, firstDayCurrentMonth) &&
                                'text-gray-400', isEqual(day, selectedDay) && isToday(day) && 'bg-red-500', isEqual(day, selectedDay) &&
                                !isToday(day) &&
                                'bg-gray-900', !isEqual(day, selectedDay) && isBefore(yesterday, day) && 'hover:bg-gray-200', (isEqual(day, selectedDay) || isToday(day)) &&
                                'font-semibold', 'mx-auto flex h-10 w-10 items-center justify-center rounded-full', 'disabled:opacity-50 disabled:bg-gray-300 '), disabled: !isBefore(yesterday, day) || (checkIn ? !isBefore(checkIn, day) : false) },
                            React.createElement("time", { dateTime: format(day, 'yyyy-MM-dd') }, format(day, 'd'))))); })))))));
}
var colStartClasses = [
    '',
    'col-start-2',
    'col-start-3',
    'col-start-4',
    'col-start-5',
    'col-start-6',
    'col-start-7',
];
//# sourceMappingURL=Calendar.js.map