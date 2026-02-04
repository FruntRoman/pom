// src/pages/Login.tsx
import { useState } from "react";
import { useAuth } from "@/features/auth/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  useTheme,
} from "@mui/material";

const randomImage = `https://picsum.photos/seed/${Math.floor(
  Math.random() * 1000
)}/400/150`;

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(username, password);
      navigate("/dashboard");
    } catch {
      setError("Невірний логін або пароль");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      disableGutters
      maxWidth={false} // відключає обмеження ширини
      sx={{
        width: "100%",
        height: "100%", // займає весь #root
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        px: 2, // відступи з боків на мобільних
        bgcolor: theme.palette.background.default,
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 400, // максимум ширини форми на десктопі
          p: { xs: 3, sm: 4 }, // адаптивний padding
          boxShadow: 3,
          borderRadius: 2,
          bgcolor: "background.paper",
        }}
      >
        <Box
          component="img"
          src={randomImage}
          alt="Random"
          sx={{
            width: "100%",
            height: 150,
            objectFit: "cover",
            borderRadius: 1,
            mb: 3,
          }}
        />
        <Typography variant="h4" mb={3} textAlign="center">
          Login
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            disabled={loading}
          >
            {loading ? "Loading..." : "Login"}
          </Button>
        </Box>

        <Box mt={2} textAlign="center">
          <Typography color="black" variant="caption">
            Моки для тесту: admin/admin123, operator/operator123,
            viewer/viewer123
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}
