// components/Layout.tsx
import React, { ReactNode } from "react";
import Sidebar from "./Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen"> 
      <Sidebar /> 
      <main className="flex-1 p-4 sm:p-6 md:p-8 bg-background lg:ml-64">
        {children}
      </main>
    </div>
  );
}
