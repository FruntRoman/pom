export type Role = "admin" | "operator" | "viewer";

export type Account = {
  id: string;
  role: Role;
  permissions: string[];
};
