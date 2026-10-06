import { useAuth } from "../hooks/useAuth";
import { Navigate , Outlet } from "react-router";

const PublicProtected = () => {

    const { loading, user } = useAuth();
    console.log(user);

    if(loading){
        return ( <main><h1>Loading.......</h1></main> )
    }

    if(user){
        console.log("Public Protected",user);
        return <Navigate to={'/main'}/>
    }

    return (
        <Outlet/>
    )
}

export default PublicProtected;