// server.mjs (Node ESM)
import express from "express";
import React from "react";
import { renderToString } from "react-dom/server";
import App from "./app.js";

const app = express();
app.use("/dist", express.static("../dist"));

app.get("/*", (req, res) => {
  console.log("request in server.mjs", req);
  const reactApp = renderToString(React.createElement(App));

  return res.send(
    `<html>
      <body>
        <div id="root"> ${reactApp}</div>
            <div id="myapp"></div>
   <script type="module" src="/dist/main.js"></script>

      </body>
    </html>
    `
  );
});
app.listen(3000, () => {
  console.log("server is running");
});
