import { styled } from "styled-components";

import { Button as BaseButton } from "@/components/atoms/Button";
import { Modal as BaseModal } from "@/components/atoms/Modal";
import { Content as ModalContent } from "@/components/atoms/Modal/Modal.styled";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const PhoneFieldsContainer = styled.div`
  display: flex;
  gap: 20px;
`;

export const CountryCodeContainer = styled.div`
  flex-basis: 40%;
`;

export const PhoneNumberContainer = styled.div`
  flex-basis: 60%;
`;

export const ActionsContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: flex-end;
`;
export const SubmitButton = styled(BaseButton)``;

export const DeleteButton = styled(BaseButton)`
  background-color: #ff4141;
  &:hover:not(:disabled) {
    box-shadow: 0 0 5px #ff4141;
  }
`;

export const Modal = styled(BaseModal)`
  ${ModalContent} {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`;
