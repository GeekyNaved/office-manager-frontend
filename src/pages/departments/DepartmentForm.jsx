import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  createDepartment,
  updateDepartment,
  fetchDepartments,
} from '../../features/departments/departmentSlice';
import { useNavigate, useParams } from 'react-router-dom';

const DepartmentForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams(); // if editing

  const { list } = useSelector((state) => state.departments);
  const existing = list.find((d) => d.id === Number(id));

  const [form, setForm] = useState({
    name: '',
    description: '',
    profile_image: '',
  });

  const [preview, setPreview] = useState('');

  useEffect(() => {
    if (id && existing) {
      setForm({
        name: existing.name,
        description: existing.description,
        profile_image: existing.profile_image,
      });
      setPreview(existing.profile_image);
    }
  }, [id, existing]);

  useEffect(() => {
    dispatch(fetchDepartments());
  }, [dispatch]);

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
      dispatch(updateDepartment({ id, formData: form }));
    } else {
      dispatch(createDepartment(form));
    }
    navigate('/dashboard/departments');
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">{id ? 'Edit' : 'Add'} Department</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Profile Image</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="mt-2 w-24 h-24 object-cover rounded border"
            />
          )}
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          {id ? 'Update' : 'Create'}
        </button>
      </form>
    </div>
  );
};

export default DepartmentForm;
