import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const useAdminUserContext = () => {
  const { state, dispatch } = useContext(UserContext);
  const { user } = state;
  return { user, dispatch };
};

export default useAdminUserContext;
