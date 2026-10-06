import { useContext , useEffect } from "react";
import { AuthContext } from "../auth.context.jsx";
import { register, login, logout, getMe } from "../services/auth.api.js";

export const useAuth = () => {

    let { user, setUser, loading, setLoading } = useContext(AuthContext);

    const handleLogin = async ({ email, password }) => {
        setLoading(true);
        try {
            let response = await login({ email, password })
            console.log(response);
            setUser(response.user);
        } catch (error) {
            console.log(error);
        }finally{
            setLoading(false);
        }
    }

    const handleRegister = async ({ username, email, password }) => {
        setLoading(true)
        try{
            let response = await register({username, email, password});
            setUser(response.user);
        }catch(error){
            console.log(error);
        }finally{
            setLoading(false);
        }
    }

    const handleLogout = async () => {
        setLoading(true);
        try{
            const data = await logout();
            setUser(null);
        }catch(error){
            console.log(error);
        }finally{
            setLoading(false);
        }
    }

    
    useEffect(() => {
    try {
        const getAndSetUser = async () => {
          const data = await getMe();
          //console.log("Data from getme --->", data)
          setUser(data.user);
     }
     getAndSetUser();
    } catch (error) {
        setUser(null);
        console.log("Error in getme-->", error)
    }finally{
          setLoading(false);
    }
    }, [])

    return {
        user,
        loading,
        handleLogin,
        handleRegister,
        handleLogout
    }
}


