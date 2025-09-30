import express from "express"
import path from "path"
import { fileURLToPath } from "url"
import { userRouter } from "./routes/userRoutes.js";
import { authRouter } from "./routes/authRoutes.js";
import { postRouter } from "./routes/postsRoutes.js";
import { authMiddleware } from "./middleware/authMiddleware.js";
import { commentRouter } from "./routes/commentsRouts.js";

const app = express();

//__dirname في ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log("Hello From the Middleware");
  req.requestTime = new Date().toISOString();
  next();
});

app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/posts', authMiddleware, postRouter);
app.use('/api/comments', authMiddleware, commentRouter);

// RouteUI
app.get("/", (req, res) => {
  res.render("index", { title: " home page", message: "welcome to our website" });
});

export default app;
