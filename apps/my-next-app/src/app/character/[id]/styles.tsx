import styled from "styled-components";
import Link from 'next/link';

export const StyledCharacterContainer = styled.div`
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
    gap: 1.5rem;
  }
`;

export const StyledCharacterDetail = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 1.5rem;
  background: linear-gradient(135deg, #f9f9f9, #e3e3e3);
  border: 1px solid #ddd;
  border-radius: 12px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.03);
  }

  .character-image {
    border-radius: 12px;
    object-fit: cover;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    text-align: center;

    .character-image {
      margin-bottom: 1rem;
    }
  }
`;

export const StyledCharacterSec = styled.div`
  margin-left: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;

  @media (max-width: 768px) {
    margin-left: 0;
    align-items: center;
  }
`;

export const StyledCharacterName = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: #333;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  .status {
    padding: 0.4rem 0.8rem;
    font-size: 0.9rem;
    border-radius: 6px;
    text-transform: capitalize;
    font-weight: 500;
  }

  .alive {
    background-color: #d4f4dd;
    color: #2d8a3c;
  }

  .dead {
    background-color: #f8d7da;
    color: #842029;
  }

  .unknown {
    background-color: #e2e3e5;
    color: #6c757d;
  }
`;

export const StyledInfoSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  .label {
    font-size: 1rem;
    font-weight: 500;
    color: #555;
    margin-bottom: 0.3rem;
  }

  .value {
    font-size: 1.2rem;
    font-weight: 600;
    color: #222;
  }
`;

export const EpisodeContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
`;

export const EpisodeSection = styled.div`
  padding: 0.6rem 1.2rem;
  background: #043159;
  color: #fff;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s ease-in-out, background 0.2s ease;
  cursor: pointer;
  min-width: 320px;

  &:hover {
    transform: translateY(-5px);
    background: #06529f;
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;


export const StyledLink = styled(Link)`
  display: inline-block;
  padding: 0.8rem 1.2rem;
  border: 1px solid #2a80cd;
  background: #e4ebf3;
  color: #2a80cd;
  font-size: 1rem;
  font-weight: bold;
  text-decoration: none;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: background 0.3s ease, transform 0.2s ease-in-out;

  &:hover {
    background: #06529f;
    transform: translateY(-3px);
    color: whitesmoke;
  }

  &:active {
    background: #03284c;
    transform: translateY(0);
    color: whitesmoke;
  }

  &:focus {
    outline: 2px solid #06529f;
    outline-offset: 3px;
    color: whitesmoke;
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 0.7rem 1rem;
  }
`;

