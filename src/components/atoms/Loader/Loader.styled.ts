import styled, { keyframes } from "styled-components";

const spin = keyframes`
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
`;

const spinInner = keyframes`
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(-720deg);
	}
`;

export const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 100;
`;

export const Container = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 20px;
`;

export const OuterLoader = styled.div`
  width: 128px;
  height: 128px;
  border: 3px solid #fff;
  border-bottom: 3px solid transparent;
  border-radius: 50%;
  position: relative;
  animation: ${spin} 1s linear infinite;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const InnerLoader = styled.div`
  width: 64px;
  height: 64px;
  border: 3px solid transparent;
  border-top: 3px solid #fff;
  border-radius: 50%;
  animation: ${spinInner} 1s linear infinite;
`;

export const LoaderText = styled.div`
  color: #fff;
  font-size: 24px;
`;
