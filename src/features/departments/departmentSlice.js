import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../services/axios";

// 👉 Async Thunks
export const fetchDepartments = createAsyncThunk(
  "departments/fetchAll",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get("/department");
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to load departments"
      );
    }
  }
);

export const fetchDepartmentById = createAsyncThunk(
  "departments/fetchById",
  async (id, thunkAPI) => {
    try {
      const res = await axios.get(`/department/${id}`);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch department"
      );
    }
  }
);

export const createDepartment = createAsyncThunk(
  "departments/create",
  async (formData, thunkAPI) => {
    try {
      const res = await axios.post("/department", formData);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Creation failed"
      );
    }
  }
);

export const updateDepartment = createAsyncThunk(
  "departments/update",
  async ({ id, formData }, thunkAPI) => {
    try {
      const res = await axios.put(`/department/${id}`, formData);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Update failed"
      );
    }
  }
);

export const deleteDepartment = createAsyncThunk(
  "departments/delete",
  async (id, thunkAPI) => {
    try {
      await axios.delete(`/department/${id}`);
      return id;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Deletion failed"
      );
    }
  }
);

// 👉 Initial State
const initialState = {
  list: [],
  selected: null,
  loading: false,
  error: null,
};

// 👉 Slice
const departmentSlice = createSlice({
  name: "departments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDepartments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDepartments.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchDepartments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchDepartmentById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDepartmentById.fulfilled, (state, action) => {
        state.loading = false;
        state.selected = action.payload;
      })
      .addCase(fetchDepartmentById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(createDepartment.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(updateDepartment.fulfilled, (state, action) => {
        const index = state.list.findIndex(
          (dep) => dep.id === action.payload.id
        );
        if (index !== -1) state.list[index] = action.payload;
      })
      .addCase(deleteDepartment.fulfilled, (state, action) => {
        state.list = state.list.filter((dep) => dep.id !== action.payload);
      });
  },
});

export default departmentSlice.reducer;
