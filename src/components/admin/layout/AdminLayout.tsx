"use client";

import React from "react";
import { LayoutDashboard, Package, FileText, Users, Settings, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface MenuItem {
  icon: React.ForwardRefExoticComponent<
    Omit<React.SVGProps<SVGSVGElement>, "ref"> & {
      title?: string | undefined;
      titleId?: string | undefined;
    } & React.RefAttributes<SVGSVGElement>
  >;
  label: string;
  href: string;
}

const menuItems: MenuItem[] = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
  { icon: Package, label: "Products", href: "/admin/products" },
  { icon: FileText, label: "Blog Posts", href: "/admin/posts" },
  { icon: Users, label: "Users", href: "/admin/users" },
  { icon: Settings, label: "Settings", href: "/admin/settings" },
];

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = React.useState(false);
  const pathname = usePathname(); // helps highlight active link if you want

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside
        className={`
          ${isSidebarCollapsed ? "w-16" : "w-64"}
          transition-all duration-300 
          bg-white border-r border-slate-200
          fixed h-full
        `}
      >
        <div className="p-4 flex items-center justify-between border-b border-slate-200">
          {!isSidebarCollapsed && (
            <h1 className="text-lg font-bold text-slate-800">Admin Panel</h1>
          )}
          <button
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="p-1 rounded hover:bg-slate-100 text-slate-600"
          >
            {isSidebarCollapsed ? "\u2192" : "\u2190"}
          </button>
        </div>

        <nav className="mt-6">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`
                  flex items-center px-4 py-3 
                  text-slate-600 hover:bg-slate-100 
                  border-l-4 transition-colors
                  ${isActive ? "border-blue-600 bg-blue-50" : "border-transparent"}
                `}
              >
                <item.icon className="w-5 h-5 shrink-0" />
                {!isSidebarCollapsed && (
                  <span className="ml-3 font-medium">{item.label}</span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 w-full border-t border-slate-200">
          <Link
            href="/logout"
            className="
              flex items-center px-4 py-3 
              text-slate-600 hover:bg-slate-100 
              transition-colors
            "
          >
            <LogOut className="w-5 h-5 shrink-0" />
            {!isSidebarCollapsed && (
              <span className="ml-3 font-medium">Logout</span>
            )}
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`flex-1 ${isSidebarCollapsed ? "ml-16" : "ml-64"}`}>
        {/* Top Navigation */}
        <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
          <div className="px-6 py-4">
            <h2 className="text-xl font-bold text-slate-800">Admin Dashboard</h2>
          </div>
        </header>

        {/* Content Area */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;