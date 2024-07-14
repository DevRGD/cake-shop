import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";

const useAuth = () => {
  const { user, dispatch } = useContext(AuthContext);
  const login = (data) => dispatch({ type: "LOGIN", payload: data });
  const logout = () => dispatch({ type: "LOGOUT" });

  return { user, login, logout };
};

export default useAuth;
