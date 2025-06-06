import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addDepartmentHead,
  updateDepartmentHead,
  fetchDepartmentHeads,
} from '../features/departmentHeadSlice';
import { fetchDepartments } from '../features/departments/departmentSlice';
import { useParams, useNavigate } from 'react-router-dom';

const DepartmentHeadForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { items: headList } = useSelector((state) => state.departmentHeads);
  const { list: deptList } = useSelector((state) => state.departments);

  const existing = headList.find((h) => h.id === Number(id));

  const [form, setForm] = useState({
    name: '',
    employee_number: '',
    age: '',
    profile_image: '',
    profile_description: '',
    department_id: '',
  });

  const [preview, setPreview] = useState('');

  useEffect(() => {
    dispatch(fetchDepartments());
    dispatch(fetchDepartmentHeads());
  }, [dispatch]);

  useEffect(() => {
    if (id && existing) {
      setForm({
        name: existing.name,
        employee_number: existing.employee_number,
        age: existing.age,
        profile_image: existing.profile_image,
        profile_description: existing.profile_description,
        department_id: existing.department_id,
      });
      setPreview(existing.profile_image);
    }
  }, [id, existing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
      setForm((prev) => ({ ...prev, profile_image: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      dispatch(updateDepartmentHead({ id, departmentHeadData: form }));
    } else {
      dispatch(addDepartmentHead(form));
    }
    navigate('/dashboard/heads');
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">{id ? 'Edit' : 'Add'} Department Head</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Name" required className="w-full p-2 border rounded" />
        <input type="text" name="employee_number" value={form.employee_number} onChange={handleChange} placeholder="Employee Number" required className="w-full p-2 border rounded" />
        <input type="number" name="age" value={form.age} onChange={handleChange} placeholder="Age" required className="w-full p-2 border rounded" />
        <textarea name="profile_description" value={form.profile_description} onChange={handleChange} placeholder="Profile Description" className="w-full p-2 border rounded" />
        
        <select name="department_id" value={form.department_id} onChange={handleChange} required className="w-full p-2 border rounded">
          <option value="">Select Department</option>
          {deptList.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name}
            </option>
          ))}
        </select>

        <input type="file" accept="image/*" onChange={handleImageChange} />
        {preview && <img src={preview} alt="Preview" className="mt-2 w-24 h-24 object-cover rounded" />}

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          {id ? 'Update' : 'Create'}
        </button>
      </form>
    </div>
  );
};

export default DepartmentHeadForm;
