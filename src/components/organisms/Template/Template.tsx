"use client";
import React, { useEffect } from "react";

import { Footer } from "@/components/molecules/Footer";
import { Header } from "@/components/molecules/Header";
import {
  selectMessageState,
  setMessageStatus
} from "@/redux/features/app/app.slice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { IAppState } from "@/types/global/types";

import { Container, Main, SnackBar } from "./Template.styled";

export type TemplateProps = {
  children?: React.ReactNode;
};

export const Template: React.FC<TemplateProps> = ({ children }) => {
  const messageState: IAppState = useAppSelector(selectMessageState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (messageState.status) {
      setTimeout(
        () => dispatch(setMessageStatus({ status: null, message: null })),
        5000
      );
    }
  }, [messageState]);

  return (
    <Container>
      <Header />
      <Main>{children}</Main>
      <Footer />
      {messageState.status && (
        <SnackBar $status={messageState.status}>
          {messageState.message}
        </SnackBar>
      )}
    </Container>
  );
};

export default Template;
