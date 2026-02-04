// src/pages/Profile.tsx
import { useState } from "react";
import { useAuth } from "@/features/auth/AuthContext";
import {
  Box,
  Typography,
  Tabs,
  Tab,
  TextField,
  Button,
  Paper,
} from "@mui/material";
import { mockUsers } from "@/mocks/users";

export default function Profile() {
  const { state, updateUserPassword } = useAuth();
  const [selectedTab, setSelectedTab] = useState(0);
  const [newPassword, setNewPassword] = useState("");
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  if (state.status !== "auth" || !state.account) return null;

  const isAdmin = state.account.role === "admin";

  // Визначаємо таби для користувача
  const tabs = isAdmin
    ? ["Персональні дані", "Зміна паролів користувачів"]
    : ["Персональні дані"];

  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  const handleUpdatePassword = async () => {
    if (!selectedUser || !newPassword) return;
    await updateUserPassword(selectedUser, newPassword);
    alert(`Пароль користувача ${selectedUser} оновлено!`);
    setNewPassword("");
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" mb={3}>
        Особистий кабінет: {state.account.id}
      </Typography>

      <Paper sx={{ p: 2 }}>
        <Tabs value={selectedTab} onChange={handleChangeTab}>
          {tabs.map((label, index) => (
            <Tab key={index} label={label} />
          ))}
        </Tabs>

        <Box sx={{ mt: 3 }}>
          {/* Персональні дані */}
          {selectedTab === 0 && (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Typography>Username: {state.account.id}</Typography>
              <Typography>Role: {state.account.role}</Typography>
              <Typography>
                Permissions: {state.account.permissions.join(", ")}
              </Typography>
            </Box>
          )}

          {/* Зміна паролів (тільки для адміна) */}
          {isAdmin && selectedTab === 1 && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                maxWidth: 400,
              }}
            >
              <TextField
                select
                label="Виберіть користувача"
                value={selectedUser ?? ""}
                onChange={(e) => setSelectedUser(e.target.value)}
                SelectProps={{ native: true }}
              >
                {Object.keys(mockUsers)
                  .filter((u) => u !== state.account.id)
                  .map((u) => (
                    <option key={u} value={u}>
                      {u}
                    </option>
                  ))}
              </TextField>

              <TextField
                type="password"
                label="Новий пароль"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />

              <Button variant="contained" onClick={handleUpdatePassword}>
                Оновити пароль
              </Button>
            </Box>
          )}
        </Box>
      </Paper>
    </Box>
  );
}
