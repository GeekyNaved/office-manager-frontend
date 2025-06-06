import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../services/axios';

export const fetchEmployees = createAsyncThunk('employees/fetchAll', async () => {
  const res = await axios.get('/employees');
  return res.data;
});

export const fetchEmployeesById = createAsyncThunk('employees/fetchById', async (id) => {
  const res = await axios.get(`${'/employees'}/${id}`);
  return res.data;
});

export const addEmployee = createAsyncThunk('employees/add', async (data) => {
  const res = await axios.post('/employees', data);
  return res.data;
});

export const updateEmployee = createAsyncThunk('employees/update', async ({ id, data }) => {
  const res = await axios.put(`${'/employees'}/${id}`, data);
  return res.data;
});

export const deleteEmployee = createAsyncThunk('employees/delete', async (id) => {
  await axios.delete(`${'/employees'}/${id}`);
  return id;
});

const employeeSlice = createSlice({
  name: 'employees',
  initialState: {
    employees: [],
    employee: null,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchEmployeesById.fulfilled, (state, action) => {
        state.employee = action.payload;
      })
      .addCase(addEmployee.fulfilled, (state, action) => {
        state.employees.push(action.payload);
      })
      .addCase(updateEmployee.fulfilled, (state, action) => {
        const index = state.employees.findIndex((emp) => emp.id === action.payload.id);
        if (index !== -1) state.employees[index] = action.payload;
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.employees = state.employees.filter((emp) => emp.id !== action.payload);
      });
  },
});

export default employeeSlice.reducer;
