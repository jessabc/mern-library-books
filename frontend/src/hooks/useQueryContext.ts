import { useContext } from "react";
import { QueryContext } from "../context/QueryContext";

const useQueryContext = () => {
  const { state, dispatch } = useContext(QueryContext);
  const { query } = state;
  return { query, dispatch };
};

export default useQueryContext;
