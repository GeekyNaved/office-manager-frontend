import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchDepartmentById } from "../features/departments/departmentSlice";

const DepartmentDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const department = useSelector((state) => state.departments.selected);

  useEffect(() => {
    dispatch(fetchDepartmentById(id));
  }, [dispatch, id]);

  if (!department) return <p>Loading...</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto bg-white shadow rounded-lg">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{department.name}</h1>
          <p className="mt-2 text-gray-600">{department.description}</p>

          {/* <div className="mt-4">
            <h2 className="text-lg font-semibold">Department Head:</h2>
            {department.heads ? (
              <Link to={`/department-heads/${department.heads[0].id}`} className="flex items-center mt-2 text-blue-600 hover:underline">
                <img
                  src={department.heads[0].profile_image || '/placeholder.png'}
                  alt={department.heads[0].name}
                  className="w-10 h-10 rounded-full mr-2"
                />
                {department.DepartmentHead.name}
              </Link>
            ) : (
              <p>No department head assigned.</p>
            )}
          </div> */}
          <div className="mt-4">
            <h2 className="text-lg font-semibold">Department Heads:</h2>
            {department.heads && department.heads.length > 0 ? (
              department.heads.map((head) => (
                <Link
                  key={head.id}
                  to={`/dashboard/head-details/${head.id}`}
                  className="flex items-center mt-2 text-blue-600 hover:underline"
                >
                  <img
                    src={head.profile_image || "/placeholder.png"}
                    alt={head.name}
                    className="w-10 h-10 rounded-full mr-2"
                  />
                  {head.name}
                </Link>
              ))
            ) : (
              <p>No department head assigned.</p>
            )}
          </div>
        </div>

        <img
          src={department.profile_image || "/placeholder.png"}
          alt={department.name}
          className="w-40 h-40 object-cover rounded-lg mt-4 md:mt-0"
        />
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Team Members</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {department.employees && department.employees.length > 0 ? (
            department.employees.map((emp) => (
              <Link
                to={`/dashboard/employees-details/${emp.id}`}
                key={emp.id}
                className="bg-gray-50 shadow-sm rounded-lg p-4 hover:shadow-md transition"
              >
                <img
                  src={emp.profile_image || "/placeholder.png"}
                  alt={emp.name}
                  className="w-full h-32 object-cover rounded-md mb-2"
                />
                <h3 className="text-md font-medium">{emp.name}</h3>
              </Link>
            ))
          ) : (
            <p>No employees in this department.</p>
          )}
        </div>
      </div>

      {/* <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Team Members</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {department.Employees && department.Employees.length > 0 ? (
            department.Employees.map((emp) => (
              <Link
                to={`/employees/${emp.id}`}
                key={emp.id}
                className="bg-gray-50 shadow-sm rounded-lg p-4 hover:shadow-md transition"
              >
                <img
                  src={emp.profile_image || '/placeholder.png'}
                  alt={emp.name}
                  className="w-full h-32 object-cover rounded-md mb-2"
                />
                <h3 className="text-md font-medium">{emp.name}</h3>
              </Link>
            ))
          ) : (
            <p>No employees in this department.</p>
          )}
        </div>
      </div> */}
    </div>
  );
};

export default DepartmentDetail;
