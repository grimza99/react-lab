// server.mjs (Node ESM)
import express from "express";
import React from "react";
import { renderToString } from "react-dom/server";
import App from "./app.js";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

app.use("/server", express.static(__dirname));
app.use("/dist", express.static(path.join(__dirname, "../dist")));

app.get("/*", (req, res) => {
  console.log("request in server.mjs", req);
  const reactApp = renderToString(React.createElement(App));

  return res.send(
    `<html>
      <body>
        <div id="root"> ${reactApp}</div>
           <script type="module" src="/server/clientEvent.js"></script>
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
