import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Agentation } from "agentation";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { ThemeSwitcher } from "@/components/theme/theme-switcher";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Happenstance — Make Your Own Luck",
  description:
    "Turn your network into your unfair advantage. AI-powered people search, team collaboration, and developer tools.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark`}
      suppressHydrationWarning
    >
      <body className="noise-overlay min-h-screen">
        <ThemeProvider>
          <ThemeSwitcher />
          {children}
        </ThemeProvider>
        {process.env.NODE_ENV === "development" && <Agentation />}
      </body>
    </html>
  );
}
