import React, { createContext, useContext, useReducer } from "react";
import { Patient, Diagnosis } from "../types";

import { Action } from "./reducer";

// https://fullstackopen.com/en/part9/react_with_types#state-handling
export type State = {
  patients: { [id: string]: Patient };
  diagnosis: { [code: string]: Diagnosis };
};

const initialState: State = {
  patients: {},
  diagnosis: {},
};

export const StateContext = createContext<[State, React.Dispatch<Action>]>([
  initialState,
  () => initialState,
]);

type StateProviderProps = {
  reducer: React.Reducer<State, Action>;
  children: React.ReactElement;
};

export const StateProvider: React.FC<StateProviderProps> = ({
  reducer,
  children,
}: StateProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  );
};
export const useStateValue = () => useContext(StateContext);
