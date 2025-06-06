import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerSuccess, registerFailure } from '../features/auth/authSlice';
import axios from '../services/axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      dispatch(registerFailure("Passwords do not match"));
      return;
    }

    try {
      const res = await axios.post('/auth/register', {
        username: formData.username,
        password: formData.password,
      });

      // response contains: token, user
      dispatch(registerSuccess({ token: res.data.token }));
      navigate('/dashboard');
    } catch (err) {
      dispatch(registerFailure(err.response?.data?.message || 'Registration failed'));
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-xl font-bold mb-4 text-center">Admin Register</h2>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          className="border w-full p-2 mb-3 rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="border w-full p-2 mb-3 rounded"
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="border w-full p-2 mb-4 rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white w-full p-2 rounded hover:bg-blue-700"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
