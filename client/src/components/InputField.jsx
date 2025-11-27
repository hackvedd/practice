import React from 'react';

const InputField = ({ label, type = 'text', placeholder, ...props }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        {...props}
        className="w-full px-3 py-2 rounded-lg border border-gray-300 
                dark:border-gray-600 bg-gray-50 dark:bg-gray-700 
                 text-gray-900 dark:text-gray-100 
                focus:ring-2 focus:ring-indigo-500 focus:outline-none"
      />
    </div>
  );
};

export default InputField;
