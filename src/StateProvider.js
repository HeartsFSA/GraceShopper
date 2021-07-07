import React, {createContext, useContext, useReducer} from 'react';
// setup data layer
// We need this to track the basket count

// This is the data layer
export const StateContext = createContext();

// Build a Provider
export const StateProvider = ({reducer, initialState, children}) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

export const useStateValue = () => useContext(StateContext);
