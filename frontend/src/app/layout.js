'use client'

import StoreProvider from "@/store/provider";

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
