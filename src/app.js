import { Component } from "../component.js";

export const app = new Component(
  {},
  new Component(
    { className: "wrapper", text: "Main" },
    new Component({ className: "table-container" })
  )
);
