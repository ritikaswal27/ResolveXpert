// src/context/IssueContext.js
import React, { createContext, useReducer } from 'react';
import { dashboardReducer, initialState } from '../reducers/dashboardReducer';

// Create the IssueContext
export const IssueContext = createContext();

// Context provider component
export function IssueProvider({ children }) {
  const [state, dispatch] = useReducer(dashboardReducer, initialState);

  return (
    <IssueContext.Provider value={{ state, dispatch }}>
      {children}
    </IssueContext.Provider>
  );
}
