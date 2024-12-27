import AdminDashboard from '@/components/admin/dashboard/AdminDashboard';
import AdminLayout from '@/app/admin/layout';

export default function AdminRoute() {
  return (
    <AdminLayout>
      <AdminDashboard />
    </AdminLayout>
  );
}