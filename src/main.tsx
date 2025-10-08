import { App } from "./app.js";
import React from "./core/react.js";
import { render } from "./core/render.js";

// 어플리케이션 렌더링 entry point
render(<App />, document.getElementById("myapp"));
