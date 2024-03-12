import { Employee } from "../employee/employee.type";
import {
  IFilter,
  IPagination,
  IPaginationResponse,
  ISort
} from "../global/types";

export type Employees = Employee[];

export interface IEmployeesState {
  employees: Employees;
  loading: boolean;
  error: string;
  meta: Nullable<IPaginationResponse>;
}

export interface IEmployeesResponse {
  employees: Employees;
}

export interface IEmployeesFilters {
  pagination: Nullable<IPagination>;
  filers: Nullable<IFilter>;
  sorting: Nullable<ISort>;
}

export interface IPagedEmployeesResponse
  extends IPaginationResponse,
    IEmployeesResponse {}
