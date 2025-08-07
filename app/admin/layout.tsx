import { AuthProvider } from "@/components/admin/context/auth-provider";
import React from "react";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <AuthProvider>
      <main>{children}</main>
    </AuthProvider>
  );
};

export default Layout;
