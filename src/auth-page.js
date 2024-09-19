import { Component } from "../component.js";
import { loginForm } from "./auth/login-form.js";

export const authPage = new Component({ className: "auth-page" }, loginForm);
