import { useAuth } from "../hooks/useAuth";
import { Navigate , Outlet } from "react-router";

const PrivateProtected = () => {

    const { loading, user } = useAuth();
    // console.log(user);

    if(loading){
        return ( <main><h1>Loading.......</h1></main> )
    }

    if(!user){
        return <Navigate to={'/login'}/>
    }

    return (
        <Outlet/>
    )
}

export default PrivateProtected;