import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import departmentReducer from '../features/departments/departmentSlice';
import departmentHeadReducer from '../features/departmentHeadSlice';
import employeeReducer from '../features/employeeSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    departments: departmentReducer,
    departmentHeads: departmentHeadReducer,
    employees: employeeReducer
  },
});
