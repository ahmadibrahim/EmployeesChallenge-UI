"use client";
import React, { useRef, ReactNode } from "react";
import { Provider } from "react-redux";

import { AppStore, store } from "@/redux/store";

interface Props {
  readonly children?: ReactNode;
}

export const StoreProvider: React.FC<Props> = ({ children }) => {
  const storeRef = useRef<AppStore | null>(null);

  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = store;
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
};

export default StoreProvider;
