import { ReactNode, createContext, useReducer } from "react";
import { IBook, IBooks } from "../interfaces";

type AppState = typeof initialState;
type Action =
  | { type: "SET_BOOKS"; payload: IBook[] }
  | { type: "DELETE_BOOK"; payload: IBook }
  | { type: "EDIT_BOOK"; payload: IBook };

interface BooksContextProviderProps {
  children: ReactNode;
}

const initialState: IBooks = {
  books: [],
};

function reducer(state: AppState, action: Action) {
  switch (action.type) {
    case "SET_BOOKS": {
      return {
        books: action.payload,
      };
    }
    case "DELETE_BOOK": {
      return {
        books: state.books.filter((book) => book._id != action.payload._id),
      };
    }
    case "EDIT_BOOK": {
      return {
        books: state.books.map((book) =>
          book._id === action.payload._id ? { ...action.payload } : book
        ),
      };
    }
    default:
      return state;
  }
}

export const BooksContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<Action>;
}>({ state: initialState, dispatch: () => {} });

export function BooksContextProvider({ children }: BooksContextProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  console.log(state);

  return (
    <BooksContext.Provider value={{ state, dispatch }}>
      {children}
    </BooksContext.Provider>
  );
}
