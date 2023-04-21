import { Navigate, Outlet } from "react-router-dom";



function hasTeam() {
    const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
  
    if (loggedUser && loggedUser.team) {
      return true;
    } else {
      return false;
    }
  }

  function isLogged() {
    const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
  
    if (loggedUser) {
      return true;
    } else {
      return false;
    }
  }

  function hasLeagueAndFix() {
    const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
  
    if (loggedUser.fixtures && loggedUser.team) {
      return true;
    } else {
      return false;
    }
  }

  export const MatchProtectedRoute = () => {
    const isAuth = hasLeagueAndFix();
    return isAuth ? <Outlet/> : <Navigate to="/standings"/>
  }

 export const TeamProtectedRoutes = () => {
    const isAuth = isLogged();
    return isAuth ? <Outlet/> : <Navigate to="/login"/>
  }


  const ProtectedRoutes = () => {
    const isAuth = hasTeam();
    return isAuth ? <Outlet/> : <Navigate to="/my-team"/>
  }

  export default ProtectedRoutes

  