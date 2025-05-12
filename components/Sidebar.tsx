// components/Sidebar.tsx
import React from 'react';
import Link from "next/link";
import { AvatarDemo } from "./Avatar";
import { cn } from "@/lib/utils";
import { Home, Users, Edit3, FileText, BarChart2, Settings, BookOpen, ClipboardCheck } from 'lucide-react';

const navItems = [
  { href: "/groups", label: "Groups", icon: Users },
  { href: "/assignments", label: "Assignments", icon: Edit3 },
  { href: "/grading", label: "Grading", icon: ClipboardCheck },
  { href: "/dashboard", label: "Performance Dashboard", icon: BarChart2 },
];

export default function Sidebar() {
  return (
    <aside className="hidden lg:block w-64 h-screen bg-muted/40 border-r fixed left-0 top-0 p-6 flex flex-col">
      <div className="flex flex-col items-center mb-8 pt-2 pb-4 border-b">
        <AvatarDemo />
        <p className="mt-2 text-lg font-semibold text-foreground">Professor Hernandez</p>
      </div>
      <nav className="flex-1 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-muted-foreground transition-all hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-100",
            )}
          >
            <item.icon className="h-5 w-5" />
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}

