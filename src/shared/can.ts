// src/shared/can.ts
import { Account } from "@/types/auth";

export const can = (account: Account, permission: string) =>
  account.permissions.includes("*") ||
  account.permissions.includes(permission);
