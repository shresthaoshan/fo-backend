import express from "express";
import "express-async-errors";
import errorsHandler from "./middlewares/errors.js";

import router from "./routes/index.js";

const app = express();

// plugins
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: false }));

// health
app.get("/", (_, res) => {
	res.json({ check: true });
});

// app entries
app.use("/api", router);

// exception handling
app.use(errorsHandler);

app.listen(8000, () => {
	console.log("Server listening...");
});
