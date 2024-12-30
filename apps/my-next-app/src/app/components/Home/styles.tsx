import styled from 'styled-components';

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.5rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #f9f9f9;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);

  @media (min-width: 768px) {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
  }
`;
export const StyledInputWithError =styled.div`
  width: 30%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: flex-start;
  input, select {
    width: 100%;
    padding: 0.8rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  @media (max-width: 768px) {
    width: 100%;
  }
`
export const StyledInput = styled.input`
  width: 100%;
  padding: 0.8rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #043159;
    outline: none;
    box-shadow: 0 0 3px rgba(4, 49, 89, 0.5);
  }

  @media (min-width: 768px) {
    width: calc(33% - 1rem);
  }
`;
export const StyledSelect = styled.select`
  width: 100%;
  padding: 0.8rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #043159;
    outline: none;
    box-shadow: 0 0 3px rgba(4, 49, 89, 0.5);
  }

  @media (min-width: 768px) {
    width: calc(33% - 1rem);
  }
`;

export const StyledButtonContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-end;
  gap: 15px;
  @media (max-width: 768px) {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 15px;
  }
`
export const StyledButton = styled.input`
  padding: 0.6rem 1.2rem;
  font-size: 1rem;
  color: #fff;
  background: #043159;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.2s ease-in-out;

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
    &:hover {
      background: #666;
    }
  }
  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const StyledError = styled.p`
  font-size: 0.85rem;
  color: #d9534f;
  margin: 0;
  text-align: left;
`;
export const EmptyResult =styled.div`
  width: 100%;
  background: whitesmoke;
  border: 1px solid #ccc;
  text-align: center;
  font-size: 2rem;
  padding: 0.8rem 1.2rem;
`
