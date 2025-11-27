const AuthLayout = ({ title, children }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md p-8 rounded-2xl shadow-lg bg-white dark:bg-gray-800">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6 text-center">
          {title}
        </h1>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
