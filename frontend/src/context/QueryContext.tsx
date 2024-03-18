import { ReactNode, createContext, useReducer } from "react";

type AppState = typeof initialState;
type Action = { type: "SET_QUERY"; payload: string };

interface QueryContextProviderProps {
  children: ReactNode;
}

const initialState = {
  query: "",
};

function reducer(state: AppState, action: Action) {
  switch (action.type) {
    case "SET_QUERY": {
      return {
        query: action.payload,
      };
    }

    default:
      return state;
  }
}

export const QueryContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<Action>;
}>({ state: initialState, dispatch: () => {} });

export function QueryContextProvider({ children }: QueryContextProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <QueryContext.Provider value={{ state, dispatch }}>
      {children}
    </QueryContext.Provider>
  );
}
