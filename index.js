require("dotenv").config();

const cookieParser = require("cookie-parser");
const express = require("express");
const morgan = require("morgan");
const init = require("./db/init");
const app = express();
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => await init());

app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("./client/build"));
app.use(cookieParser());

app.use("/api", require("./api/routes"));

app.use(require("./mw/error").errorHandler);
app.use(require("./mw/error").routeNotFound);
