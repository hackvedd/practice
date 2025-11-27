import { useNavigate } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import InputField from '../components/InputField';
import SubmitButton from '../components/SubmitButton';
import { useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';

export default function PartnerLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(
        `${import.meta.env.VITE_BASE_URL}/api/auth/food-partner/login`,
        {
          email,
          password,
        },
        { withCredentials: true },
      )
      .then(() => {
        toast.success('User Login Successfully');
        navigate('/create-food');
      })
      .catch((err) => {
        const errorMessage = err.response?.data?.message || 'Login failed';
        toast.error(errorMessage);
      });
  };

  return (
    <AuthLayout title="Food Partner Login">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <InputField
          label="Email"
          type="email"
          placeholder="partner@example.com"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputField
          label="Password"
          type="password"
          placeholder="••••••••"
          value={password}
          required
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
        New partner?{' '}
        <a
          href="/food-partner/register"
          className="text-indigo-600 hover:underline"
        >
          Register as Food Partner
        </a>
        <span className="mx-2">|</span>
        <a href="/user/register" className="text-indigo-600 hover:underline">
          Register as User
        </a>
      </p>
    </AuthLayout>
  );
}
