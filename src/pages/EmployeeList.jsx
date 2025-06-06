import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchEmployees, deleteEmployee } from "../features/employeeSlice";
import { Link, useNavigate } from "react-router-dom";

const EmployeeList = () => {
  const dispatch = useDispatch();
  const { employees, loading } = useSelector((state) => state.employees);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">All Employees</h2>
        <Link
          to="/dashboard/employees/new"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          ➕ Add Employee
        </Link>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {employees.map((emp) => (
            <div
              key={emp.id}
              className="bg-white shadow p-4 rounded"
              onClick={() => navigate(`/dashboard/employees-details/${emp.id}`)}
            >
              <img
                src={emp.profile_image}
                alt={emp.name}
                className="w-20 h-20 object-cover rounded-full mx-auto"
              />
              <h3 className="text-center font-semibold mt-2">{emp.name}</h3>
              <p className="text-center text-gray-500">
                #{emp.employee_number}
              </p>
              <div className="mt-3 flex justify-between text-sm">
                <Link
                  to={`/dashboard/employees/edit/${emp.id}`}
                  className="text-blue-600"
                  onClick={(e) => e.stopPropagation()} // Prevent row click
                >
                  ✏️ Edit
                </Link>
                <button
                  className="text-red-600"
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch(deleteEmployee(emp.id));
                  }}
                >
                  🗑 Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EmployeeList;