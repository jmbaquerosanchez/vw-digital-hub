import styled from "styled-components";
import type { HTMLInputProps } from "@vw-digital-hub/utils";
import { useId, type FC, type Ref } from "react";

const Container = styled.div`
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: flex-start;
`;

const Label = styled.label`
  white-space: nowrap;
  font: var(--subhead-semibold);
  color: var(--light-50);
  text-overflow: ellipsis;
  display: flex;
  align-items: center;
  margin-bottom: 6px;

  & span {
    margin-left: 4px;
    color: var(--primary-100);
  }
`;

const InputField = styled.input`
  cursor: text;
  font: var(--body-semibold);
  display: inline-flex;
  align-items: center;
  width: 100%;
  height: 18px;
  border-bottom: 1px solid var(--light-30);
  outline: none;
  display: block;
  padding: 6px 0 8px;
`;

interface Props extends HTMLInputProps {
  label?: string;
  required?: boolean;
  ref?: Ref<HTMLInputElement>;
  autoComplete?: string;
}

export const TextField: FC<Props> = ({
  ref,
  label,
  required,
  autoComplete = "off",
  className,
  ...props
}) => {
  const id = `text-area-field-${useId()}`;
  return (
    <Container className={className}>
      <Label htmlFor={id}>
        {label && label}
        {required && <span>*</span>}
      </Label>

      <InputField id={id} autoComplete={autoComplete} ref={ref} {...props} />
    </Container>
  );
};
