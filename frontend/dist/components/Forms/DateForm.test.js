var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import React, { fireEvent, render, screen } from '@testing-library/react';
import DateForm from './DateForm';
describe('DateForm', function () {
    var mockProps = {
        fromValue: '2022-01-01',
        toValue: '2022-01-02',
        idx: 0,
        removeAvailability: jest.fn(),
        handleDateChange: jest.fn(),
        errorMessage: '',
    };
    it('renders the component with correct props', function () {
        render(React.createElement(DateForm, __assign({}, mockProps)));
        expect(screen.getByDisplayValue('2022-01-01')).toBeInTheDocument();
        expect(screen.getByDisplayValue('2022-01-02')).toBeInTheDocument();
    });
    it('calls handleDateChange when date input is changed', function () {
        render(React.createElement(DateForm, __assign({}, mockProps)));
        var fromDateInput = screen.getByDisplayValue('2022-01-01');
        var toDateInput = screen.getByDisplayValue('2022-01-02');
        fireEvent.change(fromDateInput, { target: { value: '2022-01-03' } });
        fireEvent.change(toDateInput, { target: { value: '2022-01-04' } });
        expect(mockProps.handleDateChange).toHaveBeenCalledTimes(2);
        expect(mockProps.handleDateChange).toHaveBeenCalledWith(0, 'from', '2022-01-03');
        expect(mockProps.handleDateChange).toHaveBeenCalledWith(0, 'to', '2022-01-04');
    });
    it('calls removeAvailability when remove button is clicked', function () {
        render(React.createElement(DateForm, __assign({}, mockProps)));
        var removeButton = screen.getByRole('button');
        fireEvent.click(removeButton);
        expect(mockProps.removeAvailability).toHaveBeenCalledTimes(1);
        expect(mockProps.removeAvailability).toHaveBeenCalledWith(0);
    });
    it('displays error message when errorMessage prop is not empty', function () {
        render(React.createElement(DateForm, __assign({}, mockProps, { errorMessage: "Invalid date range" })));
        expect(screen.getByText('Invalid date range')).toBeInTheDocument();
    });
    it('displays an error when from date is greater than to date', function () {
        render(React.createElement(DateForm, __assign({}, mockProps, { fromValue: "2022-01-03", toValue: "2022-01-02", errorMessage: "To date cannot be earlier than From date" })));
        expect(screen.getByText('To date cannot be earlier than From date')).toBeInTheDocument();
    });
    it('displays an error when no dates are filled', function () {
        render(React.createElement(DateForm, __assign({}, mockProps, { fromValue: "", toValue: "", errorMessage: "Please fill in the dates" })));
        expect(screen.getByText('Please fill in the dates')).toBeInTheDocument();
    });
});
//# sourceMappingURL=DateForm.test.js.map