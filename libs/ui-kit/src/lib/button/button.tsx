import styled, { css } from "styled-components";

// Define the types for variations and sizes
type Variation = keyof typeof variations;
type Size = keyof typeof sizes;

interface ButtonProps {
  variation?: Variation; // Ensure variation is one of the keys in the variations object
  size?: Size; // Ensure size is one of the keys in the sizes object
}

// Define sizes object
const sizes = {
  small: css`
    font-size: 1.2rem;
    padding: 0.4rem 0.8rem;
    text-transform: uppercase;
    font-weight: 600;
    text-align: center;
  `,
  medium: css`
    font-size: 1.4rem;
    padding: 1.2rem 1.6rem;
    font-weight: 500;
  `,
  large: css`
    font-size: 1.6rem;
    padding: 1.2rem 2.4rem;
    font-weight: 500;
  `,
};

// Define variations object
const variations = {
  primary: css`
    color: var(--color-brand-50);
    background-color: var(--color-brand-500);

    &:hover {
      background-color: var(--color-brand-600);
    }
  `,
  secondary: css`
    color: var(--color-grey-600);
    background: var(--color-grey-0);
    border: 1px solid var(--color-grey-200);

    &:hover {
      background-color: var(--color-grey-50);
    }
  `,
  secondaryOutline: css`
    color: var(--color-grey-600);
    background: var(--color-grey-0);
    border: 2px solid var(--color-indigo-100);

    &:hover {
      background-color: var(--color-grey-50);
    }
  `,
  danger: css`
    color: var(--color-red-100);
    background-color: var(--color-red-700);

    &:hover {
      background-color: var(--color-red-800);
    }
  `,
  warning: css`
    color: var(--color-grey-100);
    background-color: var(--color-amber-700);

    &:hover {
      background-color: var(--color-amber-800);
    }
  `,
  customBlue: css`
    color: var(--color-grey-0);
    background-color: var(--color-lighter-btn);
    &:hover {
      background-color: var(--color-lighter-hover-btn);
    }
  `,
  confirmBtn: css`
    color: var(--color-grey-0);
    background-color: rgb(59 130 246);
    &:hover {
      background-color: rgb(37 99 235);
    }
  `,
  disabled: css`
    color: var(--color-grey-0);
    background-color: rgb(209 213 219);
    cursor: not-allowed;
  `,
};

// Styled button component
const Button = styled.button<ButtonProps>`
  border: none;
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);

  ${({ variation }) => variation && variations[variation]}
  ${({ size }) => size && sizes[size]}

  &:hover {
    background: #06529f;
    transform: translateY(-2px);
  }

  &:active {
    background: #03284c;
    transform: translateY(0);
  }

  &[type='Reset'] {
    background: #999;
    color: whitesmoke;
    &:hover {
      background: #666;
    }
`;

// Default props for Button
Button.defaultProps = {
  variation: "primary",
  size: "medium",
};

export default Button;
