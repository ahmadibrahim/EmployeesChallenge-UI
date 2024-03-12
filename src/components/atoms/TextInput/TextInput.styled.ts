import styled from "styled-components";

import {
  inputContainerStyle,
  inputStyle,
  InputStyleProps,
  labelStyle
} from "@/styles/globalStyles";

export const Wrapper = styled.div``;

export const Container = styled.div<InputStyleProps>`
  position: relative;
  ${inputContainerStyle}
`;

export const LabelField = styled.label<InputStyleProps>`
  ${labelStyle}
`;

export const Input = styled.input<InputStyleProps>`
  ${inputStyle}
  &:focus + ${LabelField},
  &:not(:empty) + ${LabelField},
  &:not([value=""]) + ${LabelField},
  &:-webkit-autofill + ${LabelField} {
    top: 5px;
    height: 15px;
    line-height: 15px;
    font-size: 0.75rem;
  }
  &[type="date"] + ${LabelField} {
    top: 5px;
    height: 15px;
    line-height: 15px;
    font-size: 0.75rem;
  }
  &:disabled + ${LabelField} {
    cursor: default;
  }
`;

export const ErrorMessage = styled.div`
  text-align: right;
  margin-top: 3px;
  color: #ff4141;
  font-size: 0.75rem;
`;
