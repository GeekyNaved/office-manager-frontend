// src/pages/DepartmentHeadDetail.jsx
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDepartmentHeadById } from '../features/departmentHeadSlice';

const DepartmentHeadDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const departmentHead  = useSelector((state) => state.departmentHeads.selected);

  useEffect(() => {
    dispatch(fetchDepartmentHeadById(id));
  }, [dispatch, id]);

  if (!departmentHead) return <p>Loading...</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow rounded-lg">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{departmentHead.name}</h1>
          <p className="text-gray-600">Emp No: {departmentHead.employee_number}</p>
          <p className="text-gray-600">Age: {departmentHead.age}</p>
          <p className="mt-2">{departmentHead.profile_description}</p>

          <div className="mt-4">
            <p>
              <strong>Department:</strong>{' '}
              <Link to={`/dashboard/department-details/${departmentHead.Department?.id}`} className="text-blue-600 hover:underline">
                {departmentHead.Department?.name}
              </Link>
            </p>
          </div>
        </div>

        <img
          src={departmentHead.profile_image || '/placeholder.png'}
          alt={departmentHead.name}
          className="w-40 h-40 object-cover rounded-lg mt-4 md:mt-0"
        />
      </div>
    </div>
  );
};

export default DepartmentHeadDetail;
