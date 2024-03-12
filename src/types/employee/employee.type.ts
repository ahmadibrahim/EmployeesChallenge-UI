export type Employee = {
  _id: string;
  Gender: string;
  FirstName: string;
  LastName: string;
  DateOfBirth: string;
  Email: string;
  Country: string;
  CountryCode: string;
  PhoneNumber: string;
  Address?: Nullable<string>;
  Department: string;
};

export interface IEmployeeState {
  employee: Nullable<Employee>;
  selectedEmployeeId: Nullable<string>;
  loading: boolean;
  error: string;
}

export enum EmployeeFormFields {
  gender = "Gender",
  firstname = "FirstName",
  lastname = "LastName",
  dateOfBirth = "DateOfBirth",
  email = "Email",
  country = "Country",
  countryCode = "CountryCode",
  phoneNumber = "PhoneNumber",
  address = "Address",
  department = "Department"
}
