import React, { useEffect, useState } from "react";
import { getMe } from "./sdk";

export const UserInfo = () => {
  const [user, setUser] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const u = await getMe();
        setUser(u);
      } catch (e: any) {
        setError(e.message);
      }
    })();
  }, []);

  if (error) return <div>{error}</div>;
  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <p>Welcome, {user.name || user.email}</p>
      {user.avatar && (
        <img
          src={user.avatar}
          alt="avatar"
          className="w-12 h-12 rounded-full"
        />
      )}
    </div>
  );
};
