"use client";
import {
  DataGrid,
  GridToolbar,
  GridColDef,
  GridFilterModel,
  GridSortModel
} from "@mui/x-data-grid";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo } from "react";

import { ButtonType, ButtonVariant } from "@/components/atoms/Button/Button";
import { Loader } from "@/components/atoms/Loader";
import Modal from "@/components/atoms/Modal/Modal";
import { EmployeeForm } from "@/components/organisms/EmployeeForm";
import { EmployeeFormMode } from "@/components/organisms/EmployeeForm/EmployeeForm";
import { setSelectedEmployeeId } from "@/redux/features/employee/employee.slice";
import {
  getEmployees,
  selectEmployees,
  selectEmployeesLoading,
  selectEmployeesMeta
} from "@/redux/features/employees/employees.slice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { Employee, EmployeeFormFields } from "@/types/employee";
import { Employees } from "@/types/employees";
import {
  IFilter,
  IPagination,
  IPaginationResponse,
  ISort
} from "@/types/global/types";
import { getCountryByCode } from "@/utils/countries";

import { PageContainer, Button } from "./page.styled";

const EmployeesPage: React.FC = () => {
  const dispatch = useAppDispatch();

  const router = useRouter();

  const [paginationModel, setPaginationModel] = React.useState<IPagination>({
    pageSize: 10,
    page: 0
  });
  const [filterModel, setFilterModel] = React.useState<Nullable<IFilter>>(null);
  const [sortingModel, setSortingModel] = React.useState<Nullable<ISort>>(null);
  const [addEmployeeModalOpened, setAddEmployeeModalOpened] =
    React.useState<boolean>(false);

  const employees: Employees = useAppSelector(selectEmployees);
  const isLoading: boolean = useAppSelector(selectEmployeesLoading);
  const pagesMeta: Nullable<IPaginationResponse> =
    useAppSelector(selectEmployeesMeta);

  const columns: GridColDef[] = useMemo(
    (): GridColDef[] => [
      {
        field: EmployeeFormFields.firstname,
        headerName: "First Name",
        flex: 1
      },
      {
        field: EmployeeFormFields.lastname,
        headerName: "Last Name",
        flex: 1
      },
      {
        field: EmployeeFormFields.gender,
        headerName: "Gender",
        flex: 1,
        valueGetter: params => (params.value === "M" ? "Male" : "Female")
      },
      {
        field: EmployeeFormFields.dateOfBirth,
        headerName: "Date of Birth",
        flex: 1
      },
      {
        field: EmployeeFormFields.email,
        headerName: "Email",
        flex: 1
      },
      {
        field: EmployeeFormFields.country,
        headerName: "Country",
        flex: 1,
        valueGetter: params => getCountryByCode(params.value)?.label
      },
      {
        field: EmployeeFormFields.phoneNumber,
        headerName: "Phone Number",
        flex: 1,
        valueGetter: params =>
          `${getCountryByCode(params.row.CountryCode)?.phoneCode}${params.value}`
      },
      {
        field: EmployeeFormFields.address,
        headerName: "Address",
        flex: 1
      },
      {
        field: EmployeeFormFields.department,
        headerName: "Department",
        flex: 1
      }
    ],
    []
  );

  useEffect(() => {
    dispatch(
      getEmployees({
        pagination: paginationModel,
        filers: filterModel,
        sorting: sortingModel
      })
    );
  }, [paginationModel, filterModel, sortingModel]);

  const onFilterChange = (model: GridFilterModel) => {
    const { items } = model;
    if (items.length === 0) {
      setFilterModel(null);
    } else {
      const item = items[0];
      if (
        item.operator !== "isEmpty" &&
        item.operator !== "isNotEmpty" &&
        !item.value
      ) {
        setFilterModel(null);
      } else {
        setPaginationModel({ ...paginationModel, page: 0 });
        setFilterModel({
          field: item.field,
          value: item.value,
          operator: item.operator
        });
      }
    }
  };

  const onSortChange = (model: GridSortModel) => {
    if (model.length === 0 || !model[0].field || !model[0].sort) {
      setSortingModel(null);
    } else {
      setSortingModel({
        field: model[0].field,
        direction: model[0].sort
      });
    }
  };

  const onAddNewEmployee = () => {
    dispatch(
      getEmployees({
        pagination: paginationModel,
        filers: filterModel,
        sorting: sortingModel
      })
    );
    setAddEmployeeModalOpened(false);
  };

  const navigateToEmployeeDetails = (rowData: any) => {
    dispatch(setSelectedEmployeeId(rowData.row._id));
    router.push("/profile");
  };

  return (
    <PageContainer>
      {isLoading && <Loader message="Please wait while fecting employees..." />}
      <Button
        type={ButtonType.button}
        variant={ButtonVariant.OUTLINE}
        onClick={() => {
          setAddEmployeeModalOpened(true);
        }}
      >
        Add New Employee
      </Button>
      <DataGrid
        columns={columns}
        rows={(employees || []).map((employee: Employee, index: number) => ({
          id: index,
          ...employee
        }))}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: false
          }
        }}
        autoHeight
        rowCount={pagesMeta?.totalCount}
        pageSizeOptions={[5, 10, 15, 20, 25]}
        paginationMode="server"
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        filterMode="server"
        onFilterModelChange={onFilterChange}
        filterDebounceMs={1000}
        sortingMode="server"
        onSortModelChange={onSortChange}
        onRowClick={navigateToEmployeeDetails}
      />
      {addEmployeeModalOpened && (
        <Modal
          onClose={() => setAddEmployeeModalOpened(false)}
          title="Add Employee"
        >
          <EmployeeForm
            mode={EmployeeFormMode.ADD}
            onSubmit={onAddNewEmployee}
          />
        </Modal>
      )}
    </PageContainer>
  );
};

export default EmployeesPage;
