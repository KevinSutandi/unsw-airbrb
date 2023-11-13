import React from 'react';
var TextForm = function (_a) {
    var name = _a.name, id = _a.id, autoComplete = _a.autoComplete, placeholder = _a.placeholder, value = _a.value, onChange = _a.onChange;
    return (React.createElement("input", { type: 'text', name: name, id: id, autoComplete: autoComplete, placeholder: placeholder, value: value, onChange: onChange, className: 'block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6' }));
};
export default TextForm;
//# sourceMappingURL=TextForm.js.map