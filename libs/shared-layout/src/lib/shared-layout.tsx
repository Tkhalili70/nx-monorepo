"use client"
import React, { ReactNode } from 'react';
import "./styles.scss"
import LoaderPage from '../../../ui-kit/src/lib/spinner/loader-full-page';
import { useLoader } from '../../../../apps/my-next-app/src/app/contexts/loader-context';
import styled from 'styled-components';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import GlobalStyles from '../../../../global-styles';
import { Toaster } from 'react-hot-toast';
const queryClient = new QueryClient({
  defaultOptions: {
    queries:{
      staleTime:60 * 1000,
    }
  }
});
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
    <>
      <GlobalStyles />
      <StyledContainer >
        <StyledHeader >
          <h1>Shared Header</h1>
        </StyledHeader>
        <StyledMain >
          <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={false}/>
            {isLoading && <LoaderPage />}
            {children}
          </QueryClientProvider>
          <Toaster
            position='top-center'
            gutter={12}
            containerStyle={{margin:"8px"}}
            toastOptions={{
              success:{duration:3000},
              error:{duration:5000},
              style:{
                fontSize:"16px",
                maxWidth:"500px",
                padding:"16px 24px",
                backgroundColor:'var(--color-grey-0)',
                color:'var(--color-grey-700)',
              },
            }}
          />
        </StyledMain>
        <StyledFooter >
          Shared Footer
        </StyledFooter>
      </StyledContainer>
    </>
  );
};

export default SharedLayout;
