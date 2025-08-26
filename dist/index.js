"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const article_router_1 = __importDefault(require("./routes/article.router"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const home_router_1 = __importDefault(require("./routes/home.router"));
const app = (0, express_1.default)();
const port = process.env.PORT || 8080;
app.use((0, cors_1.default)({ origin: true, credentials: false }));
app.use(express_1.default.json());
app.use("/", home_router_1.default);
// servir /public (tes pages) et /uploads (les images)
app.use(express_1.default.static(path_1.default.join(__dirname, "../public")));
app.use("/uploads", express_1.default.static(path_1.default.join(__dirname, "../uploads")));
app.use("/articles", article_router_1.default);
app.use("/auth", auth_routes_1.default);
app.get("/ping", (_req, res) => res.status(200).json({ message: "pong" }));
app.listen(port, () => {
    console.log(`Server up and running on http://127.0.0.1:${port}`);
});
//# sourceMappingURL=index.js.map