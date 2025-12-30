import "./globals.css";
import NavbarWrapper from "@/components/NavbarWrapper";
import { AuthProvider } from "@/components/auth/AuthProvider";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <NavbarWrapper>{children}</NavbarWrapper>
        </AuthProvider>
      </body>
    </html>
  );
}
