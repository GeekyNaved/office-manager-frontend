import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addEmployee, updateEmployee, fetchEmployeesById } from '../features/employeeSlice';
import { fetchDepartments } from '../features/departments/departmentSlice';
import { fetchDepartmentHeads } from '../features/departmentHeadSlice';

const EmployeeForm = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const departments  = useSelector((state) => state.departments.list);
  const departmentHeads  = useSelector((state) => state.departmentHeads.items);
  const { employee } = useSelector((state) => state.employees);

  const [formData, setFormData] = useState({
    name: '',
    employee_number: '',
    age: '',
    profile_image: '',
    profile_description: '',
    department_id: '',
    report_to_id: '',
  });

  useEffect(() => {
    dispatch(fetchDepartments());
    dispatch(fetchDepartmentHeads());
    if (isEdit) dispatch(fetchEmployeesById(id));
  }, [dispatch, id, isEdit]);

  useEffect(() => {
    if (isEdit && employee) {
      setFormData(employee);
    }
  }, [employee, isEdit]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'profile_image') {
      const reader = new FileReader();
      reader.onload = () => setFormData({ ...formData, profile_image: reader.result });
      reader.readAsDataURL(files[0]);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      dispatch(updateEmployee({ id, data: formData }));
    } else {
      dispatch(addEmployee(formData));
    }
    navigate('/dashboard/employees');
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">{isEdit ? 'Edit' : 'Add'} Employee</h2>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="w-full p-2 border rounded"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="employee_number"
          placeholder="Employee Number"
          className="w-full p-2 border rounded"
          value={formData.employee_number}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          className="w-full p-2 border rounded"
          value={formData.age}
          onChange={handleChange}
        />
        <textarea
          name="profile_description"
          placeholder="Profile Description"
          className="w-full p-2 border rounded"
          value={formData.profile_description}
          onChange={handleChange}
        />
        <input
          type="file"
          name="profile_image"
          accept="image/*"
          className="w-full"
          onChange={handleChange}
        />
        {formData.profile_image && (
          <img
            src={formData.profile_image}
            alt="Preview"
            className="w-24 h-24 object-cover rounded"
          />
        )}
        <select
          name="department_id"
          className="w-full p-2 border rounded"
          value={formData.department_id}
          onChange={handleChange}
          required
        >
          <option value="">Select Department</option>
          {departments?.map((dep) => (
            <option key={dep.id} value={dep.id}>{dep.name}</option>
          ))}
        </select>
        <select
          name="report_to_id"
          className="w-full p-2 border rounded"
          value={formData.report_to_id}
          onChange={handleChange}
        >
          <option value="">Report To</option>
          {departmentHeads.map((head) => (
            <option key={head.id} value={head.id}>{head.name}</option>
          ))}
        </select>
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          {isEdit ? 'Update' : 'Create'}
        </button>
      </form>
    </div>
  );
};

export default EmployeeForm;
