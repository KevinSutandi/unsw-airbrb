export var areDatesValid = function (fromDate, toDate) {
    // Check for undefined or null to ensure function only returns boolean
    if (!fromDate || !toDate)
        return false;
    return fromDate && toDate && fromDate < toDate;
};
export var localStorageMock = (function () {
    var store = {};
    return {
        getItem: function (key) {
            return store[key] || null;
        },
        setItem: function (key, value) {
            store[key] = value.toString();
        },
        removeItem: function (key) {
            delete store[key];
        },
        clear: function () {
            store = {};
        },
    };
})();
//# sourceMappingURL=helpers.js.map