import { Navigate, Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";

const ProtectedLayout = () => {
  if (!true) {
    return <Navigate to="/login" />;
  }
  return (
    <div className="w-full min-h-svh flex flex-col gap-3 p-4">
      <NavBar />
      <Outlet />
    </div>
  );
};
export default ProtectedLayout;
