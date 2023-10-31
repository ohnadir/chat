"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const app = (0, express_1.default)();
// config dot env file
dotenv_1.default.config();
app.get('/', (req, res) => {
    res.send("Hello world !");
});
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server app Listing at http://localhost:${PORT}`);
});
