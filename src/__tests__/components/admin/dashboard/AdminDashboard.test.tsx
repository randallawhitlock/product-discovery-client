// src/__tests__/components/admin/posts/AdminBlogPostsPage.test.tsx
import { render, screen, within } from '@testing-library/react';
import { vi, describe, expect, it, beforeEach } from 'vitest';
import AdminBlogPostsPage from '@/app/admin/posts/page';
import { useBlogPosts } from '@/hooks/useBlogPosts';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { formatDate } from '@/utils/formatDate';

// Mock the custom hooks
vi.mock('@/hooks/useBlogPosts', () => ({
  useBlogPosts: vi.fn()
}));

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn(),
  })),
  usePathname: vi.fn(() => '/admin/posts'),
}));

const mockPosts = {
  posts: [
    {
      _id: '1',
      title: 'Test Post 1',
      status: 'published',
      createdAt: '2024-01-01T00:00:00.000Z',
      author: {
        profile: {
          avatar: 'test-avatar.jpg'
        }
      }
    },
    {
      _id: '2',
      title: 'Test Post 2',
      status: 'draft',
      createdAt: '2024-01-02T00:00:00.000Z',
      author: {
        profile: {
          avatar: 'test-avatar.jpg'
        }
      }
    },
  ],
  pagination: {
    current: 1,
    total: 1,
    count: 2,
  },
};

// Create a wrapper with QueryClientProvider
const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('AdminBlogPostsPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (useBlogPosts as any).mockReturnValue({
      data: mockPosts,
      isLoading: false,
      error: null,
    });
  });

  it('renders blog posts table', async () => {
    render(<AdminBlogPostsPage />, { wrapper: createWrapper() });

    expect(screen.getByText('Test Post 1')).toBeInTheDocument();
    expect(screen.getByText('Test Post 2')).toBeInTheDocument();
  });

  it('displays loading state', () => {
    (useBlogPosts as any).mockReturnValue({
      isLoading: true,
      data: null,
    });

    render(<AdminBlogPostsPage />, { wrapper: createWrapper() });
    expect(screen.getByText(/loading blog posts/i)).toBeInTheDocument();
  });


  it('formats dates correctly', async () => {
    const { container } = render(<AdminBlogPostsPage />, { wrapper: createWrapper() });
    
    // Get all table cells
    const cells = container.querySelectorAll('td');
    const dateTexts = Array.from(cells).map(cell => cell.textContent);
    
    // Find cells that contain our formatted dates
    const date1 = formatDate(mockPosts.posts[0].createdAt);
    const date2 = formatDate(mockPosts.posts[1].createdAt);
    
    expect(dateTexts.some(text => text?.includes(date1))).toBe(true);
    expect(dateTexts.some(text => text?.includes(date2))).toBe(true);
  });

  it('links to edit pages', async () => {
    render(<AdminBlogPostsPage />, { wrapper: createWrapper() });
    
    const editLinks = screen.getAllByRole('link', { name: /edit/i });
    expect(editLinks[0]).toHaveAttribute('href', expect.stringContaining('/edit'));
    expect(editLinks).toHaveLength(2);
  });

  it('has a working "Add New Post" button', () => {
    render(<AdminBlogPostsPage />, { wrapper: createWrapper() });

    const addButton = screen.getByRole('link', { name: /add new post/i });
    expect(addButton).toBeInTheDocument();
    expect(addButton).toHaveAttribute('href', '/admin/posts/new');
  });
});