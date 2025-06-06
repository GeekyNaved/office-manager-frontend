import React from 'react';
import DepartmentsList from './departments/DepartmentList'; // Assuming this is your component

const Dashboard = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Departments</h1>
      <DepartmentsList />
    </div>
  );
};

export default Dashboard;
