import { styled } from "styled-components";

export const FooterBar = styled.div`
  position: relative;
  width: 100%;
  min-height: 70px;
  border: 10px solid transparent;
  color: #fff;
  padding: 0 20px;
  display: flex;
  align-items: center;

  &::before {
    content: "";
    position: absolute;
    top: 0px;
    left: -10px;
    width: calc(100% + 10px);
    height: calc(100% + 10px);
    background-color: #087dd1;
    z-index: -1;
  }

  &::after {
    content: "";
    position: absolute;
    bottom: -10px;
    left: -10px;
    width: 40%;
    height: 100%;
    border: 10px solid transparent;
    border-top: 10px solid #087dd1;
    border-left: 10px solid #087dd1;
    transition: 0.3s linear all;
  }
`;
