"use client"
import React, { ReactNode } from 'react';
import "./styles.scss"
import LoaderPage from '../../../ui-components/src/lib/LoaderFullPage';
import { useLoader } from '../../../../apps/my-next-app/src/app/contexts/LoaderContext';
interface SharedLayoutProps {
  children: ReactNode;
}

export const SharedLayout: React.FC<SharedLayoutProps> = ({ children }) => {
  const { isLoading } = useLoader();

  return (
  <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <header style={{ background: '#6200ea', color: '#fff', padding: '1rem' }}>
        <h1>Shared Header</h1>
      </header>
      <main style={{ flex: 1, padding: '1rem' }}>
        {isLoading && <LoaderPage />}
        {children}
      </main>
      <footer style={{ background: '#6200ea', color: '#fff', padding: '1rem' }}>
        Shared Footer
      </footer>
    </div>
  );
};

export default SharedLayout;
