"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Mail, Lock } from "lucide-react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/home");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white bg-gradient-to-b from-black via-gray-950 to-purple-950/20">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-grid-white/[0.02] pointer-events-none" />
      <div className="fixed inset-0 bg-gradient-to-br from-purple-800/10 via-transparent to-blue-800/10 pointer-events-none" />

      <div className="relative min-h-screen flex flex-col items-center justify-center p-4">
        {/* Logo Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <div className="relative w-20 h-20 mx-auto mb-4">
            <Image
              src="/Logo.png"
              alt="SaveFlow Logo"
              fill
              className="rounded-xl object-contain"
              sizes="80px"
            />
          </div>

          {/* Purple Glow Effect */}
          <motion.div
            className="absolute top-[-120px] left-1/2 transform -translate-x-1/2 w-[300px] h-[300px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <motion.h1
            className="text-5xl font-bold tracking-tighter"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <span className="bg-gradient-to-r from-purple-400 via-violet-400 to-purple-500 bg-clip-text text-transparent">
              SaveFlow
            </span>
          </motion.h1>
        </motion.div>

        {/* Login Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md rounded-2xl backdrop-blur-md bg-gradient-to-b from-white/[0.07] to-white/[0.03] border border-white/10 p-8 shadow-2xl shadow-black/40"
        >
          <motion.h2
            className="text-3xl font-semibold text-center mb-8 bg-gradient-to-r from-purple-400 via-violet-400 to-purple-500 bg-clip-text text-transparent"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Login
          </motion.h2>

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email Input */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="space-y-2"
            >
              <label className="text-sm text-gray-300 flex items-center gap-2">
                <Mail size={16} />
                Email/Username
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 outline-none"
                placeholder="Enter your email"
                required
              />
            </motion.div>

            {/* Password Input */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="space-y-2"
            >
              <label className="text-sm text-gray-300 flex items-center gap-2">
                <Lock size={16} />
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 outline-none"
                placeholder="Enter your password"
                required
              />
            </motion.div>

            {/* Error Message */}
            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-400 text-sm mt-2 text-center"
              >
                {error}
              </motion.p>
            )}

            {/* Remember Me & Forgot Password */}
            <motion.div
              className="flex items-center justify-between text-sm"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <label className="flex items-center gap-2 text-gray-300">
                <input
                  type="checkbox"
                  className="rounded border-gray-600 text-purple-600 focus:ring-purple-500/20"
                />
                Remember me
              </label>
              <a
                href="#"
                className="text-purple-400 hover:text-purple-300 transition-colors"
              >
                Forgot password?
              </a>
            </motion.div>

            {/* Login Button */}
            <motion.button
              type="submit"
              className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl font-medium shadow-lg shadow-purple-500/20 hover:from-purple-700 hover:to-purple-800 transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Login
            </motion.button>

            {/* Sign Up Link */}
            <motion.p
              className="text-center text-gray-400 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              Don't have an account?{" "}
              <a
                href="#"
                className="text-purple-400 hover:text-purple-300 transition-colors"
              >
                Sign up
              </a>
            </motion.p>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;
