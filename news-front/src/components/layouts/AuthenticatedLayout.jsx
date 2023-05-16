import {
  Navigate,
  Outlet,
  useSearchParams,
  useNavigate,
  Link,
} from "react-router-dom";
import { useStateContext } from "@/contexts/ContextProvider.jsx";
import { useRef, useEffect } from "react";
import axios from "@/axios.js";

/* import components*/
import Navbar from "@/components/layouts/Navbar";

export default function AuthenticatedLayout() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { user, token, setUser, setToken } = useStateContext();
  const searchInputRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/me")
      .then(({ data }) => {
        setUser(data.data.user);
      })
      .catch(() => {
        setToken(null);
        navigate("/login");
      });
  }, []);

  if (!token) {
    return <Navigate to="/login" />;
  }

  const logout = () => {
    axios.post("/auth/logout").then(() => {
      setUser({});
      setToken(null);
    });
  };

  return (
    <div className="bg-gray-100 h-full">
      <header>
        <Navbar logout={logout} user={user} />
      </header>
      <main className="p-4 h-full">
        <Outlet />
      </main>
      <footer></footer>
    </div>
  );
}
