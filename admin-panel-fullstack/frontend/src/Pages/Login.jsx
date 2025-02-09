import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import CryptoJS from 'crypto-js';
import Logo from '../assets/logo.avif';

const Login = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');

  const validateForm = () => {
    let isValid = true;

    if (!email) {
      setEmailErrorMessage('Email is required.');
      toast.error('Email is required.');
      isValid = false;
    } else {
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailPattern.test(email)) {
        setEmailErrorMessage('Please enter a valid email address.');
        toast.error('Please enter a valid email address.');
        isValid = false;
      } else {
        setEmailErrorMessage('');
      }
    }
    if (!password) {
      setPasswordErrorMessage('Password is required.');
      toast.error('Password is required.');
      isValid = false;
    } else {
      setPasswordErrorMessage('');
    }
    return isValid;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;
    try {
      // Encrypt the payload
      const encryptedData = CryptoJS.AES.encrypt(
        JSON.stringify({ email, password }),
        import.meta.env.VITE_JWT_SECRET,
      ).toString();

      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/admin/login`, { data: encryptedData });

      const { token } = response?.data;
      if (token) {
        localStorage.setItem('adminToken', token);
        setIsAuthenticated(true);
        toast.success('Login successful!');
        navigate('/dashboard');
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || 'Login failed. Please try again.';
      toast.error(errorMessage);
    }
  };

  return (
    <section className="bg-gray-100 h-screen">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <img
              src={Logo}
              alt="logo"
              className="mx-auto w-[70px] md:w-[100px]"
            />
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
              {/* Email Input */}
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                {emailErrorMessage && (
                  <div className="text-red-500 text-sm">
                    {emailErrorMessage}
                  </div>
                )}
              </div>

              {/* Password Input */}
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                {passwordErrorMessage && (
                  <div className="text-red-500 text-sm">
                    {passwordErrorMessage}
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full text-white bg-[#2563eb] hover:bg-[#1d4ed8] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
