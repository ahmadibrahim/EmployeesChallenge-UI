import styled, { keyframes } from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100vw;
  max-width: 1440px;
  margin: 0 auto;
  flex-direction: column;
  gap: 20px;
`;

export const Main = styled.div`
  flex: 1;
  width: 100%;
`;

const snackAnimation = keyframes`
	0% {
		bottom: -150px;
    opacity: 0.5;
	}
  30% {
    bottom: 20px;
    opacity: 1;
  }  
  90% {
    bottom: 20px;
    opacity: 1;
  }
	100% {
	  opacity: 0;
    bottom: 20px;
  }
`;

type SnackBarProps = {
  $status: "success" | "error";
};
export const SnackBar = styled.div<SnackBarProps>`
  position: fixed;
  right: 20px;
  animation: ${snackAnimation} 5s ease-in;
  background-color: ${({ $status: status }) =>
    status === "success" ? "#01A601" : "red"};
  padding: 15px 20px;
  border-radius: 7px;
  color: white;
`;
