import React, { InputHTMLAttributes } from "react";
import { Control, Controller, RegisterOptions } from "react-hook-form";

import {
  Container,
  LabelField,
  Input,
  Wrapper,
  ErrorMessage
} from "./TextInput.styled";

export type TextInputProps = Partial<InputHTMLAttributes<HTMLInputElement>> & {
  className?: string;
  name: string;
  label?: string;
  type?: string;
  control: Control<any, any>;
  rules?: RegisterOptions;
};

export const TextInput: React.FC<TextInputProps> = ({
  className,
  label,
  control,
  rules,
  ...inputProps
}) => {
  return (
    <Wrapper className={className}>
      <Controller
        name={inputProps.name}
        control={control}
        rules={rules}
        render={({
          field: { ref, ...fieldProps },
          fieldState: { error, isDirty }
        }) => (
          <>
            <Container hasError={!!error} isValid={isDirty && !error}>
              <Input
                {...inputProps}
                {...fieldProps}
                ref={ref}
                id={inputProps.name}
                $hasLabel={!!label}
                hasError={!!error}
                isValid={isDirty && !error}
              />
              {!!label && (
                <LabelField htmlFor={inputProps.name}>{label}</LabelField>
              )}
            </Container>
            {error && <ErrorMessage>{error.message}</ErrorMessage>}
          </>
        )}
      />
    </Wrapper>
  );
};

export default TextInput;
