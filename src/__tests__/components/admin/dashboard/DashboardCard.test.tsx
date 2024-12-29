// src/__tests__/components/admin/dashboard/DashboardCard.test.tsx
import { render, screen } from '@testing-library/react';
import DashboardCard from '@/components/admin/dashboard/DashboardCard';
import { Package } from 'lucide-react';

describe('DashboardCard', () => {
  it('renders with title and value', () => {
    render(
      <DashboardCard
        title="Test Card"
        value={42}
        icon={Package}
      />
    );

    expect(screen.getByText('Test Card')).toBeInTheDocument();
    expect(screen.getByText('42')).toBeInTheDocument();
  });

  it('applies blue background for Products', () => {
    const { container } = render(
      <DashboardCard
        title="Products"
        value={10}
        icon={Package}
      />
    );
    
    const iconContainer = container.querySelector('div[class*="bg-blue"]');
    expect(iconContainer).toBeInTheDocument();
  });

  it('applies purple background for Blog Posts', () => {
    const { container } = render(
      <DashboardCard
        title="Blog Posts"
        value={5}
        icon={Package}
      />
    );
    
    const iconContainer = container.querySelector('div[class*="bg-purple"]');
    expect(iconContainer).toBeInTheDocument();
  });

  it('applies green background for Users', () => {
    const { container } = render(
      <DashboardCard
        title="Active Users"
        value={3}
        icon={Package}
      />
    );
    
    const iconContainer = container.querySelector('div[class*="bg-green"]');
    expect(iconContainer).toBeInTheDocument();
  });
});