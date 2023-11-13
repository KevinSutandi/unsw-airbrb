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
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import LoginModal from './LoginModal';
import React from 'react';
import RegisterModal from './RegisterModal';
import ResizeObserver from 'resize-observer-polyfill';
import * as axiosHelpers from '../../utils/axiosHelper'; // Import the module to mock the makeRequest function
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
describe('Auth Modals', function () {
    var registerSetup = function () {
        var setIsLoggedIn = jest.fn();
        var openLoginModal = jest.fn();
        var onClose = jest.fn();
        var setRegisterModalOpen = jest.fn();
        var setErrorMessage = jest.fn();
        var setErrorModalOpen = jest.fn();
        var setNewToken = jest.fn();
        render(React.createElement(RegisterModal, { open: true, setIsLoggedIn: setIsLoggedIn, openLoginModal: openLoginModal, onClose: onClose, setRegisterModalOpen: setRegisterModalOpen, setErrorMessage: setErrorMessage, setErrorModalOpen: setErrorModalOpen, setNewToken: setNewToken }));
        return {
            setIsLoggedIn: setIsLoggedIn,
            openLoginModal: openLoginModal,
            onClose: onClose,
            setRegisterModalOpen: setRegisterModalOpen,
            setErrorMessage: setErrorMessage,
            setErrorModalOpen: setErrorModalOpen,
            setNewToken: setNewToken,
        };
    };
    var loginSetup = function () {
        var setIsLoggedIn = jest.fn();
        var openRegisterModal = jest.fn();
        var onClose = jest.fn();
        var setLoginModalOpen = jest.fn();
        var setErrorMessage = jest.fn();
        var setErrorModalOpen = jest.fn();
        var setNewToken = jest.fn();
        render(React.createElement(LoginModal, { open: true, setIsLoggedIn: setIsLoggedIn, openRegisterModal: openRegisterModal, onClose: onClose, setLoginModalOpen: setLoginModalOpen, setErrorMessage: setErrorMessage, setErrorModalOpen: setErrorModalOpen, setNewToken: setNewToken }));
        return {
            setIsLoggedIn: setIsLoggedIn,
            openRegisterModal: openRegisterModal,
            onClose: onClose,
            setLoginModalOpen: setLoginModalOpen,
            setErrorMessage: setErrorMessage,
            setErrorModalOpen: setErrorModalOpen,
            setNewToken: setNewToken,
        };
    };
    var submitRegisterForm = function () {
        fireEvent.change(screen.getByLabelText(/email/i), {
            target: { value: 'test@gmail.com' },
        });
        fireEvent.change(screen.getByLabelText(/name/i), {
            target: { value: 'Mark' },
        });
        fireEvent.change(screen.getByLabelText(/password/i), {
            target: { value: 'test1234567890' },
        });
        fireEvent.change(screen.getByLabelText(/confirm password/i), {
            target: { value: 'test1234567890' },
        });
        fireEvent.click(screen.getByRole('button', { name: /register/i }));
    };
    var submitLoginForm = function () {
        fireEvent.change(screen.getByLabelText(/email/i), {
            target: { value: 'test@gmail.com' },
        });
        fireEvent.change(screen.getByLabelText(/password/i), {
            target: { value: 'passtest' },
        });
        fireEvent.click(screen.getByRole('button', { name: /login/i }));
    };
    beforeEach(function () {
        jest.clearAllMocks();
    });
    it('Switch between login to register modal', function () {
        var openRegisterModal = loginSetup().openRegisterModal;
        var registerButton = screen.getByRole('button', { name: /Register/i });
        fireEvent.click(registerButton);
        expect(openRegisterModal).toHaveBeenCalledTimes(1);
    });
    it('Switch between register to login modal', function () {
        var openLoginModal = registerSetup().openLoginModal;
        var loginButton = screen.getByRole('button', { name: /Login/i });
        fireEvent.click(loginButton);
        expect(openLoginModal).toHaveBeenCalledTimes(1);
    });
    it('Register fails', function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, setIsLoggedIn, setErrorModalOpen, setErrorMessage;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    axiosHelpers.makeRequest.mockRejectedValue({
                        response: {
                            data: {
                                error: 'Register failed',
                            },
                        },
                        isAxiosError: true,
                    });
                    _a = registerSetup(), setIsLoggedIn = _a.setIsLoggedIn, setErrorModalOpen = _a.setErrorModalOpen, setErrorMessage = _a.setErrorMessage;
                    submitRegisterForm();
                    return [4 /*yield*/, waitFor(function () {
                            expect(setErrorModalOpen).toHaveBeenCalledWith(true);
                            expect(setErrorMessage).toHaveBeenCalledWith('Register failed');
                            expect(setIsLoggedIn).not.toHaveBeenCalled();
                        })];
                case 1:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('Register successful', function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, setIsLoggedIn, setNewToken;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    axiosHelpers.makeRequest.mockResolvedValue({
                        data: {
                            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhheWRlbkB1bnN3LmVkdS5hdSIsImlhdCI6MTYwMzk0MzIzMH0.b37PfwlcH_cue6yhgvDt2IiNvhRACf79hTNtacYB94Q',
                        },
                    });
                    _a = registerSetup(), setIsLoggedIn = _a.setIsLoggedIn, setNewToken = _a.setNewToken;
                    submitRegisterForm();
                    return [4 /*yield*/, waitFor(function () {
                            expect(setIsLoggedIn).toHaveBeenCalledWith(true);
                            expect(setNewToken).toHaveBeenCalledWith('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhheWRlbkB1bnN3LmVkdS5hdSIsImlhdCI6MTYwMzk0MzIzMH0.b37PfwlcH_cue6yhgvDt2IiNvhRACf79hTNtacYB94Q');
                        })];
                case 1:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('Login fails', function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, setErrorModalOpen, setErrorMessage, setIsLoggedIn;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    axiosHelpers.makeRequest.mockRejectedValue({
                        response: {
                            data: {
                                error: 'Invalid input',
                            },
                        },
                        isAxiosError: true,
                    });
                    _a = loginSetup(), setErrorModalOpen = _a.setErrorModalOpen, setErrorMessage = _a.setErrorMessage, setIsLoggedIn = _a.setIsLoggedIn;
                    submitLoginForm();
                    return [4 /*yield*/, waitFor(function () {
                            expect(setErrorModalOpen).toHaveBeenCalledWith(true);
                            expect(setErrorMessage).toHaveBeenCalledWith('Invalid input');
                            expect(setIsLoggedIn).not.toHaveBeenCalled();
                        })];
                case 1:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('Login successful', function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, setIsLoggedIn, setNewToken;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    axiosHelpers.makeRequest.mockResolvedValue({
                        data: {
                            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhheWRlbkB1bnN3LmVkdS5hdSIsImlhdCI6MTYwMzk0MzIzMH0.b37PfwlcH_cue6yhgvDt2IiNvhRACf79hTNtacYB94Q',
                        },
                    });
                    _a = loginSetup(), setIsLoggedIn = _a.setIsLoggedIn, setNewToken = _a.setNewToken;
                    submitLoginForm();
                    return [4 /*yield*/, waitFor(function () {
                            expect(setIsLoggedIn).toHaveBeenCalledWith(true);
                            expect(setNewToken).toHaveBeenCalledWith('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhheWRlbkB1bnN3LmVkdS5hdSIsImlhdCI6MTYwMzk0MzIzMH0.b37PfwlcH_cue6yhgvDt2IiNvhRACf79hTNtacYB94Q');
                        })];
                case 1:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=AuthModals.test.js.map