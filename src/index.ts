import express from "express";
import cors from "cors";
import path from "path";
import articleRouter from "./routes/article.router";
import authRouter from "./routes/auth.routes";
import homeRouter from "./routes/home.router";

const app = express();
const port = process.env.PORT || 8080;

app.use(cors({ origin: true, credentials: false }));
app.use(express.json());

app.use("/", homeRouter);

// servir /public (tes pages) et /uploads (les images)
app.use(express.static(path.join(__dirname, "../public")));
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.use("/articles", articleRouter);
app.use("/auth", authRouter);

app.get("/ping", (_req, res) => res.status(200).json({ message: "pong" }));

app.listen(port, () => {
  console.log(`Server up and running on http://127.0.0.1:${port}`);
});
