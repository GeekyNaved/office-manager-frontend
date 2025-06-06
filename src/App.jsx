import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import DepartmentList from "./pages/departments/DepartmentList";
import DepartmentForm from "./pages/departments/DepartmentForm";
import PrivateRoute from "./utils/PrivateRoute";
import DepartmentHeadForm from "./pages/DepartmentHeadForm";
import DepartmentHeadList from "./pages/DepartmentHeadList";
import EmployeeList from "./pages/EmployeeList";
import DepartmentDetail from "./pages/DepartmentDetail";
import DepartmentHeadDetail from "./pages/DepartmentHeadDetail";
import EmployeeForm from "./pages/EmployeeForm";
import EmployeeDetail from "./pages/EmployeeDetail";
import Register from "./pages/Register";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<PrivateRoute />}>
        <Route path="/dashboard" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="heads" element={<DepartmentHeadList />} />
          <Route path="head-details/:id" element={<DepartmentHeadDetail />} />
          <Route path="heads/new" element={<DepartmentHeadForm />} />
          <Route path="heads/edit/:id" element={<DepartmentHeadForm />} />
          <Route path="departments" element={<DepartmentList />} />
          <Route path="department-details/:id" element={<DepartmentDetail />} />
          <Route path="departments/new" element={<DepartmentForm />} />
          <Route path="departments/edit/:id" element={<DepartmentForm />} />
          <Route path="employees" element={<EmployeeList />} />
          <Route path="employees/edit/:id" element={<EmployeeForm />} />
          <Route path="employees-details/:id" element={<EmployeeDetail />} />
          <Route path="employees/new" element={<EmployeeForm />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
