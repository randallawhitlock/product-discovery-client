// src/__tests__/setup.ts
import '@testing-library/jest-dom'
import { afterEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'
import { configure } from '@testing-library/react';

// Extend expect matchers
import '@testing-library/jest-dom'



// Automatically cleanup after each test
afterEach(() => {
    cleanup()
})

// only get react element
configure({
    getElementError: (message: string | null, container: Element) => {
      const error = new Error(message || 'Element not found');
      error.name = 'TestingLibraryElementError';
      return error;
    }
  });

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  })),
  usePathname: vi.fn(() => '/admin/posts'),
  useParams: vi.fn(() => ({})),
  useSearchParams: vi.fn(() => ({
    get: vi.fn(),
  })),
}))

// Mock react-toastify
vi.mock('react-toastify', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}))