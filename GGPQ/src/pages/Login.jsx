import React, { useState } from "react";
import { useUser } from "../context/UserContext";
import { motion } from "framer-motion";
import { Mail, Lock, ChevronRight, Play } from "lucide-react";

import SEO from "../components/SEO";

const Login = () => {
  const [email, setEmail] = useState("");
  const { login } = useUser();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email || "demo@tfc.tv", "password");
  };
  const handleReset = () => {
    const userEmail = prompt("Please enter your email to reset password:");
    if (userEmail) {
      // استيراد سريع وإرسال
      import("firebase/auth").then(({ getAuth, sendPasswordResetEmail }) => {
        sendPasswordResetEmail(getAuth(), userEmail)
          .then(() => alert("Reset link sent! Check your inbox."))
          .catch((err) => alert("Error: " + err.message));
      });
    }
  };
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 relative overflow-hidden">
      <SEO
        title="Login"
        description="Login to your TFC account to access exclusive live events and premium content."
      />
      {/* Animated Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-yellow-600/5 rounded-full blur-[120px] animate-pulse" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg bg-surface/50 backdrop-blur-2xl border border-gray-800 rounded-[3rem] p-12 relative z-10 shadow-2xl"
      >
        <div className="text-center mb-12">
          <h1 className="text-6xl font-black text-primary italic tracking-tighter mb-4 shadow-primary/20">
            TFC
          </h1>
          <p className="text-gray-400 font-bold uppercase tracking-[0.2em] text-xs">
            The Future of Content
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-4">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full bg-background border border-gray-800 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-primary transition-all"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-4">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600" />
              <input
                type="password"
                id="password"
                placeholder="PASSWORD"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent border-b border-gray-700 focus:border-white outline-none py-2 text-sm transition-colors"
                required
              />
            </div>
          </div>
          <div className="flex justify-end mt-1">
            <span
              onClick={handleReset}
              className="text-[10px] text-gray-500 hover:text-white cursor-pointer underline uppercase font-bold transition-colors"
            >
              Forgot Password?
            </span>
          </div>

          <button
            type="submit"
            className="w-full bg-primary hover:bg-yellow-500 text-black font-black py-5 rounded-2xl uppercase tracking-[0.2em] flex items-center justify-center group transition-all"
          >
            <span>Sign In</span>
            <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="mt-12 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-6">
            Demo Credentials
          </p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => setEmail("user@tfc.tv")}
              className="px-4 py-2 bg-background border border-gray-800 rounded-xl text-[10px] font-black uppercase text-gray-400 hover:text-white hover:border-gray-600 transition-all"
            >
              User Access
            </button>
            <button
              onClick={() => setEmail("admin@tfc.tv")}
              className="px-4 py-2 bg-background border border-gray-800 rounded-xl text-[10px] font-black uppercase text-gray-400 hover:text-white hover:border-gray-600 transition-all"
            >
              Admin Access
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
