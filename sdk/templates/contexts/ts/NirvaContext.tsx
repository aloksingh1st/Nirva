import React, { createContext, useContext } from "react";

const NirvaContext = createContext<{ apiKey: string | null }>({
  apiKey: null,
});

// 2️⃣ Provider component
export const NirvaProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Pull from environment (Vite or Node)
  const apiKey =
    import.meta.env.NV_SECRET_KEY || process.env.NV_SECRET_KEY || null;

  if (!apiKey) {
    console.warn("⚠️ Entrix SDK: Missing Nirva Secret Key in environment.");
  }

  return (
    <NirvaContext.Provider value={{ apiKey }}>{children}</NirvaContext.Provider>
  );
};

export const useEntrixKey = () => {
  const ctx = useContext(NirvaContext);
  if (!ctx) {
    throw new Error("useEntrixKey must be used within <NirvaProvider>");
  }
  return ctx.apiKey;
};
