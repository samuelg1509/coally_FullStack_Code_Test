'use client'

import StoreProvider from "@/store/provider";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
     <StoreProvider>
        <body>
          {children}
        </body>
      </StoreProvider>
    </html>
  );
}
