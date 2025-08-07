"use client";
import React, { useState } from "react";
import { Eye, EyeOff, Moon, Sun } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/admin/context/auth-provider";
import Image from "next/image";

export default function Login() {
  const { login } = useAuth(); // Ambil login dari context
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Ini akan memicu login di AuthProvider → update state global
      await login(formData);
      // Redirect otomatis di dalam AuthProvider
    } catch (err) {
      setError("Email/username atau password salah.");
      setIsLoading(false); // loading dihentikan
    }
  };

  const bgClass = darkMode
    ? "min-h-screen bg-gray-900 flex"
    : "min-h-screen bg-gray-50 flex";
  const leftPanelBg = darkMode ? "bg-gray-800" : "bg-white";
  const textPrimary = darkMode ? "text-white" : "text-gray-900";
  const textSecondary = darkMode ? "text-gray-300" : "text-gray-600";
  const textMuted = darkMode ? "text-gray-400" : "text-gray-500";

  return (
    <div className={bgClass}>
      <button
        onClick={() => setDarkMode(!darkMode)}
        className={`fixed top-4 right-4 p-2 rounded-full ${
          darkMode ? "bg-gray-700 text-yellow-400" : "bg-gray-200 text-gray-700"
        } hover:scale-105 transition-all duration-200 z-50`}
      >
        {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </button>

      <div
        className={`hidden lg:flex lg:w-1/2 xl:w-3/5 flex-col justify-center px-12 py-16 ${leftPanelBg}`}
      >
        <div className="max-w-lg">
          <div className="mb-12">
            <div className="flex items-center mb-6">
              <div className="bg-blue-600 p-3 rounded-xl mr-4">
                <Image
                  src="/logo.png"
                  alt="Detsonet Logo"
                  width={100}
                  height={100}
                />
              </div>
              <div>
                <h1 className={`text-3xl font-bold ${textPrimary}`}>
                  Detsonet
                </h1>
                <p className={`${textSecondary}`}>Internet Service Provider</p>
              </div>
            </div>
            <div className="mb-12">
              <p className={`text-lg leading-relaxed ${textSecondary} mb-6`}>
                Detsonet merupakan penyedia layanan internet di daerah Krian
                Sidoarjo sejak 2020, dan terus berkembang memberikan layanan
                terbaik untuk masyarakat.
              </p>
              <p className={`${textMuted} leading-relaxed`}>
                Kami menyediakan koneksi internet yang stabil dan cepat untuk
                rumah tangga dan bisnis.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`w-full lg:w-1/2 xl:w-2/5 flex items-center justify-center p-8 ${
          darkMode ? "bg-gray-900" : "bg-gray-50"
        }`}
      >
        <div className="w-full max-w-md">
          <div className="lg:hidden text-center mb-8">
            <div className="inline-flex items-center">
              <div className="bg-blue-600 p-2 rounded-lg mr-3">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 12h14M12 5l7 7-7 7"
                  />
                </svg>
              </div>
              <h1 className={`text-2xl font-bold ${textPrimary}`}>Detsonet</h1>
            </div>
          </div>

          <div
            className={`${
              darkMode
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-gray-200"
            } rounded-2xl p-8 border shadow-lg`}
          >
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h2 className={`text-2xl font-bold ${textPrimary} mb-2`}>
                Selamat Datang
              </h2>
              <p className={`${textSecondary}`}>
                Masuk ke dashboard manajemen Detsonet
              </p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  className={`block text-sm font-medium ${textPrimary} mb-2`}
                >
                  Email atau Username
                </label>
                <input
                  name="identifier"
                  type="text"
                  value={formData.identifier}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                      : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500"
                  } border rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200`}
                  placeholder="Masukkan email atau username"
                  required
                />
              </div>

              <div>
                <label
                  className={`block text-sm font-medium ${textPrimary} mb-2`}
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                        : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500"
                    } border rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 pr-12`}
                    placeholder="Masukkan password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${textMuted} hover:${textSecondary}`}
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label
                    htmlFor="remember"
                    className={`ml-2 text-sm ${textSecondary}`}
                  >
                    Ingat saya
                  </label>
                </div>
                <button
                  type="button"
                  className="text-sm text-blue-600 hover:text-blue-500"
                >
                  Lupa password?
                </button>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-200 ${
                  isLoading
                    ? "bg-blue-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                    Memuat...
                  </div>
                ) : (
                  "Masuk"
                )}
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className={`${textMuted} text-sm`}>
                Belum punya akun?{" "}
                <button className="text-blue-600 hover:text-blue-500 font-medium">
                  Hubungi Administrator
                </button>
              </p>
            </div>
          </div>

          <div className="text-center mt-8">
            <p className={`${textMuted} text-xs`}>
              © 2025 Detsonet. Hak cipta dilindungi undang-undang.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
