import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDepartmentHeads,
  deleteDepartmentHead,
} from "../features/departmentHeadSlice";
import { Link, useNavigate } from "react-router-dom";

const DepartmentHeadList = () => {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.departmentHeads);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchDepartmentHeads());
  }, [dispatch]);

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-bold">Department Heads</h2>
        <Link to="new" className="bg-blue-500 text-white px-4 py-2 rounded">
          ➕ Add Head
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((head) => (
          <div
            key={head.id}
            className="bg-white p-4 rounded shadow"
            onClick={() => navigate(`/dashboard/head-details/${head.id}`)}
          >
            <div className="flex items-center gap-4">
              <img
                src={head.profile_image}
                alt={head.name}
                className="w-16 h-16 object-cover rounded"
              />
              <div>
                <h3 className="text-lg font-bold">{head.name}</h3>
                <p className="text-gray-600">Emp#: {head.employee_number}</p>
                <p className="text-sm">{head.profile_description}</p>
                <p className="text-sm">Dept ID: {head.department_id}</p>
              </div>
            </div>
            <div className="flex gap-4 mt-2">
              <Link
                to={`/dashboard/heads/edit/${head.id}`}
                className="text-blue-600"
                onClick={(e) => e.stopPropagation()} // Prevent row click
              >
                Edit
              </Link>
              <button
                onClick={(e) =>{ 
                  e.stopPropagation(); // Prevent row click event
                  dispatch(deleteDepartmentHead(head.id))}}
                className="text-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        {items.length === 0 && !loading && <p>No department heads found.</p>}
      </div>
    </div>
  );
};

export default DepartmentHeadList;
