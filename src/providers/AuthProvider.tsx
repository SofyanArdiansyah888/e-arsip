import { useLocalStorage } from "@/hooks/useLocalStorage";
import { UserEntity } from "@/models/User.entity";
import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext<IValue>({
  user: null,
  login: null,
  logout: null
});

interface IAuthProvider {
  children: JSX.Element;
}
interface IValue {
  user: UserEntity | unknown;
  login: any;
  logout: any;
}
export const AuthProvider = ({ children }: IAuthProvider) => {
  const [user, setUser] = useLocalStorage("user", null);
  const navigate = useNavigate();

  

  // call this function when you want to authenticate the user
  const login = async (data: UserEntity) => {
    setUser(data);
    navigate("/dashboard");
  };

  // call this function to sign out logged in user
  const logout = () => {
    setUser(null);
    navigate("/", { replace: true });
  };

  const value: IValue   = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
