import type { Account } from "@/types/auth";

export const mockUsers: Record<string, { password: string; account: Account }>= {
   admin: {
    password: "admin123",
    account: {
      id: "acc_admin",
      role: "admin",
      permissions: ["*"],
    },
  },
  operator: {
    password: "operator123",
    account: {
      id: "acc_operator",
      role: "operator",
      permissions: ["persons.read", "persons.create", "persons.update"],
    },
  },
  viewer: {
    password: "viewer123",
    account: {
      id: "acc_viewer",
      role: "viewer",
      permissions: ["persons.read"],
    },
  },
};
