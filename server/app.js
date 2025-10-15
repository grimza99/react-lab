import React from "react";

export default function App() {
  return React.createElement(
    "div",
    null,
    React.createElement("h1", null, `이 글과 아래 버튼은 서버에서 보내줌`),
    React.createElement(
      "button",
      {
        "data-hydrate-event": "click",
      },
      `하이드레이션이 필요한 버튼`
    )
  );
}
