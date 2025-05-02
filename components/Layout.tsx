// components/Layout.tsx
import React, { ReactNode } from "react";
import Sidebar from "./Sidebar";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-64 flex-1 p-8 bg-white min-h-screen">
        {children}
      </main>
    </div>
  );
}
