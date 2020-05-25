import express from "express";
import path from "path";
import bodyParser from "body-parser";
import compression from "compression";
import morgan from "morgan";
import Loadable from "react-loadable";
import cookieParser from "cookie-parser";

import loader from "./loader";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(cookieParser());
app.use((req, res, next) => {
  res.set({
    "X-XSS-Protection": "1; mode=block",
    "X-Content-Type-Options": "nosniff",
    "Content-Security-Policy": "script-src 'self' assets.7mmedia.online data:",
    "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
  });
  next();
});

app.use(express.Router().get("/", loader));
app.use(express.static(path.resolve(__dirname, "../build")));
app.use(loader);

Loadable.preloadAll().then(() => {
  app.listen(PORT, console.log(`App listening on port ${PORT}!`));
});

app.on("error", (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof PORT === "string" ? "Pipe " + PORT : "Port " + PORT;

  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
});
