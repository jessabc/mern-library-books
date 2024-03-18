import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BooksContextProvider } from "./context/BooksContext.tsx";
import { UserContextProvider } from "./context/UserContext.tsx";
import { LoansContextProvider } from "./context/LoansContext.tsx";
import { QueryContextProvider } from "./context/QueryContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <UserContextProvider>
      <BooksContextProvider>
        <LoansContextProvider>
          <QueryContextProvider>
            <App />
          </QueryContextProvider>
        </LoansContextProvider>
      </BooksContextProvider>
    </UserContextProvider>
  </React.StrictMode>
);
