import "./globals.css";
import NavbarWrapper from "@/components/NavbarWrapper";
import { AuthProvider } from "@/components/auth/AuthProvider";
import LoaderWrapper from "@/components/Loader/wrapper";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <LoaderWrapper>
            <NavbarWrapper>{children}</NavbarWrapper>
          </LoaderWrapper>
        </AuthProvider>
      </body>
    </html>
  );
}
