// src/pages/Dashboard.tsx
import { useAuth } from "@/features/auth/AuthContext";
import { Box, Typography, Button } from "@mui/material";

export default function Dashboard() {
  const { state, logout } = useAuth();

  if (state.status !== "auth" || !state.account) return null;

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" mb={2}>
        Ласкаво просимо в CRM, {state.account.id}!
      </Typography>

      <Typography variant="body1" mb={4}>
        Тут буде основний функціонал системи: список мобілізованих, статистика
        тощо.
      </Typography>

      <Button variant="outlined" color="error" onClick={logout}>
        Вийти
      </Button>
    </Box>
  );
}
