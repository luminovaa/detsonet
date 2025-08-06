"use client";
import React, { useState } from "react";
import {
  Eye,
  EyeOff,
  Wifi,
  Shield,
  Users,
  BarChart3,
  Globe,
  Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { authService } from "@/services/services";
import { useRouter } from "next/navigation";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [error, setError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (error) setError("");
  };

  const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = async (
    e
  ) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    console.log('API URL:', process.env.NEXT_PUBLIC_API_URL); // Cek di browser console
    
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const result = await authService.login(formData);
      console.log(result)
      router.push("/admin/dashboard");

    } catch (err) {
      setError("Invalid credentials. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex">
      {/* Left Side - Branding & Features */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-3/5 flex-col justify-center px-12 py-16 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-0 right-0 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
          <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
        </div>

        <div className="relative z-10">
          {/* Logo & Title */}
          <div className="mb-12">
            <div className="flex items-center mb-6">
              <div className="bg-blue-600 p-3 rounded-xl mr-4">
                <Wifi className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">
                  ISP Manager Pro
                </h1>
                <p className="text-blue-200">
                  Complete Network Management Solution
                </p>
              </div>
            </div>
          </div>

          {/* Feature Highlights */}
          <div className="space-y-8 mb-12">
            <div className="flex items-start space-x-4">
              <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg">
                <Users className="w-6 h-6 text-blue-300" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Customer Management
                </h3>
                <p className="text-blue-100 leading-relaxed">
                  Manage customer accounts, billing, and support tickets all in
                  one place. Real-time customer analytics and automated billing
                  systems.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg">
                <BarChart3 className="w-6 h-6 text-green-300" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Network Monitoring
                </h3>
                <p className="text-blue-100 leading-relaxed">
                  Monitor network performance, bandwidth usage, and detect
                  issues before they affect your customers. Advanced analytics
                  dashboard.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg">
                <Shield className="w-6 h-6 text-purple-300" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Security & Compliance
                </h3>
                <p className="text-blue-100 leading-relaxed">
                  Enterprise-grade security features with compliance reporting.
                  Protect your network and customer data with advanced
                  encryption.
                </p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 text-center">
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold text-white">99.9%</div>
              <div className="text-blue-200 text-sm">Uptime</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold text-white">10K+</div>
              <div className="text-blue-200 text-sm">Customers</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold text-white">24/7</div>
              <div className="text-blue-200 text-sm">Support</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 xl:w-2/5 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <div className="inline-flex items-center">
              <div className="bg-blue-600 p-2 rounded-lg mr-3">
                <Wifi className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white">ISP Manager Pro</h1>
            </div>
          </div>

          {/* Login Card */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
                <Lock className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">
                Welcome Back
              </h2>
              <p className="text-blue-200">
                Sign in to your ISP management dashboard
              </p>
            </div>

            {error && (
              <div className="bg-red-500/20 border border-red-500/30 text-red-200 px-4 py-3 rounded-lg mb-6 text-sm">
                {error}
              </div>
            )}

            <div className="space-y-6">
              <div>
                <div className="block text-sm font-medium text-white mb-2">
                  Email or Username
                </div>
                <input
                  name="identifier"
                  type="text"
                  value={formData.identifier}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-blue-400 focus:bg-white/10 transition-all duration-300"
                  placeholder="Enter your email or username"
                />
              </div>

              <div>
                <div className="block text-sm font-medium text-white mb-2">
                  Password
                </div>
                <div className="relative">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-blue-400 focus:bg-white/10 transition-all duration-300 pr-12"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white transition-colors duration-200"
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
                    type="checkbox"
                    className="w-4 h-4 bg-white/10 border border-white/30 rounded focus:ring-blue-500 focus:ring-2"
                  />
                  <span className="ml-2 text-sm text-white/80">
                    Remember me
                  </span>
                </div>
                <button
                  type="button"
                  className="text-sm text-blue-300 hover:text-blue-200 transition-colors duration-200"
                >
                  Forgot password?
                </button>
              </div>

              <Button
                onClick={handleSubmit}
                disabled={isLoading}
                className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-300 ${
                  isLoading
                    ? "bg-blue-600/50 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/30"
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                    Signing in...
                  </div>
                ) : (
                  "Sign In"
                )}
              </Button>
            </div>

            <div className="mt-8 text-center">
              <p className="text-white/60 text-sm">
                Dont have an account?{" "}
                <button className="text-blue-300 hover:text-blue-200 font-medium transition-colors duration-200">
                  Contact Administrator
                </button>
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-8">
            <p className="text-white/40 text-xs">
              © 2025 ISP Manager Pro. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
