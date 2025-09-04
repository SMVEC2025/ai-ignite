import React, { createContext, useContext, useState } from "react";

// 1. Create Context
const AppContext = createContext();

// 2. Provider Component
export function AppProvider({ children }) {

  return (
    <AppContext.Provider
      value={{
     
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

// 3. Custom hook for easier usage
export function useAppContext() {
  return useContext(AppContext);
}
