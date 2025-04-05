import { connectDB } from "./database/init.js";
import express from "express";
import cors from "cors";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";

// scripteihin (package.json) voidaan tehä myös nodemon, + typescript.

const app = express();
const port = 5000;

connectDB();

// All of our inputs should be sanitized.
app.use("/", cors()); // tällä hetkellä auki jokaselle. Ei hyvä! Kts. Express cors.
app.use("/", express.json()); // liittyy siihen, että req.body ei oo undefined. Ja content-type
app.use("/users", userRouter);
app.use("/auth", authRouter);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
