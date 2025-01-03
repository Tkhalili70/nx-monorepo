"use client"
import React, { ReactNode } from 'react';
import "./styles.scss"
import LoaderPage from '../../../ui-components/src/lib/LoaderFullPage';
import { useLoader } from '../../../../apps/my-next-app/src/app/contexts/LoaderContext';
import styled from 'styled-components';
interface SharedLayoutProps {
  children: ReactNode;
}
const StyledContainer = styled.div`
display: flex;
  flex-direction: column;
  min-height: 100vh;
`
const StyledHeader = styled.header`
  background: #6200ea;
  color: #fff;
  padding: 1rem;
`
const StyledFooter = styled.footer`
  background: #6200ea;
  color: #fff;
  padding: 1rem;
`
const StyledMain = styled.main`
  padding: 1rem;
`
export const SharedLayout: React.FC<SharedLayoutProps> = ({ children }) => {
  const { isLoading } = useLoader();

  return (
  <StyledContainer >
      <StyledHeader >
        <h1>Shared Header</h1>
      </StyledHeader>
      <StyledMain >
        {isLoading && <LoaderPage />}
        {children}
      </StyledMain>
      <StyledFooter >
        Shared Footer
      </StyledFooter>
    </StyledContainer>
  );
};

export default SharedLayout;
