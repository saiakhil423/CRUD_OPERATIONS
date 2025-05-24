import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (username && password) {
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/token/', {
          username: username,
          password: password,
        });
        localStorage.setItem('access_token', response.data.access);
        localStorage.setItem('refresh_token', response.data.refresh);
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
        navigate('/dashboard');
      } catch (err) {
        setError('Invalid username or password');
      }
    } else {
      setError('Please enter username and password');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen w-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white shadow-lg p-8 rounded-md w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        {error && <p className="text-red-600 mb-4 text-center">{error}</p>}
        <input
          className="border p-2 w-full mb-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          type="text"
        />
        <input
          className="border p-2 w-full mb-6 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button 
          type="submit" 
          className="bg-blue-600 text-white p-2 w-full rounded hover:bg-blue-700 mb-4 transition duration-200"
        >
          Login
        </button>
        <button
          type="button"
          onClick={() => navigate('/signup')}
          className="bg-gray-200 text-gray-800 p-2 w-full rounded hover:bg-gray-300 transition duration-200"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default LoginPage;