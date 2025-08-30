import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from '../../axios.js';
import { setUser, setAccessToken } from '../../store/authSlice';
import UserImage from '../../../public/noni.jpg';
import Loading from '../Loading.jsx';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('/users/login', { username, password });
      const { user, accessToken } = response.data.data;

      dispatch(setUser(user));
      dispatch(setAccessToken(accessToken));

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('user', JSON.stringify(user));

      navigate('/');
    } catch (err) {
      setError('Invalid username or password');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-900">
      <Loading isLoading={loading} />
      <div className="flex w-full max-w-5xl overflow-hidden bg-whiterounded-2xl shadow-2xl">
        {/* Left - Form */}
        <div className="w-full md:w-1/2 p-10 space-y-6 border border-purple-700 rounded-md">
          <h2 className="text-4xl font-bold text-purple-700">Welcome Back</h2>
          <p className="text-sm text-gray-500">Enter your credentials to access your account</p>

          {error && (
            <div className="px-4 py-2 text-sm text-red-600 bg-red-100 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-2xl mb-0px font-medium text-purple-700">Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className=" text-xl w-full px-4 py-2 mt-1 border rounded-md shadow-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-2xl mb-0px font-medium text-purple-700">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="  text-xl w-full px-4 py-2 mt-1 border rounded-md shadow-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 text-white transition-all duration-200 bg-purple-600 rounded hover:bg-purple-700 disabled:opacity-50"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <button
            onClick={() => navigate('/register')}
            className="w-full py-2 mt-2 text-purple-600 border border-purple-600 rounded hover:bg-purple-50  ease-in-out duration-300"
          >
            Sign Up
          </button>
        </div>

        {/* Right - Image and Message */}
        <div className="mx-[-2px] border border-purple-700 rounded-md md:mx-0 relative hidden w-1/2 p-10 bg-gradient-to-br from-purple-700 to-purple-500 md:flex flex-col justify-center items-center text-white">
          <img src={UserImage} alt="User" className="w-auto h-auto mb-6 rounded-lg shadow-lg" />
          <h2 className="text-3xl font-semibold">Glad to see you again!</h2>
          <p className="mt-4 italic text-center text-gray-100 px-4">
            Recruiters use username <span className="font-bold">test1</span> and password <span className="font-bold">test</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
