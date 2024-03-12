import { store } from "@/redux/store";
import { Employee } from "@/types/employee";
import { ResponseWithMessage } from "@/types/global/types";
import { httpDelete, httpGet, httpPost, httpPut, Response } from "@/utils/http";

import { setMessageStatus } from "../app/app.slice";

export const EmployeeServices = {
  fetchEmplyeeInfos: async (employeeId: string): Promise<Employee> => {
    let results: Response | null;
    try {
      results = await httpGet(`employee/${employeeId}`);
      if (results?.success) {
        return Promise.resolve(results.data);
      }
      return Promise.reject(results?.data);
    } catch (error) {
      return Promise.reject(error);
    }
  },

  addNewEmployee: async (employee: Employee): Promise<Employee> => {
    let results: Response<ResponseWithMessage<Employee>> | null;
    try {
      results = await httpPost("employee", employee);
      if (results?.success) {
        store.dispatch(
          setMessageStatus({
            message: results.data.message,
            status: "success"
          })
        );
        return Promise.resolve(results.data.data);
      }
      return Promise.reject(results?.data);
    } catch (error) {
      return Promise.reject(error);
    }
  },

  updateEmployee: async (employee: Employee): Promise<Employee> => {
    let results: Response<ResponseWithMessage<Employee>> | null;
    try {
      results = await httpPut(`employee/${employee._id}`, employee);
      if (results?.success) {
        store.dispatch(
          setMessageStatus({
            message: results.data.message,
            status: "success"
          })
        );
        return Promise.resolve(results.data.data);
      }
      return Promise.reject(results?.data);
    } catch (error) {
      return Promise.reject(error);
    }
  },

  deleteEmployee: async (employee: Employee): Promise<Employee> => {
    let results: Response<ResponseWithMessage<Employee>> | null;
    try {
      results = await httpDelete(`employee/${employee._id}`);
      if (results?.success) {
        store.dispatch(
          setMessageStatus({
            message: results.data.message,
            status: "success"
          })
        );
        return Promise.resolve(results.data.data);
      }
      return Promise.reject(results?.data);
    } catch (error) {
      return Promise.reject(error);
    }
  }
};
