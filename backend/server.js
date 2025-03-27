import { connectDB } from "./database/init.js";
import express from "express";
import cors from "cors";
//import router from "./routes/user.route.js"

// scripteihin (package.json) voidaan tehä myös nodemon, + typescript.

const app = express();
const port = 5000;

connectDB();

app.use("/", cors()); // tällä hetkellä auki jokaselle. Ei hyvä! Kts. Express cors.
app.use("/", express.json()); // liittyy siihen, että req.body ei oo undefined. Ja content-type
app.use("/users", router);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});