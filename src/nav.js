import { Component } from "../component.js";

const buttonsData = [
  { text: "login", className: "login-button" },
  { text: "logout", className: "logout-button" },
];

const createNavButtons = () => {
  return buttonsData.map((buttonData) => {
    return new Component({
      tag: "button",
      className: "nav-button",
      text: buttonData.text,
    });
  });
};

export const nav = new Component(
  {
    tag: "nav",
    className: "navigation container-fluid",
  },
  new Component({ tag: "h3", text: "Hello!" }),
  ...createNavButtons()
);
