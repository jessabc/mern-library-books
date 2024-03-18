import { ReactNode, createContext, useEffect, useReducer } from "react";
import { IUser, IUserObj } from "../interfaces";

type AppState = typeof initialState;
type Action = { type: "LOGIN"; payload: IUser } | { type: "LOGOUT" };

interface AdminUserContextProviderProps {
  children: ReactNode;
}

const initialState: IUserObj = {
  user: null,
};

function reducer(state: AppState, action: Action) {
  switch (action.type) {
    case "LOGIN": {
      return {
        user: action.payload,
      };
    }
    case "LOGOUT": {
      return {
        user: null,
      };
    }
    default:
      return state;
  }
}

export const UserContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<Action>;
}>({ state: initialState, dispatch: () => {} });

export function UserContextProvider({
  children,
}: AdminUserContextProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const item = localStorage.getItem("user");
    let user;
    if (typeof item === "string") {
      user = JSON.parse(item);
    }
    if (user) {
      dispatch({ type: "LOGIN", payload: user });
    }
  }, []);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
}
