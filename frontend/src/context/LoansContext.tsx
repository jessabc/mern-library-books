import { ReactNode, createContext, useReducer } from "react";
import { ILoans, IUserLoan } from "../interfaces";

type AppState = typeof initialState;
type Action =
  | { type: "SET_LOANS"; payload: IUserLoan[] }
  | { type: "ADD_LOAN"; payload: IUserLoan }
  | { type: "REMOVE_LOAN"; payload: IUserLoan };

interface BooksContextProviderProps {
  children: ReactNode;
}

const initialState: ILoans = {
  loans: [],
};

function reducer(state: AppState, action: Action) {
  switch (action.type) {
    case "SET_LOANS": {
      return {
        loans: [...action.payload],
      };
    }
    case "ADD_LOAN": {
      return {
        loans: [...state.loans, action.payload],
      };
    }
    default:
      return state;
  }
}

export const LoansContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<Action>;
}>({ state: initialState, dispatch: () => {} });

export function LoansContextProvider({ children }: BooksContextProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <LoansContext.Provider value={{ state, dispatch }}>
      {children}
    </LoansContext.Provider>
  );
}
