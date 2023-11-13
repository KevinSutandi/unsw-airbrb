import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './screens/HomePage';
import NavBar from './components/HomeComponents/NavBar';
import './input.css';
import HostedListings from './screens/HostedListings';
import ErrorModal from './components/ErrorModal';
import CreateListing from './screens/CreateListing';
import EditListing from './screens/EditListing';
function App() {
    document.title = 'AirBRB';
    // Manage the login status at the App level and pass it to child components
    var _a = useState(false), isLoggedIn = _a[0], setIsLoggedIn = _a[1];
    var _b = useState(false), errorModalOpen = _b[0], setErrorModalOpen = _b[1];
    var _c = useState(''), errorMessage = _c[0], setErrorMessage = _c[1];
    var _d = useState([]), products = _d[0], setProducts = _d[1];
    var _e = useState(false), isFiltered = _e[0], setIsFiltered = _e[1];
    return (React.createElement(React.Fragment, null,
        React.createElement(Router, null,
            React.createElement(NavBar, { isLoggedIn: isLoggedIn, setIsLoggedIn: setIsLoggedIn, setErrorMessage: setErrorMessage, setErrorModalOpen: setErrorModalOpen, product: products, setProduct: setProducts, setIsFiltered: setIsFiltered }),
            React.createElement(Routes, null,
                React.createElement(Route, { path: "/", element: React.createElement(HomePage, { isLoggedIn: isLoggedIn, products: products, setProducts: setProducts, isFiltered: isFiltered, setIsFiltered: setIsFiltered }) }),
                React.createElement(Route, { path: "/listings", element: React.createElement(HostedListings, { setErrorMessage: setErrorMessage, setErrorModalOpen: setErrorModalOpen, isLoggedIn: isLoggedIn, setIsLoggedIn: setIsLoggedIn }) }),
                React.createElement(Route, { path: "/listings/create", element: React.createElement(CreateListing, { setErrorMessage: setErrorMessage, setErrorModalOpen: setErrorModalOpen }) }),
                React.createElement(Route, { path: "/listings/edit/:id", element: React.createElement(EditListing, { setErrorMessage: setErrorMessage, setErrorModalOpen: setErrorModalOpen }) }))),
        React.createElement(ErrorModal, { open: errorModalOpen, onClose: function () { return setErrorModalOpen(false); }, errorMessage: errorMessage })));
}
export default App;
//# sourceMappingURL=App.js.map