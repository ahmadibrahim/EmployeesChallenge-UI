import styled from "styled-components";

const BaseButton = styled.button`
  border: none;
  border-radius: 10px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 10px;
  width: auto;
  font-size: 1rem;
  transition: box-shadow 200ms ease-in-out;

  &:hover {
    cursor: pointer;
  }
  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

export const OutlineButton = styled(BaseButton)`
  background-color: transparent;
  color: #087dd1;
  border: 2px solid #087dd1;

  &:hover:not(:disabled) {
    box-shadow: 0 0 5px #087dd1;
  }
`;

export const ContainedButton = styled(BaseButton)`
  background-color: #087dd1;
  color: #ffffff;

  &:hover:not(:disabled) {
    box-shadow: 0 0 5px #087dd1;
  }
`;

export const TextButton = styled(BaseButton)`
  background-color: transparent;
  color: #087dd1;
  border-radius: 0;
`;
