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
import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import axios from 'axios';
import { CountryList } from './TypeCountry';
jest.mock('axios');
describe('CountryList', function () {
    var mockProps = {
        selectedCountry: null,
        setSelectedCountry: jest.fn(),
    };
    var mockCountries = [
        { name: { common: 'Australia' } },
        { name: { common: 'Canada' } },
        { name: { common: 'United States' } },
    ];
    beforeEach(function () {
        axios.get.mockResolvedValue({ data: mockCountries });
    });
    it('renders the component with correct props', function () { return __awaiter(void 0, void 0, void 0, function () {
        var input;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, act(function () { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            render(React.createElement(CountryList, __assign({}, mockProps)));
                            return [2 /*return*/];
                        });
                    }); })];
                case 1:
                    _a.sent();
                    input = screen.getByRole('combobox');
                    expect(input).toBeInTheDocument();
                    expect(input).toHaveValue('');
                    expect(screen.queryByText('Nothing found.')).not.toBeInTheDocument();
                    expect(screen.queryByText('Australia')).not.toBeInTheDocument();
                    expect(screen.queryByText('Canada')).not.toBeInTheDocument();
                    expect(screen.queryByText('United States')).not.toBeInTheDocument();
                    return [2 /*return*/];
            }
        });
    }); });
    it('displays the list of countries when input is clicked', function () { return __awaiter(void 0, void 0, void 0, function () {
        var list;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, act(function () { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            render(React.createElement(CountryList, __assign({}, mockProps)));
                            return [2 /*return*/];
                        });
                    }); })];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, act(function () { return __awaiter(void 0, void 0, void 0, function () {
                            var button;
                            return __generator(this, function (_a) {
                                button = screen.getByRole('button', { name: /toggle/i });
                                fireEvent.click(button);
                                return [2 /*return*/];
                            });
                        }); })];
                case 2:
                    _a.sent();
                    list = screen.getByRole('listbox');
                    expect(screen.queryByText('Nothing found.')).not.toBeInTheDocument();
                    expect(list).toHaveTextContent('Australia');
                    expect(list).toHaveTextContent('Canada');
                    expect(list).toHaveTextContent('United States');
                    return [2 /*return*/];
            }
        });
    }); });
    it('filters the list of countries when input is typed in', function () { return __awaiter(void 0, void 0, void 0, function () {
        var input, list;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, act(function () { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            render(React.createElement(CountryList, __assign({}, mockProps)));
                            return [2 /*return*/];
                        });
                    }); })];
                case 1:
                    _a.sent();
                    input = screen.getByRole('combobox');
                    return [4 /*yield*/, act(function () { return __awaiter(void 0, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                fireEvent.click(input);
                                fireEvent.change(input, { target: { value: 'au' } });
                                return [2 /*return*/];
                            });
                        }); })];
                case 2:
                    _a.sent();
                    list = screen.getByRole('listbox');
                    expect(screen.queryByText('Nothing found.')).not.toBeInTheDocument();
                    expect(list).toHaveTextContent('Australia');
                    expect(list).not.toHaveTextContent('Canada');
                    expect(list).not.toHaveTextContent('United States');
                    return [2 /*return*/];
            }
        });
    }); });
    it('displays "Nothing found." when no countries match the input', function () { return __awaiter(void 0, void 0, void 0, function () {
        var input, list;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, act(function () { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            render(React.createElement(CountryList, __assign({}, mockProps)));
                            return [2 /*return*/];
                        });
                    }); })];
                case 1:
                    _a.sent();
                    input = screen.getByRole('combobox');
                    return [4 /*yield*/, act(function () { return __awaiter(void 0, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                fireEvent.click(input);
                                fireEvent.change(input, { target: { value: 'zs' } });
                                return [2 /*return*/];
                            });
                        }); })];
                case 2:
                    _a.sent();
                    list = screen.getByRole('listbox');
                    expect(screen.queryByText('Nothing found.')).toBeInTheDocument();
                    expect(list).not.toHaveTextContent('Australia');
                    expect(list).not.toHaveTextContent('Canada');
                    expect(list).not.toHaveTextContent('United States');
                    return [2 /*return*/];
            }
        });
    }); });
    it('calls setSelectedCountry when a country is selected', function () { return __awaiter(void 0, void 0, void 0, function () {
        var input, toBeCalled;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, act(function () { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            render(React.createElement(CountryList, __assign({}, mockProps)));
                            return [2 /*return*/];
                        });
                    }); })];
                case 1:
                    _a.sent();
                    input = screen.getByRole('combobox');
                    return [4 /*yield*/, act(function () { return __awaiter(void 0, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                fireEvent.click(input);
                                fireEvent.change(input, { target: { value: 'au' } });
                                return [2 /*return*/];
                            });
                        }); })];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, act(function () { return __awaiter(void 0, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                fireEvent.click(screen.getByText('Australia'));
                                return [2 /*return*/];
                            });
                        }); })];
                case 3:
                    _a.sent();
                    toBeCalled = {
                        name: 'Australia',
                        id: 'Australia'
                    };
                    expect(mockProps.setSelectedCountry).toHaveBeenCalledTimes(1);
                    expect(mockProps.setSelectedCountry).toHaveBeenCalledWith(toBeCalled);
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=TypeCountry.test.js.map