import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="bg-gray-800 text-white w-64 h-full fixed top-0 left-0 hidden md:block">
      <div className="p-4 text-xl font-bold border-b border-gray-600">Office Manager</div>
      <nav className="flex flex-col gap-2 p-4">
        <NavLink to="/dashboard/departments" className="hover:bg-gray-700 p-2 rounded">Departments</NavLink>
        <NavLink to="/dashboard/heads" className="hover:bg-gray-700 p-2 rounded">Department Heads</NavLink>
        <NavLink to="/dashboard/employees" className="hover:bg-gray-700 p-2 rounded">Employees</NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
