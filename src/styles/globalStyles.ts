import { Inter } from "next/font/google";
import { createGlobalStyle, css } from "styled-components";

const inter = Inter({ subsets: ["latin"] });

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html {
    margin: 0;
    padding: 0;
    -webkit-text-size-adjust: none;
    scroll-behavior: smooth;
  }

  body {
    margin: 0;
    padding: 0;
    -webkit-font-smoothing: antialiased;
    font-weight: 400;
    ${{ ...inter.style }}
  }

  .no-scroll {
    overflow: hidden;
  }
  `;

export type InputValidationProps = {
  hasError?: boolean;
  isValid?: boolean;
};

export const inputContainerStyle = css<InputValidationProps>`
  position: relative;
  display: flex;
  align-items: center;
  ${({ hasError, isValid }) =>
    (!!hasError || !!isValid) &&
    css`
      &::before {
        content: "";
        display: block;
        background: ${isValid
          ? "url(/icons/check-icon.svg);"
          : "url(/icons/error-icon.svg);"};
        position: absolute;
        top: 50%;
        right: 10px;
        transform: translateY(-50%);
        width: 25px;
        height: 25px;
        background-size: cover;
      }
    `}
`;

export type InputStyleProps = InputValidationProps & {
  $hasLabel?: boolean;
};
export const inputStyle = css<InputStyleProps>`
  position: relative;
  width: 100%;
  height: 50px;
  font-size: 1rem;
  font-weight: 400;
  border: ${({ hasError, isValid }) =>
    hasError
      ? "1px solid #FF4141"
      : isValid
        ? "1px solid #01A601"
        : "1px solid #CCCCCC"};
  background-color: transparent;
  padding: ${({ $hasLabel: hasLabel }) =>
    hasLabel ? "20px 20px 10px 20px" : "15px 20px"};
  color: #333333;
  border-radius: 7px;
  box-shadow: none;
  outline: none;
`;

export const labelStyle = css`
  display: block;
  position: absolute;
  color: #777777;
  font-size: 1rem;
  font-weight: 400;
  top: 0px;
  left: 20px;
  height: 50px;
  line-height: 50px;
  cursor: text;
  margin: 0px;
  transition: all 200ms ease-out;
`;
