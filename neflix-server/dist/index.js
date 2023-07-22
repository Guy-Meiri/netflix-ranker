"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const moviesFetcher_1 = require("./moviesFetcher");
const cors = require("cors");
const port = 8000;
const app = (0, express_1.default)();
app.use(cors());
// app.get("/", (req: Request, res: Response) => {
//   res.send("HELLO FROM EXPRESS + TS!!!!");
// });
app.get("/video", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const videoName = req.query.videoName;
    const details = yield (0, moviesFetcher_1.fetchMovieDetails)(videoName);
    console.log("details: ", JSON.stringify(details));
    res.send(details);
}));
app.listen(port, () => {
    console.log(`now listening on port ${port}`);
});
