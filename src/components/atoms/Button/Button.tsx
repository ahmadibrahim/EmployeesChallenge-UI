import React, { ReactNode } from "react";

import { OutlineButton, ContainedButton, TextButton } from "./Button.styled";

export enum ButtonType {
  submit = "submit",
  button = "button",
  reset = "reset"
}

export enum ButtonVariant {
  CONTAINED = "contained",
  OUTLINE = "outline",
  Text = "text"
}

export type ButtonProps = {
  className?: string;
  type: ButtonType;
  variant: ButtonVariant;
  disabled?: boolean;
  children?: ReactNode;
  onClick?: () => void;
};

export const Button: React.FC<ButtonProps> = ({
  variant,
  children,
  ...buttonProps
}): JSX.Element => {
  return variant === ButtonVariant.CONTAINED ? (
    <ContainedButton {...buttonProps}>{children}</ContainedButton>
  ) : variant === ButtonVariant.OUTLINE ? (
    <OutlineButton {...buttonProps}>{children}</OutlineButton>
  ) : (
    <TextButton {...buttonProps}>{children}</TextButton>
  );
};

export default Button;
