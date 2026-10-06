import { createContext , useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    let [user, setUser] = useState(null);
    let [loading, setLoading] = useState(true);


   return <AuthContext.Provider value={{user, setUser, loading, setLoading}}>
        {children}
   </AuthContext.Provider>

}