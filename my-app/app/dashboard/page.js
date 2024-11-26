"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { X, DollarSign, Clipboard, CreditCard } from "lucide-react";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [income, setIncome] = useState(null);
  const [rent, setRent] = useState(null);
  const [food, setFood] = useState(null);
  const [hasEnteredData, setHasEnteredData] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const validateForm = () => {
    const errors = {};
    if (!income) errors.income = "Monthly income is required";
    if (!rent) errors.rent = "Monthly rent is required";
    if (!food) errors.food = "Monthly food expenses are required";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setHasEnteredData(true);
      setIsModalOpen(false);
    }
  };

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const handleLogout = () => {
    router.push("/");
  };

  const data = [
    { name: "Income", value: income || 52 },
    { name: "Food", value: food || 23 },
    { name: "Rent", value: rent || 25 },
  ];

  const COLORS = ["#8B5CF6", "#F59E0B", "#3B82F6"];

  if (!isMounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-black text-white bg-gradient-to-b from-black via-gray-950 to-purple-950/20 flex items-center justify-center p-4">
      <div className="w-full max-w-xl">
        <div className="text-center mb-8">
          <motion.h1 className="text-5xl font-bold tracking-tighter flex items-center justify-center">
            <div className="relative w-32 h-32 mr-4">
              <Image
                src="/Logo.png"
                alt="SaveFlow Logo"
                fill
                className="rounded-xl object-contain"
                sizes="128px"
              />
            </div>
            <span className="bg-gradient-to-r from-purple-400 via-violet-400 to-purple-500 bg-clip-text text-transparent">
              SaveFlow
            </span>
          </motion.h1>
        </div>

        <div className="flex flex-row items-center justify-center w-full bg-white/5 rounded-2xl border border-white/10 p-6 space-x-4">
          <div className="bg-white/10 rounded-2xl p-4 flex flex-col space-y-3 w-auto">
            {data.map((entry, index) => (
              <div
                key={entry.name}
                className="flex items-center space-x-3 text-gray-300"
              >
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                <span className="text-sm">{entry.name}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col items-center justify-center p-5 space-y-4">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={35}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${entry.name}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>

            <div className="flex space-x-4">
              <button
                className="px-5 py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl font-medium shadow-lg shadow-purple-500/20 hover:from-purple-700 hover:to-purple-800 transition-all duration-300"
                onClick={() => alert("Details button clicked!")}
              >
                Details
              </button>

              <button
                className="px-5 py-2 bg-gray-700 text-white rounded-xl font-medium shadow-lg hover:bg-gray-600 transition-all duration-300"
                onClick={toggleModal}
              >
                Edit
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {isModalOpen && (
            <motion.div
              className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm bg-black/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-black rounded-2xl p-6 w-full max-w-md shadow-2xl shadow-black/40"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-semibold bg-gradient-to-r from-purple-400 via-violet-400 to-purple-500 bg-clip-text text-transparent">
                    Add/Edit Expenses
                  </h2>
                  <button onClick={toggleModal}>
                    <X className="text-gray-400 hover:text-white transition-colors" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {[
                    {
                      label: "Monthly Income",
                      value: income,
                      setter: setIncome,
                      icon: <DollarSign size={14} />,
                    },
                    {
                      label: "Monthly Rent",
                      value: rent,
                      setter: setRent,
                      icon: <CreditCard size={14} />,
                    },
                    {
                      label: "Monthly Food",
                      value: food,
                      setter: setFood,
                      icon: <Clipboard size={14} />,
                    },
                  ].map(({ label, value, setter, icon }, index) => (
                    <div key={label} className="space-y-1">
                      <label className="text-xs text-gray-300 flex items-center gap-2">
                        {icon}
                        {label}
                      </label>
                      <input
                        type="number"
                        value={value || ""}
                        onChange={(e) => setter(parseFloat(e.target.value))}
                        className={`w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 text-sm ${
                          formErrors[label.toLowerCase().replace(" ", "")]
                            ? "border-red-500 focus:border-red-500"
                            : ""
                        }`}
                        placeholder={`Enter your ${label.toLowerCase()}`}
                      />
                      {formErrors[label.toLowerCase().replace(" ", "")] && (
                        <p className="text-red-500 text-xs">
                          {formErrors[label.toLowerCase().replace(" ", "")]}
                        </p>
                      )}
                    </div>
                  ))}

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-2 px-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl font-medium shadow-lg shadow-purple-500/20 hover:from-purple-700 hover:to-purple-800 transition-all duration-300"
                  >
                    Submit
                  </motion.button>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Logout Button */}
        <div className="flex justify-end mt-4">
          <button
            onClick={handleLogout}
            className="px-5 py-2 bg-red-600 text-white rounded-xl font-medium shadow-lg hover:bg-red-700 transition-all duration-300"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
