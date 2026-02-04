import { mockUsers } from "./users";

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const mockAuthService = {
  login: async (username: string, password: string) => {
    await delay(500);
    const user = mockUsers[username];
    if (!user || user.password !== password) {
      throw new Error("INVALID_CREDENTIALS");
    }
    return {
      accessToken: "mock-access-token",
      expiresIn: 900,
      account: user.account,
    };
  },

  logout: async () => {
    await delay(200);
  },
};
