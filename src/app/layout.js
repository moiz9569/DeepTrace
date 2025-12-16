import "./globals.css";
import NavbarWrapper from "@/components/NavbarWrapper";
import { AuthProvider } from "@/components/auth/AuthProvider";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <NavbarWrapper>
            {children}
          </NavbarWrapper>
        </AuthProvider>
      </body>
    </html>
  );
}



// import { Inter } from "next/font/google"
// import "./globals.css"
// import Navigation from "@/components/navigation"

// const inter = Inter({ subsets: ["latin"] })

// export const metadata = {
//   title: "Truth Seeker - AI-Powered Content Analysis",
//   description:
//     "Advanced AI models for video, image, and text analysis. Detect deepfakes, manipulations, and misinformation with cutting-edge machine learning technology.",
//     generator: 'v0.dev'
// }

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body className={inter.className}>
//         <Navigation />
//         <main>{children}</main>
//       </body>
//     </html>
//   )
// }
