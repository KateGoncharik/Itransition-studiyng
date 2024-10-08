import { loginUser } from "@/requests/login-user";
import { FormEvent } from "react";

const Login = (): JSX.Element => {
  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <label>
          Name
          <input name="username" type="text" />
        </label>
        <label>
          Password
          <input name="password" type="password" />
        </label>

        <button type="submit">Login</button>
      </form>
    </>
  );
};

function handleLogin(event: FormEvent<HTMLFormElement>): void {
  event.preventDefault();
  if (!event.target) {
    throw new Error("Target expected");
  }
  const formData = new FormData(event.currentTarget);
  const username = formData.get("username");
  const password = formData.get("password");
  if (typeof username !== "string" || typeof password !== "string") {
    return;
  }
  loginUser({ username, password });
}

export default Login;
