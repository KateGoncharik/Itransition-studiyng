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
import { useState, FormEvent, Dispatch, SetStateAction } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useRedirectWithDelay } from "@/hooks/use-redirect-with-delay";

const validateUserPassword = (
  password: string | null,
  setSnackbarMessage: Dispatch<SetStateAction<string>>,
  setOpenSnackbar: Dispatch<SetStateAction<boolean>>,
): boolean => {
  if (password === null) {
    setSnackbarMessage("Password should be present");
    setOpenSnackbar(true);
    return false;
  }
  if (password.length < 6) {
    setSnackbarMessage("Password should be at least 6 chars long");
    setOpenSnackbar(true);
    return false;
  }
  if (password.length > 20) {
    setSnackbarMessage("Password should be at not longer than 20 chars");
    setOpenSnackbar(true);
    return false;
  }
  return true;
};

const Registration = (): JSX.Element => {
  const { login } = useAuth();

  const redirect = useRedirectWithDelay();
  const [passwordInputType, setPasswordInputType] = useState("password");

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"error" | "success">(
    "error",
  );

  const handleCloseSnackbar = (): void => {
    setOpenSnackbar(false);
  };

  const togglePasswordInputType = (): void => {
    if (passwordInputType === "password") {
      setPasswordInputType("text");
    }
    if (passwordInputType === "text") {
      setPasswordInputType("password");
    }
  };

  const handleSuccessfulRegistration = (
    setSnackbarMessage: Dispatch<SetStateAction<string>>,
    setOpenSnackbar: Dispatch<SetStateAction<boolean>>,
    setSnackbarSeverity: (value: SetStateAction<"error" | "success">) => void,
  ): void => {
    setSnackbarMessage("Successfully registered");
    setSnackbarSeverity("success");
    setOpenSnackbar(true);
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
      return;
    }
    const isRegistrationDataValid = validateUserPassword(
      password,
      setSnackbarMessage,
      setOpenSnackbar,
    );

    if (!isRegistrationDataValid) {
      return;
    }
    registerUser({ username, email, password })
      .then(() => {
        handleSuccessfulRegistration(
          setSnackbarMessage,
          setOpenSnackbar,
          setSnackbarSeverity,
        );
        void loginUser({ username, password }).then(() => {
          login();
          redirect("/", 1000);
        });
      })
      .catch((error: unknown) => {
        console.error("Error:", error);
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error";
        // handleRegistrationError
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
            type="text"
            size="small"
            name="username"
          />
          <TextField
            autoComplete={"email"}
            label={"email"}
            placeholder={"email"}
            required
            type="email"
            size="small"
            name="email"
          />
          <Stack
            sx={{
              justifyContent: "space-between",
              border: "1px solid #43465a",
              borderRadius: "4px",
              flexDirection: "row",
            }}
          >
            <TextField
              autoComplete={"password"}
              label={"password"}
              placeholder={"password"}
              required
              type={passwordInputType}
              fullWidth={true}
              size="small"
              name="password"
            />
            <Button onClick={() => togglePasswordInputType()}>
              {passwordInputType === "password" ? (
                <VisibilityIcon />
              ) : (
                <VisibilityOffIcon />
              )}
            </Button>
          </Stack>

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
