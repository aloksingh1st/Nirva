
export const NirvaProvider = () => {
  // Read from environment (Vite or Node)
  const apiKey = "somehgin";

  if (!apiKey) {
    console.warn("⚠️ Entrix SDK: Missing Nirva Secret Key in environment.");
  }

  return apiKey;
};

export const useEntrixKey = (apiKey : string) => {
  return apiKey;
};
