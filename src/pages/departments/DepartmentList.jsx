import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDepartments,
  deleteDepartment,
} from "../../features/departments/departmentSlice";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const DepartmentList = () => {
  const dispatch = useDispatch();
  const { list, loading, error } = useSelector((state) => state.departments);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchDepartments());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this department?")) {
      dispatch(deleteDepartment(id));
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Departments</h2>
        <Link
          to="/dashboard/departments/new"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          ➕ Add Department
        </Link>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3">Image</th>
              <th className="p-3">Name</th>
              <th className="p-3">Description</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {list.map((dept) => (
              <tr
                key={dept.id}
                className="border-t"
                onClick={() =>
                  navigate(`/dashboard/department-details/${dept.id}`)
                }
              >
                <td className="p-3">
                  {dept.profile_image ? (
                    <img
                      src={dept.profile_image}
                      alt={dept.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                  ) : (
                    <span className="text-gray-500">No image</span>
                  )}
                </td>
                <td className="p-3">{dept.name}</td>
                <td className="p-3">{dept.description}</td>
                <td className="p-3 space-x-2">
                  <Link
                    to={`/dashboard/departments/edit/${dept.id}`}
                    className="text-blue-600 hover:underline"
                    onClick={(e) => e.stopPropagation()} // Prevent row click
                  >
                    Edit
                  </Link>
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent row click event
                      handleDelete(dept.id);
                    }}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {list.length === 0 && !loading && (
              <tr>
                <td colSpan="4" className="p-4 text-center text-gray-500">
                  No departments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DepartmentList;
