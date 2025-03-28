import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/header/header";
import Sidenav from "@/components/sidebar/sidenav";
import ReduxProvider from "@/lib/redux-provider";
// import ThemeSwitch from "@/components/theme-switch";
import ThemeContextProvider from "@/context/theme-context";
import { Toaster } from "react-hot-toast";
import AuthProvider from "@/context/AuthProvider";
import Footer from "@/components/footer/footer";
import CartModal from "@/components/sidebar/cart-modal";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Trend Partner BD | Buy Stylish and Comfortable Footwear Online – Best Prices & Fast Delivery",
  description: "Discover a wide range of stylish and comfortable footwear for at the best prices with fast delivery.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReduxProvider>
      <html lang="en" className="!scroll-smooth" suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 text-gray-950 dark:bg-gray-900 dark:text-gray-50/90`}
        >
          <ThemeContextProvider>
            <AuthProvider>
              <div className="pb-28">
                <Header/>
              </div>
              <Sidenav/>
              <CartModal/>
              {children}
              <Footer/>
              {/* <ThemeSwitch/> */}
              <Toaster
                position="top-right"
                reverseOrder={false}
              />
            </AuthProvider>
          </ThemeContextProvider>
        </body>
      </html>
    </ReduxProvider>
  );
}
