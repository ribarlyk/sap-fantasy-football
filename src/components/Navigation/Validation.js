import { Navigate, Outlet } from "react-router-dom";


function hasTeam() {
    const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
  
    if (loggedUser && loggedUser.team) {
      return true;
    } else {
      return false;
    }
  }

  const ProtectedRoutes = () => {
    const isAuth = hasTeam();
    return isAuth ? <Outlet/> : <Navigate to="/my-team"/>
  }

  export default ProtectedRoutes

  