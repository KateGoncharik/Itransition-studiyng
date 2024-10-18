import { useAuth } from "@/hooks/use-auth";
import { loginUser } from "@/requests/login-user";
import { registerUser } from "@/requests/register-user";
import {
  Alert,
  Button,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";

const Registration = (): JSX.Element => {
  const { login } = useAuth();

  const navigate = useNavigate();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"error" | "success">(
    "error",
  );

  const handleCloseSnackbar = (): void => {
    setOpenSnackbar(false);
  };

  const handleRegistration = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const username = formData.get("username");
    const email = formData.get("email");

    const password = formData.get("password");

    if (
      typeof username !== "string" ||
      typeof password !== "string" ||
      typeof email !== "string"
    ) {
      setSnackbarMessage("Invalid input");
      setOpenSnackbar(true);
      return;
    }

    registerUser({ username, email, password })
      .then(() => {
        setSnackbarMessage("Successfully registered");
        setSnackbarSeverity("success");
        setOpenSnackbar(true);
        void loginUser({ username, password }).then(() => {
          login();
          setTimeout(() => navigate("/"), 1000);
        });
      })
      .catch((error: unknown) => {
        console.error("Error:", error);
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error";
        setSnackbarMessage(errorMessage);
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
      });
  };
  return (
    <Stack sx={{ width: "50%", margin: "0 auto", gap: 2 }}>
      <Typography component="h1" mb={4} mt={7} textAlign="center" variant="h2">
        Registration
      </Typography>

      <form onSubmit={handleRegistration}>
        <Stack sx={{ gap: 1 }}>
          <TextField
            autoComplete={"name"}
            label={"name"}
            placeholder={"name"}
            required
            size="small"
            name="username"
          />
          <TextField
            autoComplete={"email"}
            label={"email"}
            placeholder={"email"}
            required
            size="small"
            name="email"
          />

          <TextField
            autoComplete={"password"}
            label={"password"}
            placeholder={"password"}
            required
            size="small"
            name="password"
          />
          <Button
            disabled={false}
            size="large"
            type="submit"
            variant="contained"
          >
            Register
          </Button>
        </Stack>
      </form>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Stack>
  );
};

export default Registration;
