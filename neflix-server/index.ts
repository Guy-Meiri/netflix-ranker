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
  if (!videoName) {
    return res.send("no video name provided");
  }
  try {
    const details = await fetchMovieDetails(videoName as string);
    console.log("details: ", JSON.stringify(details));
    res.send(details);
  } catch (err) {
    res.send("error");
    console.log("err: ", err);
  }
});

app.listen(port, () => {
  console.log(`now listening on port ${port}`);
});
