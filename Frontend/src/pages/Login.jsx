import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import AuthContext from "../context/AuthContext";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 via-blue-300 to-blue-500 overflow-hidden">
      {/* Animated Floating Elements */}
      <motion.div
        className="absolute w-40 h-40 bg-blue-400/20 rounded-full blur-3xl top-10 left-20"
        animate={{ y: [0, 30, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-56 h-56 bg-blue-500/20 rounded-full blur-3xl bottom-10 right-20"
        animate={{ y: [0, -30, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md p-8 backdrop-blur-lg bg-white/40 shadow-[0_4px_30px_rgba(0,0,255,0.1)] rounded-2xl border border-white/30 relative"
      >
        <h2 className="text-3xl font-bold text-blue-900 text-center mb-6 neon-text">
          Welcome Back 👋
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-blue-800">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 p-3 w-full border-none rounded-lg bg-white/50 text-blue-900 placeholder-blue-600 focus:ring-2 focus:ring-blue-300 focus:outline-none shadow-[0px_0px_8px_rgba(0,128,255,0.5)]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-blue-800">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 p-3 w-full border-none rounded-lg bg-white/50 text-blue-900 placeholder-blue-600 focus:ring-2 focus:ring-blue-300 focus:outline-none shadow-[0px_0px_8px_rgba(0,128,255,0.5)]"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-3 rounded-lg hover:scale-105 transform transition duration-300 font-semibold shadow-[0px_0px_12px_rgba(0,128,255,0.5)]"
          >
            Login
          </button>
        </form>

        <p className="text-center text-blue-800 text-sm mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Sign up here
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
