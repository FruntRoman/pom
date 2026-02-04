import { useState } from "react";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
} from "@mui/material";
import { mockUsers } from "@/mocks/users";
import { useAuth } from "@/features/auth/AuthContext";

export default function UserManagement() {
  const { updateUserPassword } = useAuth();

  const [openPasswordDialog, setOpenPasswordDialog] = useState(false);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);

  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [newPassword, setNewPassword] = useState("");

  const [newUsername, setNewUsername] = useState("");
  const [newUserPassword, setNewUserPassword] = useState("");

  const users = Object.entries(mockUsers);

  /* ===== ЗМІНА ПАРОЛЮ ===== */

  const openChangePassword = (username: string) => {
    setSelectedUser(username);
    setNewPassword("");
    setOpenPasswordDialog(true);
  };

  const handleChangePassword = async () => {
    if (!selectedUser || !newPassword) return;
    await updateUserPassword(selectedUser, newPassword);
    setOpenPasswordDialog(false);
    alert(`Пароль користувача "${selectedUser}" оновлено`);
  };

  /* ===== СТВОРЕННЯ КОРИСТУВАЧА (MOCK) ===== */

  const handleCreateUser = () => {
    if (!newUsername || !newUserPassword) return;

    mockUsers[newUsername] = {
      password: newUserPassword,
      account: {
        id: `acc_${newUsername}`,
        role: "viewer",
        permissions: ["persons.read"],
      },
    };

    setNewUsername("");
    setNewUserPassword("");
    setOpenCreateDialog(false);

    alert(`Користувача "${newUsername}" створено`);
  };

  return (
    <Box>
      <Box mb={2} display="flex" justifyContent="space-between">
        <Typography variant="h6">Користувачі</Typography>
        <Button variant="contained" onClick={() => setOpenCreateDialog(true)}>
          Створити користувача
        </Button>
      </Box>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Username</TableCell>
            <TableCell>Role</TableCell>
            <TableCell align="right">Дії</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {users.map(([username, user]) => (
            <TableRow key={username}>
              <TableCell>{username}</TableCell>
              <TableCell>{user.account.role}</TableCell>
              <TableCell align="right">
                <Button
                  size="small"
                  onClick={() => openChangePassword(username)}
                >
                  Змінити пароль
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* ===== МОДАЛКА ЗМІНИ ПАРОЛЮ ===== */}
      <Dialog
        open={openPasswordDialog}
        onClose={() => setOpenPasswordDialog(false)}
      >
        <DialogTitle>Зміна паролю</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            type="password"
            label="Новий пароль"
            margin="dense"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenPasswordDialog(false)}>
            Скасувати
          </Button>
          <Button variant="contained" onClick={handleChangePassword}>
            Зберегти
          </Button>
        </DialogActions>
      </Dialog>

      {/* ===== МОДАЛКА СТВОРЕННЯ КОРИСТУВАЧА ===== */}
      <Dialog
        open={openCreateDialog}
        onClose={() => setOpenCreateDialog(false)}
      >
        <DialogTitle>Створити користувача</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Username"
            margin="dense"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
          />
          <TextField
            fullWidth
            type="password"
            label="Пароль"
            margin="dense"
            value={newUserPassword}
            onChange={(e) => setNewUserPassword(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCreateDialog(false)}>Скасувати</Button>
          <Button variant="contained" onClick={handleCreateUser}>
            Створити
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
