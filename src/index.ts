import express from "express";
import articleRouter from "./routes/article.router";
import authRouter from "./routes/auth.routes";

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

app.use("/articles", articleRouter);
app.use("/auth", authRouter);

app.get("/ping", (req, res) => {
  res.status(200).json({ message: "pong" });
});

app.listen(port, () => {
  console.log(`Server up and running on port: http://127.0.0.1:${port}`);
});
