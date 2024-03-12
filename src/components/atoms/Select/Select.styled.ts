import styled, { css } from "styled-components";

import {
  inputContainerStyle,
  inputStyle,
  InputStyleProps,
  labelStyle
} from "@/styles/globalStyles";

export const Wrapper = styled.div``;

export const Container = styled.div<InputStyleProps>`
  ${inputContainerStyle}

  &::before {
    right: 30px;
  }

  .react-select-container {
    width: 100%;
    .react-select__control,
    .react-select__control--is-focused {
      ${inputStyle}
      padding: 0px 9px;
      &:hover {
        border-color: #cccccc;
      }

      .react-select__indicator {
        color: #333333;
        padding: 0;
      }

      .react-select__single-value {
        color: #333333;
        font-size: 1rem;
      }

      ${({ $hasLabel: hasLabel }) =>
        hasLabel &&
        css`
          padding-top: 15px;
          .react-select__indicators {
            margin-top: -15px;
          }
        `}

      ${({ isValid }) =>
        isValid &&
        css`
          border-color: green;
          &:hover {
            border-color: green;
          }
        `}
        
      ${({ hasError }) =>
        hasError &&
        css`
          border-color: #ff4141;
          &:hover {
            border-color: #ff4141;
          }
        `}
    }

    .react-select__menu {
      border-radius: 7px;
      color: #333333;
      margin: 0;
    }

    .react-select__indicator-separator {
      display: none;
    }
  }
`;
type LabelFieldProps = {
  $isAnimated?: boolean;
};
export const LabelField = styled.label<LabelFieldProps>`
  ${labelStyle}
  ${({ $isAnimated: isAnimated }) =>
    isAnimated &&
    css`
      top: 5px;
      height: 15px;
      line-height: 15px;
      font-size: 0.75rem;
    `}
`;

export const ErrorMessage = styled.div`
  text-align: right;
  margin-top: 3px;
  color: #ff4141;
  font-size: 0.75rem;
`;
