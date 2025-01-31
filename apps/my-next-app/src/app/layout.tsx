import { SharedLayout } from '@nx-monorepo/shared-layout';
import { LoaderProvider } from './contexts/loader-context';
export const metadata = {
  title: 'Welcome to demo2',
  description: 'Generated by create-nx-workspace',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const customHeader = (
    <header >
      <ul>
        <li>Home</li>
        <li>Page one</li>
        <li>Page Two</li>
      </ul>
    </header>
  );

  const customFooter = (
    <footer >
     <ul className='grid grid-cols-3'>
       <li>Link 1</li>
       <li>Link 2</li>
       <li>Link 3</li>
     </ul>
    </footer>
  );
  return (
    <html lang="en">
      <body>
        <LoaderProvider>
          <SharedLayout header={customHeader} footer={customFooter}>{children}</SharedLayout>
        </LoaderProvider>
      </body>
    </html>
  );
}
