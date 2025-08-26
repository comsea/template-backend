import { Router } from "express";
import path from "path";

const homeRouter = Router();

homeRouter.get("/", (_req, res) => {
    res.sendFile(path.join(__dirname, "../../public/login.html"));
});

export default homeRouter;
