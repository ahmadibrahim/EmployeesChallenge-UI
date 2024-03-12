import { CountryCode, isValidPhoneNumber } from "libphonenumber-js";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

import { ButtonType, ButtonVariant } from "@/components/atoms/Button/Button";
import { Select } from "@/components/atoms/Select";
import { SelectOption } from "@/components/atoms/Select/Select";
import { TextInput } from "@/components/atoms/TextInput";
import { EmployeeServices } from "@/redux/features/employee/employee.api";
import { Employee, EmployeeFormFields } from "@/types/employee";
import { supportedCountries } from "@/utils/countries";

import {
  ActionsContainer,
  CountryCodeContainer,
  DeleteButton,
  Modal,
  PhoneFieldsContainer,
  PhoneNumberContainer,
  SubmitButton,
  Wrapper
} from "./EmployeeForm.styled";

const defaultFormValues = {
  [EmployeeFormFields.gender]: "",
  [EmployeeFormFields.firstname]: "",
  [EmployeeFormFields.lastname]: "",
  [EmployeeFormFields.dateOfBirth]: "",
  [EmployeeFormFields.email]: "",
  [EmployeeFormFields.country]: "",
  [EmployeeFormFields.countryCode]: "",
  [EmployeeFormFields.phoneNumber]: "",
  [EmployeeFormFields.address]: "",
  [EmployeeFormFields.department]: ""
};

const genderOptions: SelectOption[] = [
  {
    label: "Male",
    value: "M"
  },
  {
    label: "Female",
    value: "F"
  }
];

export enum EmployeeFormMode {
  ADD = "add",
  UPDATE = "update"
}

export type Props = {
  mode: EmployeeFormMode;
  initialValues?: Nullable<Employee>;
  onSubmit?: () => void;
};

export const EmployeeForm: React.FC<Props> = ({
  mode,
  initialValues,
  onSubmit
}) => {
  const router = useRouter();

  const [confirmationModalOpened, setConfirmationModalOpened] =
    React.useState<boolean>(false);

  const { handleSubmit, control, getValues, reset } = useForm<Employee>({
    mode: "all",
    defaultValues: defaultFormValues
  });

  const onFormSubmit = async (employee: Employee) => {
    if (mode === EmployeeFormMode.ADD) {
      await EmployeeServices.addNewEmployee(employee);
    } else {
      await EmployeeServices.updateEmployee(employee);
    }
    if (onSubmit) {
      onSubmit();
    }
  };

  const deleteEmployee = async () => {
    await EmployeeServices.deleteEmployee(getValues());
    router.push("/");
  };

  useEffect(() => {
    if (initialValues) {
      reset(initialValues);
    }
  }, [initialValues]);

  return (
    <>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <Wrapper>
          <Select
            options={genderOptions}
            label="Gender"
            name={EmployeeFormFields.gender}
            control={control}
            rules={{ required: "Gender is required" }}
          />
          <TextInput
            name={EmployeeFormFields.firstname}
            label="First Name"
            control={control}
            rules={{
              required: "First Name is required",
              minLength: {
                value: 2,
                message: "First Name should be at least 2 characters long"
              }
            }}
          />
          <TextInput
            name={EmployeeFormFields.lastname}
            label="Last Name"
            control={control}
            rules={{
              required: "Last Name is required",
              minLength: {
                value: 2,
                message: "Last Name should be at least 2 characters long"
              }
            }}
          />
          <TextInput
            name={EmployeeFormFields.email}
            label="Email"
            control={control}
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9+._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                message: "Invalid email format"
              }
            }}
          />
          <TextInput
            type="date"
            name={EmployeeFormFields.dateOfBirth}
            label="Date Of Birth"
            control={control}
            rules={{ required: "Date Of Birth is required" }}
          />
          <Select
            options={supportedCountries}
            label="Conuntry"
            name={EmployeeFormFields.country}
            control={control}
            rules={{ required: "Country is required" }}
          />
          <PhoneFieldsContainer>
            <CountryCodeContainer>
              <Select
                options={supportedCountries}
                label="Conuntry Code"
                name={EmployeeFormFields.countryCode}
                control={control}
                rules={{ required: "Conuntry Code is required" }}
              />
            </CountryCodeContainer>
            <PhoneNumberContainer>
              <TextInput
                type="text"
                name={EmployeeFormFields.phoneNumber}
                label="Phone number"
                control={control}
                rules={{
                  required: "Phone Number is required",
                  validate: (value: string) => {
                    const selectedPhoneCode: string = getValues().CountryCode;
                    if (selectedPhoneCode) {
                      return isValidPhoneNumber(
                        value,
                        selectedPhoneCode as CountryCode
                      )
                        ? true
                        : "Invalid phone number";
                    }
                    return isNaN(Number(value)) ? "Invalid phone number" : true;
                  }
                }}
              />
            </PhoneNumberContainer>
          </PhoneFieldsContainer>
          <TextInput
            type="text"
            name={EmployeeFormFields.address}
            label="Address"
            control={control}
          />
          <TextInput
            type="text"
            name={EmployeeFormFields.department}
            label="Department"
            control={control}
            rules={{ required: "Department is required" }}
          />
          <ActionsContainer>
            <SubmitButton
              type={ButtonType.submit}
              variant={ButtonVariant.CONTAINED}
            >
              {mode === EmployeeFormMode.ADD
                ? "Add Employye"
                : "Update Employee"}
            </SubmitButton>
            {mode === EmployeeFormMode.UPDATE && (
              <DeleteButton
                type={ButtonType.button}
                variant={ButtonVariant.CONTAINED}
                onClick={() => setConfirmationModalOpened(true)}
              >
                Delete Emplyee
              </DeleteButton>
            )}
          </ActionsContainer>
        </Wrapper>
      </form>
      {confirmationModalOpened && (
        <Modal
          onClose={() => setConfirmationModalOpened(false)}
          title="Delete Employee"
        >
          Are you sure you want to delete this employee?
          <ActionsContainer>
            <DeleteButton
              type={ButtonType.button}
              variant={ButtonVariant.CONTAINED}
              onClick={deleteEmployee}
            >
              Delete
            </DeleteButton>
          </ActionsContainer>
        </Modal>
      )}
    </>
  );
};

export default EmployeeForm;
