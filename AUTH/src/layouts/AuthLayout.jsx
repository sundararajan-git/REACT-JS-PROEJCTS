import { Navigate, Outlet, useLocation } from "react-router-dom";
import NavBar from "../components/NavBar";

const AuthLayout = () => {
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
      {userLogedIn && <NavBar />}
      <Outlet />
    </div>
  );
};
export default AuthLayout;

// import { Navigate, Outlet, useLocation } from "react-router-dom";
// import NavBar from "../components/NavBar";

// // Example of route permissions mapping
// const routePermissions = {
//   publicOnly: ["/login", "/signup"], // routes allowed only when logged out
//   protected: ["/", "/dashboard", "/profile"], // general protected routes
//   premium: ["/premium"], // premium-only routes
//   admin: ["/admin", "/admin/users"], // admin-only routes
// };

// const AuthLayout = () => {
//   const location = useLocation();
//   const auth = JSON.parse(localStorage.getItem("auth"));

//   // Example auth shape
//   // {
//   //   email: "test@example.com",
//   //   isLogin: true,
//   //   role: "user" | "premium" | "admin"
//   // }

//   const isLoggedIn = auth?.email && auth?.isLogin;
//   const role = auth?.role || "guest"; // guest, user, premium, admin

//   const path = location.pathname;

//   // 1️⃣ Public-only route restriction
//   if (isLoggedIn && routePermissions.publicOnly.includes(path)) {
//     return <Navigate to="/" replace />;
//   }

//   // 2️⃣ Protected route restriction
//   if (!isLoggedIn && !routePermissions.publicOnly.includes(path)) {
//     return <Navigate to="/login" replace />;
//   }

//   // 3️⃣ Premium route restriction
//   if (routePermissions.premium.includes(path) && role !== "premium" && role !== "admin") {
//     return <Navigate to="/upgrade" replace />;
//   }

//   // 4️⃣ Admin route restriction
//   if (routePermissions.admin.includes(path) && role !== "admin") {
//     return <Navigate to="/" replace />;
//   }

//   // 5️⃣ Default rendering
//   return (
//     <div className="p-4">
//       {isLoggedIn && <NavBar />}
//       <Outlet />
//     </div>
//   );
// };

// export default AuthLayout;
