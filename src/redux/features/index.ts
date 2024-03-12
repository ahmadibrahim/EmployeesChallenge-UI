import { combineSlices } from "@reduxjs/toolkit";

import { appSlice } from "./app/app.slice";
import { employeeSlice } from "./employee/employee.slice";
import { employeesSlice } from "./employees/employees.slice";

export default combineSlices(appSlice, employeesSlice, employeeSlice);
