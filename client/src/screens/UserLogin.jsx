import React from 'react';
import AuthLayout from '../components/AuthLayout';
import InputField from '../components/InputField';
import SubmitButton from '../components/SubmitButton';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function UserLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(
        import.meta.env.VITE_BASE_URL + '/api/auth/login',
        {
          email,
          password,
        },
        { withCredentials: true },
      )
      .then(() => {
        toast.success('User Login Successfully');
        navigate('/home');
      })
      .catch((err) => {
        const errorMessage = err.response?.data?.message || 'Login failed';
        console.log(errorMessage);
      });
  };

  return (
    <AuthLayout title="User Login">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <InputField
          label="Email"
          type="email"
          placeholder="you@example.com"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputField
          label="Password"
          type="password"
          placeholder="••••••••"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="h-4 w-4 text-indigo-600" />
            <span className="text-gray-700 dark:text-gray-300">
              Remember me
            </span>
          </label>
          <a href="#" className="text-indigo-600 hover:underline">
            Forgot password?
          </a>
        </div>

        <SubmitButton label="Login" />
      </form>

      <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
        Don’t have an account?{' '}
        <a href="/user/register" className="text-indigo-600 hover:underline">
          Sign up
        </a>
      </p>
    </AuthLayout>
  );
}
