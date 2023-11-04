
import React, {useState, createContext, ReactNode} from 'react'
import { string } from 'yup';

interface TiposuserDetails {
    userName: string;
    firstName: string;
    lastName: string;
    email: string;
}

interface AuthContextType {
    auth?: TiposuserDetails;
    user?: TiposuserDetails | undefined;
    login: (userData: TiposuserDetails) => void;
    logout: () => void;
  }

export const AuthContext = createContext<AuthContextType>({
    user: undefined,
    login: (useData:TiposuserDetails) => {},
    logout: () => {},
})

export default function AuthProvider(props:{children:ReactNode}) {
    const {children} = props;
    const [auth, setAuth] = useState<{email:string, firstName:string, lastName:string, userName:string } | undefined>(undefined);

    const login = (useData:TiposuserDetails) => {
        setAuth(useData);
    }
    const logout = () => {
        setAuth(undefined)
    }

    const valueContext = {
        auth,
        login,
        logout,
    };

  return (
    <AuthContext.Provider value={valueContext}>
        {children}
    </AuthContext.Provider>
  )
}
