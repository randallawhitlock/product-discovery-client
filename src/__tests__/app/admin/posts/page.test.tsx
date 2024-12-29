// src/__tests__/app/admin/posts/page.test.tsx
import { render, screen } from '@testing-library/react';
import AdminBlogPostsPage from '@/app/admin/posts/page';
import { useBlogPosts } from '@/hooks/useBlogPosts';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { formatDate } from '@/utils/formatDate';

// Mock the hooks
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

// Create mock data using UTC dates
const mockPosts = {
  posts: [
    {
      _id: '1',
      title: 'Test Post 1',
      status: 'published',
      createdAt: new Date(Date.UTC(2024, 0, 1)).toISOString(),
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
      createdAt: new Date(Date.UTC(2024, 0, 2)).toISOString(),
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
    expect(screen.getByText('Loading blog posts...')).toBeInTheDocument();
  });

  it ('displays error state', async () => {
    const mockError = new Error('Test error message');
    (useBlogPosts as jest.Mock).mockReturnValue({
      isLoading: false,
      isError: true,
      error: mockError
    });

    render(<AdminBlogPostsPage />);


    
    // Look for error message parts separately
    expect(screen.getByTestId('error-message')).toBeInTheDocument();
  });

  it('formats dates correctly', async () => {
    const { container } = render(<AdminBlogPostsPage />, { wrapper: createWrapper() });
    
    // Format the expected dates
    const expectedDate1 = formatDate(mockPosts.posts[0].createdAt);
    const expectedDate2 = formatDate(mockPosts.posts[1].createdAt);
    
    // Get all cells that might contain our dates
    const cells = container.querySelectorAll('td');
    const dateTexts = Array.from(cells).map(cell => cell.textContent);
    
    // Check if both dates are present
    expect(dateTexts.some(text => text?.includes(expectedDate1))).toBe(true);
    expect(dateTexts.some(text => text?.includes(expectedDate2))).toBe(true);
  });

  it('links to edit pages', async () => {
    render(<AdminBlogPostsPage />, { wrapper: createWrapper() });
    
    const editLinks = screen.getAllByRole('link', { name: /edit/i });
    expect(editLinks[0]).toHaveAttribute('href', '/admin/posts/1/edit');
    expect(editLinks[1]).toHaveAttribute('href', '/admin/posts/2/edit');
  });

  it('has a working "Add New Post" button', () => {
    render(<AdminBlogPostsPage />, { wrapper: createWrapper() });

    const addButton = screen.getByRole('link', { name: /add new post/i });
    expect(addButton).toBeInTheDocument();
    expect(addButton).toHaveAttribute('href', '/admin/posts/new');
  });
});