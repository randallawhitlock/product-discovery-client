"use client";

import React from "react";
import Link from "next/link";

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <aside className="w-64 bg-white border-r border-slate-200">
        <div className="p-4 border-b border-slate-200">
          <h1 className="text-lg font-bold text-slate-800">Admin Panel</h1>
        </div>
        <nav className="mt-6">
          <Link href="/admin" className={`block px-4 py-3 text-slate-600 hover:bg-slate-100`}>
            Dashboard
          </Link>
          <Link href="/admin/posts" className={`block px-4 py-3 text-slate-600 hover:bg-slate-100`}>
            Blog Posts
          </Link>
        </nav>
        <div className="absolute bottom-0 w-full border-t border-slate-200">
          <Link href="/logout" className="block px-4 py-3 text-slate-600 hover:bg-slate-100">
            Logout
          </Link>
        </div>
      </aside>
      <main className="flex-1">{children}</main>
    </div>
  );
};

export default AdminLayout;
