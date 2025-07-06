import { db } from "../config/db";

interface OAuthProfile {
  id: String;
  displayName: String;
  emails?: { value: string; verified?: boolean }[];
  provider: String;
}

export const findOrCreateUser = async (
  profile: OAuthProfile,
  provider: String
) => {
  const email = profile.emails?.[0]?.value;

  let user = await db.user.findUnique({
    where: { oauthId: profile.id },
  });

  if (!user) {
    user = await db.user.create({
      data: {
        name: profile.displayName,
        email: email,
        oauthId: profile.id,
        provider: provider,
      },
    });
  }

  return user;
};
