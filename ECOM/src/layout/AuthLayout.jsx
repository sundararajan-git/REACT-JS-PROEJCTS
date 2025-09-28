import { Navigate, Outlet, useLocation } from "react-router-dom";
import NavBar from "../components/NavBar";
import { useEffect, useState } from "react";
import { db } from "../lib/db";
import { createContext } from "react";

export const EcomContext = createContext();

const AuthLayout = () => {
  const [products, setProducts] = useState(db ?? []);
  const location = useLocation();
  const auth = JSON.parse(localStorage.getItem("auth"));
  const publicRoutes = ["/signup", "/login"];
  const userLogedIn = auth?.email && auth.isLogin;

  if (userLogedIn && publicRoutes.includes(location.pathname)) {
    return <Navigate to="/" replace />;
  } else if (!userLogedIn && !publicRoutes.includes(location.pathname)) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div>
      <EcomContext.Provider value={{ products, setProducts }}>
        {userLogedIn && <NavBar />}
        <Outlet />
      </EcomContext.Provider>
    </div>
  );
};
export default AuthLayout;
