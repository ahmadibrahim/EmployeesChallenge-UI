import React from "react";

import {
  Container,
  InnerLoader,
  LoaderText,
  OuterLoader,
  Wrapper
} from "./Loader.styled";

export type LoaderProps = {
  message?: string;
};

export const Loader: React.FC<LoaderProps> = ({ message }) => (
  <Wrapper>
    <Container>
      <OuterLoader>
        <InnerLoader />
      </OuterLoader>
      {message && <LoaderText>{message}</LoaderText>}
    </Container>
  </Wrapper>
);

export default Loader;
