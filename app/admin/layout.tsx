import { AuthProvider } from "@/components/admin/context/auth-provider";
import { Toaster } from "@/components/ui/toaster";
import React from "react";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <AuthProvider>
      <main>
        {children}
        <Toaster />
      </main>
    </AuthProvider>
  );
};

export default Layout;
