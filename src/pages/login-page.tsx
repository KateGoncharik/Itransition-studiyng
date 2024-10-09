import { loginUser } from "@/requests/login-user";
import { Alert, Button, Snackbar, TextField, Typography } from "@mui/material";
import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";

const Login = (): JSX.Element => {
  const navigate = useNavigate();

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"error" | "success">(
    "error",
  );

  const handleCloseSnackbar = (): void => {
    setOpenSnackbar(false);
  };

  const handleLogin = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const username = formData.get("username");
    const password = formData.get("password");

    if (typeof username !== "string" || typeof password !== "string") {
      setSnackbarMessage("Invalid input");
      setOpenSnackbar(true);
      return;
    }

    loginUser({ username, password })
      .then(() => {
        setSnackbarMessage("Login successful");
        setSnackbarSeverity("success");
        setOpenSnackbar(true);
        setTimeout(() => navigate("/"), 2000);
      })
      .catch((error: unknown) => {
        console.log("Error:", error);
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error";
        setSnackbarMessage(errorMessage);
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
      });
  };

  return (
    <>
      <Typography component="h1" mb={4} mt={7} textAlign="center" variant="h2">
        Login
      </Typography>
      <form onSubmit={handleLogin}>
        <TextField
          autoComplete={"email"}
          label={"email"}
          placeholder={"email"}
          required
          size="small"
          name="username"
        />
        <TextField
          autoComplete={"password"}
          label={"password"}
          placeholder={"password"}
          required
          size="small"
          name="password"
        />

        <Button disabled={false} size="large" type="submit" variant="contained">
          Login
        </Button>
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
    </>
  );
};

export default Login;
