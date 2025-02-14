import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token")); // ✅ Store token in state
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      axios
        .get("http://localhost:5000/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setUser(res.data))
        .catch(() => {
          logout(); // ✅ Clear token if invalid
        });
    }
  }, [token]); // ✅ Run when `token` changes

  const login = async (email, password) => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      setToken(res.data.token); // ✅ Update token state
      setUser(res.data);
      navigate("/dashboard");
    } catch (error) {
      console.error(error.response?.data?.msg || "Login failed");
    }
  };

  const register = async (name, email, password) => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      setToken(res.data.token); // ✅ Update token state
      setUser(res.data);
      navigate("/dashboard");
    } catch (error) {
      console.error(error.response?.data?.msg || "Registration failed");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null); // ✅ Clear token state
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Custom Hook for Cleaner Usage
export const useAuth = () => useContext(AuthContext);

export default AuthContext;
