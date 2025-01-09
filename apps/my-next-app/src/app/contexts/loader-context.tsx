"use client"
import { createContext, ReactNode, useContext, useState } from 'react';
interface LoaderContextProps {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

export const LoaderContext = createContext<LoaderContextProps | undefined>(undefined)

const LoaderProvider = ({children}: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <LoaderContext.Provider value={{isLoading, setIsLoading}}>
      {children}
    </LoaderContext.Provider>
  );
}

 const useLoader =() => {
   const context = useContext(LoaderContext);
   if (!context) {
     throw new Error('useLoader must be used within a LoaderProvider');
   }
   return context;}
export {LoaderProvider,useLoader}

