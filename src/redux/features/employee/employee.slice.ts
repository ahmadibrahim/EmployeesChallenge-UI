import { ActionReducerMapBuilder, Draft } from "@reduxjs/toolkit";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit/react";

import { Employee, IEmployeeState } from "@/types/employee";
import {
  IErrorPayloadAction,
  ISuccessPayloadAction
} from "@/types/global/types";

import { EmployeeServices } from "./employee.api";

export const INITIAL_STATE: IEmployeeState = {
  employee: null,
  selectedEmployeeId: null,
  loading: false,
  error: ""
};

export const getEmployee = createAsyncThunk<Employee, void>(
  "employee/getEmployee",
  async (_, { rejectWithValue, getState }) => {
    const { employee } = getState() as { employee: IEmployeeState };
    try {
      return await EmployeeServices.fetchEmplyeeInfos(
        employee.selectedEmployeeId || "1234"
      );
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const employeeSlice = createSlice({
  name: "employee",
  initialState: INITIAL_STATE,
  reducers: {
    setSelectedEmployeeId: (state, action: PayloadAction<string>) => {
      state.selectedEmployeeId = action.payload || null;
      state.employee = null;
    }
  },
  selectors: {
    selectEmployee: state => state.employee,
    selectEmployeeLoading: (state: IEmployeeState) => state.loading,
    selectSelectedEmployeeId: state => state.selectedEmployeeId
  },
  extraReducers: (builder: ActionReducerMapBuilder<IEmployeeState>) => {
    builder
      .addCase(getEmployee.pending, (state: IEmployeeState) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(
        getEmployee.fulfilled,
        (
          state: Draft<IEmployeeState>,
          action: ISuccessPayloadAction<Employee>
        ) => {
          state.loading = false;
          state.employee = action.payload;
        }
      )
      .addCase(
        getEmployee.rejected,
        (state: Draft<IEmployeeState>, action: IErrorPayloadAction) => {
          state.loading = false;
          state.employee = null;
          state.error = action.error.message || "";
        }
      );
  }
});

export const { setSelectedEmployeeId } = employeeSlice.actions;

export const {
  selectEmployee,
  selectEmployeeLoading,
  selectSelectedEmployeeId
} = employeeSlice.selectors;
