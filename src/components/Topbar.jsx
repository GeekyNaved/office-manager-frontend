import { useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';

const Topbar = () => {
  const dispatch = useDispatch();

  return (
    <div className="bg-white h-16 flex items-center justify-between px-4 shadow-md sticky top-0 z-10 ml-0">
      <div className="font-bold text-xl text-gray-800">Admin Panel</div>
      <button
        onClick={() => dispatch(logout())}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
};

export default Topbar;
