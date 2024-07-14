import { createContext, useReducer } from "react";

export const AuthContext = createContext(null);

export const authReducer = (user, action) => {
  switch (action.type) {
    case "LOGIN":
      return action.payload;

    case "LOGOUT":
      return null;

    default:
      user;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, dispatch] = useReducer(authReducer, null);

  console.log(user);

  return (
    <AuthContext.Provider value={{ user, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
