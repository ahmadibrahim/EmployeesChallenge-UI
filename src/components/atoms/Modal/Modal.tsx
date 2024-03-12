import React, { ReactNode, useEffect } from "react";

import {
  CloseButton,
  Container,
  Content,
  Header,
  ModalWrapper,
  Title
} from "./Modal.styled";

export type Props = {
  className?: string;
  title?: string;
  children?: ReactNode;
  onClose: () => void;
};

export const Modal: React.FC<Props> = ({
  className,
  title,
  children,
  onClose
}) => {
  const modalRef = React.useRef<HTMLDivElement>(null);
  const maskRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!document.body.classList.contains("no-scroll")) {
      document.body.classList.add("no-scroll");
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.body.classList.remove("no-scroll");
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event: MouseEvent) => {
    if (!maskRef.current || !modalRef.current) return;
    const clickOutsideModalContent: boolean = !!(
      modalRef.current &&
      !modalRef.current.contains(event.target as Node) &&
      !!maskRef.current.contains(event.target as Node)
    );
    if (clickOutsideModalContent) {
      onClose();
    }
  };

  return (
    <ModalWrapper className={className} ref={maskRef}>
      <Container ref={modalRef}>
        <Header>
          <Title>{title}</Title>
          <CloseButton onClick={onClose} />
        </Header>
        <Content>{children}</Content>
      </Container>
    </ModalWrapper>
  );
};

export default Modal;
