import styled from "styled-components";
import React from "react";

interface CheckboxProps {
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  id: string;
  children?: React.ReactNode;
}

const StyledCheckboxWrapper = styled.div<{ disabled?: boolean }>`
  display: flex;
  align-items: center;
  gap: 1.6rem;

  label {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 0.8rem;
    color: ${({ disabled }) => (disabled ? "var(--color-grey-500)" : "inherit")};
    cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  }
`;

const StyledInput = styled.input`
  height: 2.4rem;
  width: 2.4rem;
  outline-offset: 2px;
  transform-origin: 0;
  accent-color: var(--color-brand-600);
  cursor: pointer;

  &:disabled {
    accent-color: var(--color-grey-400);
    cursor: not-allowed;
  }
`;

const Checkbox: React.FC<CheckboxProps> = ({
                                             onChange,
                                             checked,
                                             disabled = false,
                                             id,
                                             children,
                                           }) => {
  return (
    <StyledCheckboxWrapper disabled={disabled}>
      <StyledInput
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
      <label htmlFor={id}>{children}</label>
    </StyledCheckboxWrapper>
  );
};

export default Checkbox;
