import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider.jsx";

export default function GuestLayout() {
  const { token } = useStateContext();

  if (token) {
    return <Navigate to="/home" />;
  }
  return (
    <div className="p-4 mx-auto w-1/2 ">
      <Outlet />
    </div>
  );
}
