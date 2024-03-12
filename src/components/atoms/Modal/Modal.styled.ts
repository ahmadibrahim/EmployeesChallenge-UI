import styled, { keyframes } from "styled-components";

const openAnimation = keyframes`
	0% {
		transform: scale(0.5) rotateX(-30deg);
	}
	100% {
		transform: scale(1) rotateX(0deg);
	}
`;

export const ModalWrapper = styled.div`
  position: fixed;
  background: rgba(0, 0, 0, 0.85);
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

export const Container = styled.div`
  min-width: 600px;
  max-width: 900px;
  min-height: 200px;
  max-height: 90vh;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: left;
  overflow: auto;
  border-radius: 10px;
  animation: ${openAnimation} 150ms ease-in;
`;

export const Header = styled.div`
  border-bottom: 1px solid #c8c8c8;
  background: transparent;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  width: 100%;
  padding: 10px 30px;
`;

export const Title = styled.div`
  color: #333333;
  font-size: 1.5rem;
  font-weight: 600;
`;

export const CloseButton = styled.button`
  background: url(/icons/close-icon.svg);
  width: 36px;
  height: 36px;
  border-radius: 10px;
  padding: 0px;
  background-color: #ffffff;
  border: none;
  cursor: pointer;
  background-size: cover;

  &:hover {
    filter: brightness(95%);
  }
`;

export const Content = styled.div`
  padding: 20px;
  flex: 1;
  overflow: auto;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    border-radius: 10px;
    box-shadow: none;
    -webkit-box-shadow: none;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    box-shadow: inset 0 0 10px rgba(117, 117, 117, 1);
    -webkit-box-shadow: inset 0 0 10px rgba(117, 117, 117, 1);
  }
`;
