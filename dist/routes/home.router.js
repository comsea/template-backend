"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const path_1 = __importDefault(require("path"));
const homeRouter = (0, express_1.Router)();
homeRouter.get("/", (_req, res) => {
    res.sendFile(path_1.default.join(__dirname, "../../public/login.html"));
});
exports.default = homeRouter;
//# sourceMappingURL=home.router.js.map