'use client';

import React from 'react';
import {
  LayoutDashboard,
  Package,
  FileText,
  Users,
  Settings,
  LogOut,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import  useAuth  from '@/hooks/useAuthToken';
import ThemeToggleButton from '@/components/ui/ThemeToggleButton';

interface MenuItem {
  icon: React.ForwardRefExoticComponent<
    Omit<React.SVGProps<SVGSVGElement>, 'ref'> & {
      title?: string | undefined;
      titleId?: string | undefined;
    } & React.RefAttributes<SVGSVGElement>
  >;
  label: string;
  href: string;
}

const menuItems: MenuItem[] = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/admin' },
  { icon: Package, label: 'Products', href: '/admin/products' },
  { icon: FileText, label: 'Blog Posts', href: '/admin/posts' },
  { icon: Users, label: 'Users', href: '/admin/users' },
  { icon: Settings, label: 'Settings', href: '/admin/settings' },
];

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = React.useState(false);
  const pathname = usePathname();
  const { clearAuth } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    clearAuth();
    router.push('/login');
  };

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      {/* Sidebar */}
      <aside
        className={`
          ${isSidebarCollapsed ? 'w-16' : 'w-64'}
          transition-all duration-300
          bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700
          fixed h-full z-20
        `}
      >
        <div className="p-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-700">
          {!isSidebarCollapsed && (
            <h1 className="text-lg font-bold">Admin Panel</h1>
          )}
          <button
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400"
          >
            {isSidebarCollapsed ? '\u2192' : '\u2190'}
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
                  text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700
                  border-l-4 transition-colors
                  ${
                    isActive
                      ? 'border-blue-600 bg-blue-50 dark:bg-blue-900'
                      : 'border-transparent'
                  }
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

        <div className="absolute bottom-0 w-full border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={handleLogout}
            className="
              flex items-center px-4 py-3
              text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700
              transition-colors w-full text-left
            "
          >
            <LogOut className="w-5 h-5 shrink-0" />
            {!isSidebarCollapsed && (
              <span className="ml-3 font-medium">Logout</span>
            )}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`flex-1 ${isSidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        {/* Top Navigation */}
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
          <div className="px-6 py-4 flex justify-between items-center">
            <h2 className="text-xl font-bold">Admin Dashboard</h2>
            <ThemeToggleButton />
          </div>
        </header>

        {/* Content Area */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;