import React from 'react';

const SubmitButton = ({ label }) => {
  return (
    <button
      type="submit"
      className="w-full py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 
                 text-white font-medium transition"
    >
      {label}
    </button>
  );
};

export default SubmitButton;
