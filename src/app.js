import { Component } from "../component.js";

export const app = new Component(
  {},
  new Component({ className: "wrapper", text: "Main" })
);
