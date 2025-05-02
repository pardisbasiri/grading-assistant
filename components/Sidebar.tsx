// components/Sidebar.tsx
import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-gray-100 border-r fixed left-0 top-0 p-6 flex flex-col">
      <div className="flex flex-col items-center mb-8">
        <div className="w-16 h-16 bg-gray-300 rounded-full mb-2" />
        <p className="text-lg font-semibold">Professor Hernandez</p>
      </div>
      <nav className="flex-1 space-y-2">
        <Link href="/groups" className="block px-4 py-2 rounded hover:bg-gray-200">
          Groups
        </Link>
        <Link href="/assignments" className="block px-4 py-2 rounded hover:bg-gray-200">
          Assignments
        </Link>
        <Link href="/grading" className="block px-4 py-2 rounded hover:bg-gray-200">
          Grading
        </Link>
        <Link href="/dashboard" className="block px-4 py-2 rounded hover:bg-gray-200">
          Performance Dashboard
        </Link>
      </nav>
    </aside>
  );
}

