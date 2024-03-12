import { ActionReducerMapBuilder, Draft } from "@reduxjs/toolkit";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  IEmployeesFilters,
  IEmployeesResponse,
  IEmployeesState,
  IPagedEmployeesResponse
} from "@/types/employees";
import {
  IErrorPayloadAction,
  ISuccessPayloadAction
} from "@/types/global/types";

import { EmployeesServices } from "./employees.api";

export const INITIAL_STATE: IEmployeesState = {
  employees: [],
  loading: false,
  error: "",
  meta: null
};

export const getEmployees = createAsyncThunk<
  IPagedEmployeesResponse | IEmployeesResponse,
  IEmployeesFilters
>("employees/getEmployees", async (params, { rejectWithValue }) => {
  try {
    return await EmployeesServices.getEmployees(params);
  } catch (err) {
    return rejectWithValue(err);
  }
});

const isIPagedEmployeesResponse = (
  response: IPagedEmployeesResponse | IEmployeesResponse
): response is IPagedEmployeesResponse => "totalCount" in response;

export const employeesSlice = createSlice({
  name: "employees",
  initialState: INITIAL_STATE,
  reducers: {},
  selectors: {
    selectEmployees: (state: IEmployeesState) => state.employees,
    selectEmployeesMeta: (state: IEmployeesState) => state.meta,
    selectEmployeesLoading: (state: IEmployeesState) => state.loading
  },
  extraReducers: (builder: ActionReducerMapBuilder<IEmployeesState>) => {
    builder
      .addCase(getEmployees.pending, (state: IEmployeesState) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(
        getEmployees.fulfilled,
        (
          state: Draft<IEmployeesState>,
          action: ISuccessPayloadAction<
            IPagedEmployeesResponse | IEmployeesResponse
          >
        ) => {
          state.loading = false;
          state.employees = action.payload.employees;
          if (isIPagedEmployeesResponse(action.payload)) {
            state.meta = {
              hasNextPage: action.payload.hasNextPage,
              hasPreviousPage: action.payload.hasPreviousPage,
              page: action.payload.page,
              pageSize: action.payload.pageSize,
              totalCount: action.payload.totalCount,
              totalPages: action.payload.totalPages
            };
          } else {
            state.meta = null;
          }
        }
      )
      .addCase(
        getEmployees.rejected,
        (state: Draft<IEmployeesState>, action: IErrorPayloadAction) => {
          state.loading = false;
          state.error = action.error.message || "";
          state.meta = null;
        }
      );
  }
});

export const { selectEmployees, selectEmployeesMeta, selectEmployeesLoading } =
  employeesSlice.selectors;
