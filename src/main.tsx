import { App } from "./app.js";
import React from "./core/react.js";
import { render } from "./core/render.js";

// 어플리케이션 렌더링 entry point
render(<App />, document.getElementById("myapp"));
(async () => {
  // @ts-ignore
  const { handleClickInClient } = await import("/server/clientEvent.js");

  const elements = document.querySelectorAll("[data-hydrate-event]");

  elements.forEach((el) => {
    const event = el.getAttribute("data-hydrate-event");

    if (!handleClickInClient) return;
    el.addEventListener(event, handleClickInClient);
  });
})();
