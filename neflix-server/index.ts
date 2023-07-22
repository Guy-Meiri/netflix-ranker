import express, { Express, Request, Response } from "express";
import { fetchMovieDetails } from "./moviesFetcher";
const cors = require("cors");
const port = 8000;

const app: Express = express();
app.use(cors());

// app.get("/", (req: Request, res: Response) => {
//   res.send("HELLO FROM EXPRESS + TS!!!!");
// });

app.get("/video", async (req: Request, res: Response) => {
  const videoName = req.query.videoName;
  const details = await fetchMovieDetails(videoName as string);
  console.log("details: ", JSON.stringify(details));
  res.send(details);
});

app.listen(port, () => {
  console.log(`now listening on port ${port}`);
});
