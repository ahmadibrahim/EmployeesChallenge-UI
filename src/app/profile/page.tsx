"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

import { ButtonType, ButtonVariant } from "@/components/atoms/Button/Button";
import { Loader } from "@/components/atoms/Loader";
import { EmployeeForm } from "@/components/organisms/EmployeeForm";
import { EmployeeFormMode } from "@/components/organisms/EmployeeForm/EmployeeForm";
import {
  getEmployee,
  selectEmployee,
  selectEmployeeLoading,
  selectSelectedEmployeeId
} from "@/redux/features/employee/employee.slice";
import { useAppDispatch, useAppSelector } from "@/redux/store";

import { BackButton, PageContainer } from "./page.styled";

const ProfilePage: React.FC = () => {
  const router = useRouter();

  const dispatch = useAppDispatch();
  const isLoading: boolean = useAppSelector(selectEmployeeLoading);
  const selectedId: Nullable<string> = useAppSelector(selectSelectedEmployeeId);
  const employee = useAppSelector(selectEmployee);

  useEffect(() => {
    if (!selectedId) {
      backToList();
    }
    dispatch(getEmployee());
  }, []);

  const backToList = async () => {
    router.push("/");
  };

  return (
    <PageContainer>
      {isLoading && <Loader message="Please wait..." />}
      <BackButton
        type={ButtonType.button}
        variant={ButtonVariant.Text}
        onClick={backToList}
      >
        Back to list
      </BackButton>
      <EmployeeForm mode={EmployeeFormMode.UPDATE} initialValues={employee} />
    </PageContainer>
  );
};

export default ProfilePage;
