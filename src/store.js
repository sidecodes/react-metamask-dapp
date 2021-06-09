import React, { useReducer, useContext, createContext } from "react";

const StoreContext = createContext();
const initialState = {
  balance: 0,
  address: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "NEW-ADDRESS":
      return {
        ...state,
        address: action.address,
      };
    case "SET-BALANCE":
      return {
        ...state,
        balance: action.balance
      };
    default:
      throw new Error(`Unknown type of action: ${action.type}`);
  }
};

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);