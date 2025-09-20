import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";

const ProtectedLayout = () => {
  if (!true) {
    return <Navigate to="/login" />;
  }
  return (
    <div className="p-4">
      <NavBar />
      <Outlet />
    </div>
  );
};
export default ProtectedLayout;
