import "./globals.css";
import { ThemeProvider } from "@/hooks/useTheme";
import QueryClientContextProvider from "@/components/QueryContextContentProvider";

export const metadata = {
  title: "Your App",
  description: "An awesome app with dark mode",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <QueryClientContextProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </QueryClientContextProvider>
      </body>
    </html>
  );
}
