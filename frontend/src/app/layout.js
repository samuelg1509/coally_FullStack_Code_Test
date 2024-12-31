'use client'

import StoreProvider from "@/store/provider";
import "./globals.css";
import store from "@/store/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { SamLogo } from "@/assets/logo";


export default function RootLayout({ children }) {
  const persistor = persistStore(store);
  return (
    <html lang="en">
      <head>
      <link rel="icon" type="image/svg+xml" href='./Logo.png' />
        <title>Samuel Flores - Code Test</title>
      </head>
      <body>
        <StoreProvider>
          <PersistGate persistor={persistor}>
              {children}
          </PersistGate>
        </StoreProvider>
      </body>
    </html>
  );
}
