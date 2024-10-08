import { registerUser } from "@/requests/register-user";
import { FormEvent } from "react";

const Registration = (): JSX.Element => {
  return (
    <>
      <h1>Registration</h1>

      <form onSubmit={handleRegistration}>
        <div>
          <label>
            Name
            <input name="username" type="text" />
          </label>
          <label>
            Password
            <input name="password" type="password" />
          </label>
        </div>

        <button type="submit">Register</button>
      </form>
    </>
  );
};

function handleRegistration(event: FormEvent<HTMLFormElement>): void {
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
  registerUser({ username, email: "aaa@aa.ss", password });
}

export default Registration;
