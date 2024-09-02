import React, { createContext, useState, useContext } from 'react';

const PasswordResetContext = createContext();

export const usePasswordReset = () => {
  return useContext(PasswordResetContext);
};

export const PasswordResetProvider = ({ children }) => {
  const [step, setStep] = useState(0); // Track the user's progress

  return (
    <PasswordResetContext.Provider value={{ step, setStep }}>
      {children}
    </PasswordResetContext.Provider>
  );
};