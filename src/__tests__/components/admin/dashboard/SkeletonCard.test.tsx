// src/__tests__/components/admin/dashboard/SkeletonCard.test.tsx
import { render } from '@testing-library/react';
import SkeletonCard from '@/components/admin/dashboard/SkeletonCard';

describe('SkeletonCard', () => {
  it('renders skeleton loader', () => {
    const { container } = render(<SkeletonCard />);
    expect(container.firstChild).toHaveClass(
      'bg-white',
      'dark:bg-gray-800',
      'border',
      'border-slate-200',
      'dark:border-gray-700',
      'rounded-lg',
      'p-6',
      'shadow-md'
    );
  });

  it('includes ContentLoader component', () => {
    const { container } = render(<SkeletonCard />);
    const contentLoader = container.querySelector('svg');
    expect(contentLoader).toBeInTheDocument();
  });
});