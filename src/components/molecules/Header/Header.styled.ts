import { styled } from "styled-components";

export const HeaderBar = styled.div`
  position: relative;
  width: 100%;
  height: 70px;
  border: 10px solid transparent;
  border-top: 10px solid #087dd1;
  border-left: 10px solid #087dd1;
  box-shadow: 4px 4px 5px rgba(0, 0, 0, 0.25) inset;
  padding: 0 20px;
  display: flex;
  align-items: center;

  &::after {
    content: "";
    position: absolute;
    top: -10px;
    right: -10px;
    width: 40%;
    height: 49px;
    border: 10px solid transparent;
    border-bottom: 10px solid #087dd1;
    border-right: 10px solid #087dd1;
    transition: 0.3s linear all;
  }
`;
