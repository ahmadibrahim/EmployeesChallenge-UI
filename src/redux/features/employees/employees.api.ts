import {
  IEmployeesFilters,
  IEmployeesResponse,
  IPagedEmployeesResponse
} from "@/types/employees";
import { httpGet, Response } from "@/utils/http";

export const EmployeesServices = {
  getAllEmployees: async (): Promise<IEmployeesResponse> => {
    let results: Response | null;
    try {
      results = await httpGet("employee");
      if (results?.success) {
        return Promise.resolve(results.data);
      }
      return Promise.reject(results?.data);
    } catch (error) {
      return Promise.reject(error);
    }
  },

  getEmployees: async (
    params: IEmployeesFilters
  ): Promise<IPagedEmployeesResponse> => {
    let results: Response | null;
    let url = "employee";
    const { pagination, filers, sorting } = params;
    if (pagination) {
      url += `?page=${pagination.page}&pageSize=${pagination.pageSize}`;
    }
    if (filers) {
      url = url.includes("?") ? `${url}&` : `${url}?`;
      url += `filterBy=${filers.field}&filterOperator=${filers.operator}&filterValue=${filers.value}`;
    }
    if (sorting) {
      url = url.includes("?") ? `${url}&` : `${url}?`;
      url += `sortBy=${sorting.field}&sortDirection=${sorting.direction}`;
    }
    try {
      results = await httpGet(url);
      if (results?.success) {
        return Promise.resolve(results.data);
      }
      return Promise.reject(results?.data);
    } catch (error) {
      return Promise.reject(error);
    }
  }
};
