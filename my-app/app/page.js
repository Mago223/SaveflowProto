"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  ChevronRight,
  Mail,
  Lock,
  UserPlus,
  LogIn,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";

const WelcomePage = () => {
  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Left Side - Branding & Introduction */}
      <div className="w-1/2 flex flex-col justify-center items-center bg-gradient-to-br from-purple-900/50 to-black p-12">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-6 max-w-md"
        >
          <div className="flex justify-center mb-6">
            <div className="relative w-40 h-40">
              <Image
                src="/Logo.png"
                alt="SaveFlow Logo"
                fill
                className="object-contain"
              />
            </div>
          </div>

          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-violet-400 to-purple-500 bg-clip-text text-transparent">
            SaveFlow
          </h1>

          <p className="text-xl text-gray-300 leading-relaxed">
            Transform your financial journey with intelligent budgeting,
            real-time tracking, and personalized insights.
          </p>

          <div className="space-y-4 text-left">
            <div className="flex items-center space-x-4">
              <CheckCircle className="text-purple-500" size={24} />
              <span>Smart Budget Recommendations</span>
            </div>
            <div className="flex items-center space-x-4">
              <CheckCircle className="text-purple-500" size={24} />
              <span>Real-time Financial Tracking</span>
            </div>
            <div className="flex items-center space-x-4">
              <CheckCircle className="text-purple-500" size={24} />
              <span>Personalized Financial Goals</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Right Side - Authentication Options */}
      <div className="w-1/2 flex items-center justify-center bg-white/5">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full max-w-md p-10 space-y-6"
        >
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Get Started</h2>
            <p className="text-gray-400 mb-8">
              Choose how you want to continue with SaveFlow
            </p>
          </div>

          <div className="space-y-4">
            <Link href="/login">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl font-medium shadow-lg hover:from-purple-700 hover:to-purple-800 transition-all flex items-center justify-center space-x-2"
              >
                <LogIn size={20} />
                <span>Log In</span>
              </motion.button>
            </Link>

            <Link href="/signup">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full py-3 bg-white/10 border border-white/20 text-white rounded-xl font-medium hover:bg-white/20 transition-all flex items-center justify-center space-x-2"
              >
                <UserPlus size={20} />
                <span>Sign Up</span>
              </motion.button>
            </Link>
          </div>

          <div className="text-center mt-6">
            <p className="text-gray-400">
              Secure authentication powered by Firebase
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default WelcomePage;
