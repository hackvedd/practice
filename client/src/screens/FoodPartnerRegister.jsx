import { useNavigate } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import InputField from '../components/InputField';
import SubmitButton from '../components/SubmitButton';
import { useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';

export default function PartnerRegister() {
  const navigate = useNavigate();

  // Two-way binding state for all fields
  const [name, setName] = useState('');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState();
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(
        `${import.meta.env.VITE_BASE_URL}/api/auth/food-partner/register`,
        {
          name,
          email,
          password,
          contactName,
          phone,
          address,
        },
        { withCredentials: true },
      )
      .then(() => {
        toast.success('User Registered Successfully');
        navigate('/create-food');
      })
      .catch((err) => {
        const errorMessage =
          err.response?.data?.message || 'Registration failed';
        toast.error(errorMessage);
      });
  };

  return (
    <AuthLayout title="Food Partner Sign Up">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <InputField
          label="Restaurant/Business Name"
          name="name"
          placeholder="Awesome Foods"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <InputField
          label="Contact Name"
          name="contactName"
          placeholder="John Doe"
          value={contactName}
          onChange={(e) => setContactName(e.target.value)}
          required
        />
        <InputField
          label="Email"
          name="email"
          type="email"
          placeholder="partner@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <InputField
          label="Phone"
          name="phone"
          type="tel"
          placeholder="Enter phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          minLength={10}
          maxLength={10}
        />
        <InputField
          label="Address"
          name="address"
          placeholder="Enter address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        <InputField
          label="Password"
          name="password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <SubmitButton label="Register" />
      </form>

      <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
        Already a partner?{' '}
        <a
          href="/food-partner/login"
          className="text-indigo-600 hover:underline"
        >
          Login
        </a>
      </p>
      <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
        Want to order food?{' '}
        <a href="/user/register" className="text-indigo-600 hover:underline">
          Register as User
        </a>
      </p>
    </AuthLayout>
  );
}
