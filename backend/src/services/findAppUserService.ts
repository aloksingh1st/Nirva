import { db } from "../config/db";

export const findAppUser = async (secretKey: string): Promise<string> => {
  const app = await db.app.findUniqueOrThrow({
    where: {
      secretKey: secretKey,
    },
  });

  return app.id;
};
