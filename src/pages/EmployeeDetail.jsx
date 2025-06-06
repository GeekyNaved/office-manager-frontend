// src/pages/EmployeeDetail.jsx
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployeesById } from '../features/employeeSlice';

const EmployeeDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { employee } = useSelector((state) => state.employees);

  useEffect(() => {
    dispatch(fetchEmployeesById(id));
  }, [dispatch, id]);

  if (!employee) return <p>Loading...</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow rounded-lg">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{employee.name}</h1>
          <p className="text-gray-600">Emp No: {employee.employee_number}</p>
          <p className="text-gray-600">Age: {employee.age}</p>
          <p className="mt-2">{employee.profile_description}</p>

          <div className="mt-4">
            <p>
              <strong>Department:</strong>{' '}
              <Link to={`/dashboard/department-details/${employee.Department?.id}`} className="text-blue-600 hover:underline">
                {employee.Department?.name}
              </Link>
            </p>
            <p>
              <strong>Reports To:</strong>{' '}
              <Link to={`/dashboard/head-details/${employee.DepartmentHead?.id}`} className="text-blue-600 hover:underline">
                {employee.DepartmentHead?.name}
              </Link>
            </p>
          </div>
        </div>

        <img
          src={employee.profile_image || '/placeholder.png'}
          alt={employee.name}
          className="w-40 h-40 object-cover rounded-lg mt-4 md:mt-0"
        />
      </div>
    </div>
  );
};

export default EmployeeDetail;
