import styled from "styled-components";

import { Button as BaseButton } from "@/components/atoms/Button";

export const PageContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 16px;
`;

export const BackButton = styled(BaseButton)`
  width: fit-content;
  align-self: flex-start;
  &::before {
    content: "<";
    display: block;
    font-weight: bold;
  }
`;
