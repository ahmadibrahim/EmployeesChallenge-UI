import type { Metadata } from "next";
import React from "react";

import { StoreProvider } from "./store.provider";
import StyledComponentsRegistry from "../lib/registry";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <html lang="en">
        <body>
          <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
        </body>
      </html>
    </StoreProvider>
  );
}