import './globals.css';
import { ThemeProvider } from '@/hooks/useTheme';
import QueryClientContextProvider from '@/components/QueryContextContentProvider';

export const metadata = {
  title: 'Product Discovery App',
  description: 'Discover amazing products',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning={true}> {/* Add suppressHydrationWarning if needed */}
      <head>
        {/* Add any global head elements here, like meta tags */}
      </head>
      <body>
        <QueryClientContextProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem> {/* Configure ThemeProvider */}
            {children}
          </ThemeProvider>
        </QueryClientContextProvider>
      </body>
    </html>
  );
}