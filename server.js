import config from "./config.js";
import React from "react";
import { renderToString } from "react-dom/server";
import { renderStylesToString } from "emotion-server";
import App from "./src/components/App";
import express from "express";
const server = express();

server.get("/", (req, res) => {
  const Html = renderStylesToString(renderToString(<App data={[]} />));
  res.send(`
    <!DocType html>
    <html>
      <head>
        <title>2048</title>
        <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, height=device-height, viewport-fit=cover"
      />
      <link href="https://fonts.googleapis.com/css?family=Lato&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Marck+Script|Montserrat:600&display=swap" rel="stylesheet">
      </head>
      <body>
      <div id="root">${Html}</div>
      <script src="/bundle.js"></script>
      </body>
    </html>
  `);
});
server.use(express.static("public"));
server.listen(config.port, () => {
  console.log("Server listening on Port", config.port);
});
