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
import HomeProfileMenu from './HomeProfileMenu';
import React from 'react';
import NavBar from '../NavBar';
import { BrowserRouter } from 'react-router-dom';
import { localStorageMock } from '../../utils/helpers';
import * as axiosHelpers from '../../utils/axiosHelper'; // Import the module to mock the makeRequest function
jest.mock('../../utils/axiosHelper', function () { return ({
    makeRequest: jest.fn(),
}); });
Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
});
describe('Home Components Not Logged In', function () {
    var navbarSetup = function (isLoggedIn) {
        var setIsLoggedIn = jest.fn();
        var setErrorModalOpen = jest.fn();
        var setErrorMessage = jest.fn();
        var setProducts = jest.fn();
        var products = [];
        render(React.createElement(BrowserRouter, null,
            React.createElement(NavBar, { isLoggedIn: isLoggedIn, setIsLoggedIn: setIsLoggedIn, setErrorMessage: setErrorMessage, setErrorModalOpen: setErrorModalOpen, product: products, setProduct: setProducts, setIsFiltered: jest.fn(), setRunEffect: jest.fn(), runEffect: false })));
        return { setIsLoggedIn: setIsLoggedIn, setErrorMessage: setErrorMessage, setErrorModalOpen: setErrorModalOpen, isLoggedIn: isLoggedIn };
    };
    var profileIconSetup = function (isLoggedIn) {
        var openLoginModal = jest.fn();
        var openRegisterModal = jest.fn();
        var handleLogout = jest.fn();
        var navigateHostedListings = jest.fn();
        render(React.createElement(HomeProfileMenu, { openLoginModal: openLoginModal, openRegisterModal: openRegisterModal, isLoggedIn: isLoggedIn, handleLogout: handleLogout, navigateHostedListings: navigateHostedListings }));
        var profileButton = screen.getByRole('button', { name: /profile icon/i });
        fireEvent.click(profileButton);
        return {
            openLoginModal: openLoginModal,
            openRegisterModal: openRegisterModal,
            handleLogout: handleLogout,
            navigateHostedListings: navigateHostedListings,
            isLoggedIn: isLoggedIn,
        };
    };
    beforeEach(function () {
        jest.clearAllMocks();
    });
    it('Opening profile icon menu', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    profileIconSetup(false);
                    return [4 /*yield*/, waitFor(function () {
                            expect(screen.getByRole('menuitem', { name: /Sign up/i })).toBeInTheDocument();
                            expect(screen.getByRole('menuitem', { name: /Login/i })).toBeInTheDocument();
                        })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('Opening sign up modal', function () {
        var openRegisterModal = profileIconSetup(false).openRegisterModal;
        var signUpButton = screen.getByRole('menuitem', { name: /Sign up/i });
        fireEvent.click(signUpButton);
        expect(openRegisterModal).toHaveBeenCalled();
    });
    it('Opening log in modal', function () {
        var openLoginModal = profileIconSetup(false).openLoginModal;
        var loginButton = screen.getByRole('menuitem', { name: /Login/i });
        fireEvent.click(loginButton);
        expect(openLoginModal).toHaveBeenCalled();
    });
    it('Log out', function () { return __awaiter(void 0, void 0, void 0, function () {
        var setIsLoggedIn, profileBtn, logoutBtn;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    axiosHelpers.makeRequest.mockResolvedValue({
                        data: {},
                    });
                    window.localStorage.setItem('token', 'token');
                    setIsLoggedIn = navbarSetup(true).setIsLoggedIn;
                    profileBtn = screen.getByAltText('Profile Icon');
                    fireEvent.click(profileBtn);
                    logoutBtn = screen.getByRole('menuitem', { name: /log out/i });
                    fireEvent.click(logoutBtn);
                    return [4 /*yield*/, waitFor(function () {
                            expect(setIsLoggedIn).toHaveBeenCalledWith(false);
                        })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=HomeComponents.test.js.map