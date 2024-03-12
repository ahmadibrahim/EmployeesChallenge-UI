import styled from "styled-components";

import { Button as BaseButton } from "@/components/atoms/Button";

export const PageContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 16px;

  & .MuiDataGrid-row {
    cursor: pointer;
  }
`;

export const Button = styled(BaseButton)`
  width: fit-content;
  align-self: flex-end;
  &::before {
    content: "";
    display: block;
    background: url(/icons/user-add.svg);
    width: 25px;
    height: 25px;
    background-size: cover;
  }
`;
