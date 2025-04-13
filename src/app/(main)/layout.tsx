import { PageWrapper } from "@/components/page-wrapper";
import { ThemeProvider } from "@/components/theme-provider"

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <PageWrapper>{children}</PageWrapper>
    </ThemeProvider>
  )
}