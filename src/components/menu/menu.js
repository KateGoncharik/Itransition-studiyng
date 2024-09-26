import { Component } from "../../../component.js";
import { createRegionSelect } from "./region-select.js";

export const createMenu = () => {
  const regionSelect = createRegionSelect();

  const menu = new Component({ tag: "nav", className: "navbar" }, regionSelect);

  return menu;
};
