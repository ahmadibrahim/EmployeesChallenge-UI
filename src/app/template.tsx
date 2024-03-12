"use client";
import React from "react";

import { Template } from "@/components/organisms/Template";
import { GlobalStyle } from "@/styles/globalStyles";

export type TemplateProps = {
  children?: React.ReactNode;
};

export const AppTemplate: React.FC<TemplateProps> = ({ children }) => {
  return (
    <>
      <GlobalStyle />
      <Template>{children}</Template>
    </>
  );
};

export default AppTemplate;
