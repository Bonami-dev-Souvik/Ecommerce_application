import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import NotFound from "../components/pages/NotFound";


const PrivateRoute = () => {

  const {isAuthenticated, user} = useAuth();

  console.log("PrivateRoute - isAuthenticated:", isAuthenticated);
  console.log("PrivateRoute - user:", user);



  if (isAuthenticated === null) {


    return <NotFound />
    
  }

  return isAuthenticated ? <Outlet context ={{ user }}/> : <Navigate to ="/"/>; 
};

export default PrivateRoute;