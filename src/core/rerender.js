import { render } from "./render.js";
import React from "./react.js";
import { App } from "../app.js";

export const reRender = () => {
  const rootNode = document.getElementById("myapp");
  rootNode.innerHTML = "";
  render(<App />, rootNode);
};
