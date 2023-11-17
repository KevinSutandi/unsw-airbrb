var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ReviewModal from './ReviewModal';
import React from 'react';
import ResizeObserver from 'resize-observer-polyfill';
import * as axiosHelpers from '../../utils/axiosHelper'; // Import the module to mock the makeRequest function
import { localStorageMock } from '../../utils/helpers';
// To prevent ResizeObserver error
beforeAll(function () {
    globalThis.ResizeObserver = ResizeObserver;
});
afterAll(function () {
    delete globalThis.ResizeObserver;
});
jest.mock('../../utils/axiosHelper', function () { return ({
    makeRequest: jest.fn(),
}); });
Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
});
describe('Review Modal', function () {
    var reviewModalSetup = function () {
        var open = true;
        var onClose = jest.fn();
        var listingId = '143360162';
        var bookingId = '142360162';
        render(React.createElement(ReviewModal, { open: open, onClose: onClose, listingId: listingId, bookingId: bookingId }));
        return { onClose: onClose };
    };
    beforeEach(function () {
        jest.clearAllMocks();
    });
    it('Clicking on stars', function () {
        reviewModalSetup();
        var thirdStar = screen.getByTestId('star-3');
        fireEvent.click(thirdStar);
        // Check if the first three stars are filled
        for (var i = 1; i <= 3; i++) {
            expect(screen.getByTestId("star-".concat(i))).toHaveClass('fill-yellow-500');
        }
        // Check if the remaining stars are not filled
        for (var i = 4; i <= 5; i++) {
            expect(screen.getByTestId("star-".concat(i))).not.toHaveClass('fill-yellow-500');
        }
    });
    it('Capturing user input in textarea', function () {
        reviewModalSetup();
        var textarea = screen.getByPlaceholderText('Leave a review');
        fireEvent.change(textarea, { target: { value: 'This is a test review' } });
        expect(textarea.value).toBe('This is a test review');
    });
    it('Submitting a review', function () { return __awaiter(void 0, void 0, void 0, function () {
        var onClose, fourthStar, textarea, submitBtn;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    axiosHelpers.makeRequest.mockResolvedValue({
                        data: {},
                    });
                    window.localStorage.setItem('token', 'token');
                    onClose = reviewModalSetup().onClose;
                    fourthStar = screen.getByTestId('star-4');
                    fireEvent.click(fourthStar);
                    textarea = screen.getByPlaceholderText('Leave a review');
                    fireEvent.change(textarea, {
                        target: { value: 'Good place but lack something' },
                    });
                    submitBtn = screen.getByRole('button', { name: /submit/i });
                    fireEvent.click(submitBtn);
                    return [4 /*yield*/, waitFor(function () {
                            expect(onClose).toHaveBeenCalled();
                        })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=ViewListingComponents.test.js.map