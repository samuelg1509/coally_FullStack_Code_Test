'use client'

import StoreProvider from "@/store/provider";
import "./globals.css";
import store from "@/store/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

export default function RootLayout({ children }) {
  const persistor = persistStore(store);
  return (
    <html lang="en">
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
