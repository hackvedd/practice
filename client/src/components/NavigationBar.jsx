import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const NavigationBar = ({ className = '' }) => {
  const location = useLocation();

  return (
    <nav
      className={`bg-white border-t border-gray-200 z-50 rounded-b-xl shadow ${className} w-[360px] sm:w-[400px] md:w-[430px] lg:w-[480px]`}
    >
      <div className="flex justify-around items-center h-14">
        <Link to="/home" className="flex flex-col items-center group">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill={location.pathname === '/home' ? '#6366f1' : 'none'}
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="#6366f1"
            className="w-7 h-7"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 12l9-9 9 9M4.5 10.5V21h15V10.5"
            />
          </svg>
          <span
            className={`text-xs mt-1 ${
              location.pathname === '/home'
                ? 'text-indigo-600 font-semibold'
                : 'text-gray-500'
            }`}
          >
            Home
          </span>
        </Link>
        <Link to="/save" className="flex flex-col items-center group">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill={location.pathname === '/save' ? '#6366f1' : 'none'}
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="#6366f1"
            className="w-7 h-7"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 3H7a2 2 0 0 0-2 2v16l7-5 7 5V5a2 2 0 0 0-2-2z"
            />
          </svg>
          <span
            className={`text-xs mt-1 ${
              location.pathname === '/save'
                ? 'text-indigo-600 font-semibold'
                : 'text-gray-500'
            }`}
          >
            Saved
          </span>
        </Link>
      </div>
    </nav>
  );
};

export default NavigationBar;
