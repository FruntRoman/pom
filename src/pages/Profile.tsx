import { useState } from "react";
import { useAuth } from "@/features/auth/AuthContext";
import { Box, Typography, Tabs, Tab, Paper } from "@mui/material";
import UserManagement from "@/features/users/UserManagement";

export default function Profile() {
  const { state } = useAuth();
  const [tab, setTab] = useState(0);

  if (state.status !== "auth" || !state.account) return null;

  const isAdmin = state.account.role === "admin";

  const handleChangeTab = (_: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" mb={3}>
        Особистий кабінет
      </Typography>

      <Paper sx={{ p: 2 }}>
        <Tabs value={tab} onChange={handleChangeTab}>
          <Tab label="Персональні дані" />
          {isAdmin && <Tab label="Керування користувачами" />}
        </Tabs>

        <Box sx={{ mt: 3 }}>
          {/* Персональні дані */}
          {tab === 0 && (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Typography>
                <strong>Username:</strong> {state.account.id}
              </Typography>
              <Typography>
                <strong>Role:</strong> {state.account.role}
              </Typography>
              <Typography>
                <strong>Permissions:</strong>{" "}
                {state.account.permissions.join(", ")}
              </Typography>
            </Box>
          )}

          {/* Керування користувачами (тільки адмін) */}
          {isAdmin && tab === 1 && <UserManagement />}
        </Box>
      </Paper>
    </Box>
  );
}
