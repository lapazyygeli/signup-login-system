import { connectDB } from "./database/init.js";
import express from "express";
import cors from "cors";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import session from "express-session";
import MongoStore from "connect-mongo";

// scripteihin (package.json) voidaan tehä myös nodemon, + typescript.
// TODO: All of our inputs should be sanitized.

const app = express();
const port = 5000;

connectDB();

const corsOptions = {
  origin: "http://localhost:4000",
  credentials: true,
};
app.use("/", cors(corsOptions));
app.use("/", express.json());
app.use(
  session({
    // Sessions are created for every request
    // for a specific path automatically
    secret: process.env.SESSION_SECRET,
    store: MongoStore.create({
      mongoUrl: process.env.DB_URL,
      collectionName: "sessions",
    }),
    cookie: {
      maxAge: 1000 * 60 * 60,
      httpOnly: true,

      // Cookie is available in every path.
      // Implicilty sent.
      path: "/",

      // Requires an https-enabled website.
      // HTTPS is necessary for secure cookies
      // For production should be set to true.
      secure: false,
    },
    resave: false,

    // false: Means that session isn't saved to session store if
    // it's not modified. true: useful for tracking traffic
    // in a website. Saves all sessions to store, even umodified ones.
    saveUninitialized: false,
  })
);
app.use("/users", userRouter);
app.use("/auth", authRouter);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
