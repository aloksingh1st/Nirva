export const generateSecretKey = (appName: String): string => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const keyLength = 12;

  let randomPart = "";
  for (let i = 0; i < keyLength; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    randomPart += chars[randomIndex];
  }

  const timestamp = Date.now().toString(36); // adds extra uniqueness based on time
  const secretKey = `nv_secret_${timestamp}_${randomPart}`;
  return secretKey;
};
