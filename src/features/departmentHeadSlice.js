import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../services/axios";

// Thunks
export const fetchDepartmentHeads = createAsyncThunk(
  "departmentHeads/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/departmentHead");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data || error.message);
    }
  }
);

// fetchByID
// Add this thunk alongside others

export const fetchDepartmentHeadById = createAsyncThunk(
  "departmentHeads/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/departmentHead/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const addDepartmentHead = createAsyncThunk(
  "departmentHeads/add",
  async (departmentHeadData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/departmentHead", departmentHeadData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data || error.message);
    }
  }
);

export const updateDepartmentHead = createAsyncThunk(
  "departmentHeads/update",
  async ({ id, departmentHeadData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${"/departmentHead"}/${id}`,
        departmentHeadData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data || error.message);
    }
  }
);

export const deleteDepartmentHead = createAsyncThunk(
  "departmentHeads/delete",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${"/departmentHead"}/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data || error.message);
    }
  }
);

// Slice
const departmentHeadSlice = createSlice({
  name: "departmentHeads",
  initialState: {
    items: [],
    selected: null,
    selectedLoading: false,
    selectedError: null,
    loading: false,
    error: null,
  },
  reducers: {
    // any sync reducers if needed
  },
  extraReducers: (builder) => {
    builder
      // fetch all
      .addCase(fetchDepartmentHeads.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDepartmentHeads.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchDepartmentHeads.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //fetchByID
      .addCase(fetchDepartmentHeadById.pending, (state) => {
        state.selectedLoading = true;
        state.selectedError = null;
        state.selected = null;
      })
      .addCase(fetchDepartmentHeadById.fulfilled, (state, action) => {
        state.selectedLoading = false;
        state.selected = action.payload;
      })
      .addCase(fetchDepartmentHeadById.rejected, (state, action) => {
        state.selectedLoading = false;
        state.selectedError = action.payload;
      })

      // add
      .addCase(addDepartmentHead.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addDepartmentHead.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(addDepartmentHead.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // update
      .addCase(updateDepartmentHead.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDepartmentHead.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(updateDepartmentHead.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // delete
      .addCase(deleteDepartmentHead.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteDepartmentHead.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter((item) => item.id !== action.payload);
      })
      .addCase(deleteDepartmentHead.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default departmentHeadSlice.reducer;
