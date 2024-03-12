import React, { useState } from "react";
import { Control, Controller, RegisterOptions } from "react-hook-form";
import ReactSelect, { OnChangeValue } from "react-select";

import { Container, LabelField, ErrorMessage, Wrapper } from "./Select.styled";

export type SelectOption = {
  label: string;
  value: any;
  [key: string]: string;
};

export type SelectProps = {
  options: SelectOption[];
  label?: string;
  name: string;
  defaultValue?: string;
  control: Control<any, any>;
  rules?: RegisterOptions;
};

export const Select: React.FC<SelectProps> = ({
  options,
  label,
  name,
  control,
  rules,
  defaultValue
}) => {
  const [animatedLabel, setAnimatedLabel] = useState<boolean>(false);

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({
        field: { ref, onChange, ...fieldProps },
        fieldState: { error, isDirty }
      }) => (
        <Wrapper>
          <Container
            hasError={!!error}
            isValid={isDirty && !error}
            $hasLabel={!!label}
          >
            {label && (
              <LabelField
                htmlFor={name}
                $isAnimated={!!fieldProps.value || animatedLabel}
              >
                {label}
              </LabelField>
            )}
            <ReactSelect
              className="react-select-container"
              classNamePrefix="react-select"
              placeholder=""
              options={options}
              {...fieldProps}
              ref={ref}
              value={options.find(option => option.value === fieldProps.value)}
              defaultValue={options.find(
                option => option.value === defaultValue
              )}
              onChange={(newValue: OnChangeValue<SelectOption, false>) => {
                setAnimatedLabel(!!newValue);
                onChange(newValue?.value);
              }}
              onMenuOpen={() => setAnimatedLabel(true)}
              onMenuClose={() => setAnimatedLabel(!!fieldProps.value)}
            />
          </Container>
          {error && <ErrorMessage>{error.message}</ErrorMessage>}
        </Wrapper>
      )}
    />
  );
};

export default Select;
