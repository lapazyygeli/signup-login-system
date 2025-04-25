import { connectDB } from "./database/init.js";
import express from "express";
import cors from "cors";
import usersRouter from "./features/users/users.route.js";
import session from "express-session";
import MongoStore from "connect-mongo";
// scripteihin (package.json) voidaan tehä myös nodemon, + typescript.
// TODO: All of our inputs should be sanitized.

const app = express();
connectDB();

const corsOptions = {
  origin: process.env.CLIENT_URL,
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
      collectionName: process.env.DB_COLLECTION_SESSIONS,
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
app.use("/users", usersRouter);

app.listen(process.env.BACKEND_PORT, () => {
  console.log(`Listening on port ${process.env.BACKEND_PORT}`);
});
