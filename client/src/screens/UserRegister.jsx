import { useState } from 'react';
import AuthLayout from '../components/AuthLayout';
import InputField from '../components/InputField';
import SubmitButton from '../components/SubmitButton';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function UserRegister() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(
        `${import.meta.env.VITE_BASE_URL}/api/auth/register`,
        {
          fullName: name,
          email,
          password,
        },
        { withCredentials: true },
      )
      .then(() => {
        toast.success('User Registered Successfully');
        navigate('/home');
      })
      .catch((err) => {
        const errorMessage =
          err.response?.data?.message || 'Registration failed';
        toast.error(errorMessage);
      });
  };

  return (
    <AuthLayout title="User Sign Up">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <InputField
          label="Full Name"
          placeholder="John Doe"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <InputField
          label="Email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputField
          label="Password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <SubmitButton label="Sign Up" />
      </form>

      <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
        Already have an account?{' '}
        <a href="/user/login" className="text-indigo-600 hover:underline">
          Login
        </a>
      </p>
      <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
        Want to partner with us?{' '}
        <a
          href="/food-partner/register"
          className="text-indigo-600 hover:underline"
        >
          Register as Food Partner
        </a>
      </p>
    </AuthLayout>
  );
}
