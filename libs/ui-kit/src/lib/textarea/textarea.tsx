import React from 'react';
import styled from 'styled-components';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  haserror?: boolean;
  error?: string;
}

const TextareaWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.4rem;
  width: 100%;
  max-width: 350px;

  @media (min-width: 1400px) {
    max-width: 400px;
  }

  @media (max-width: 900px) {
    max-width: 300px;
  }

  @media (max-width: 680px) {
    max-width: 100%;
  }
`;

const StyledTextarea = styled.textarea<{ haserror?: boolean }>`
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-100);
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);
  padding: 0.8rem 1.2rem;
  width: 100%;

  ::placeholder {
    color: #6b7280;
  }

  ${(props) =>
  props.haserror &&
  `
      border-color: #f87171;
      background-color: #fee2e2;
    `}

  ${(props) =>
  !props.haserror &&
  `
      border-color: #d1d5db;
    `}

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
  }

  transition: all 0.2s ease-in-out;
`;

const ErrorMessage = styled.span`
  color: #f87171;
  font-size: 0.875rem;
  font-weight: 500;
`;

// ForwardRef Component
const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ haserror, error, ...props }, ref) => (
    <TextareaWrapper>
      <StyledTextarea ref={ref} haserror={haserror} {...props} />
      {haserror && error && <ErrorMessage>{error}</ErrorMessage>}
    </TextareaWrapper>
  )
);

Textarea.displayName = 'Textarea';

export default Textarea;
