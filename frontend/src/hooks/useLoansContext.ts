import { useContext } from "react";
import { LoansContext } from "../context/LoansContext";

const useLoansContext = () => {
  const { state, dispatch } = useContext(LoansContext);
  const { loans } = state;
  return { loans, dispatch };
};

export default useLoansContext;
