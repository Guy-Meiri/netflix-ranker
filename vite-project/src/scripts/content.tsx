// import React from "react";
// import ReactDOM from "react-dom/client";
// import NetflixScraper from "./NetflixScraper";

const root = document.createElement("div");
root.id = "root";
document.body.appendChild(root);
console.error("hello from content script");
interface MovieDetails {
  count: number;
  star: number;
}

interface NetflixVideo {
  name: string;
  node: Element;
}
// const baseUrl = "https://imdb-api.projects.thetuhin.com/";
const localHostBaseUrl = "http://localhost:8000/";

function getVideos(): NetflixVideo[] {
  const items = document.querySelectorAll(".fallback-text");

  const itemNames: NetflixVideo[] = [];
  items.forEach((i) => {
    itemNames.push({ node: i, name: i.innerHTML });
  });
  console.log(JSON.stringify(itemNames));
  return itemNames;
}

const videos = getVideos();

addRatingToVideos(videos);

// function addRatingToSingleVideo();

async function addRatingToVideos(videos: NetflixVideo[]) {
  const promises = videos.map((item) => {
    return fetch(`${localHostBaseUrl}video/?videoName=${item.name}`);
  });

  await Promise.allSettled(promises).then((res) => {
    res.forEach(async (videoDetails, index) => {
      console.log(JSON.stringify(videoDetails));
      const videoNode = videos[index].node;
      if (videoDetails.status === "fulfilled") {
        const result = (await videoDetails.value.json()) as MovieDetails;
        const ratingElement = document.createElement("div");
        ratingElement.innerText = `Rating: ${result.star} (count: ${result.count})`;
        videoNode.insertAdjacentElement("afterend", ratingElement);
        videoNode.parentElement?.parentElement?.parentElement?.insertAdjacentElement(
          "beforeend",
          ratingElement
        );
      }
    });
  });
}

// videos.forEach((item) => {
//   fetchMovieDetails(item.name).then((res) => {
//     console.log("name: ", item.name, "res from top: ", JSON.stringify(res));
//     const ratingElement = document.createElement("div");
//     ratingElement.innerText = `Rating: ${res.star} (count: ${res.count})`;
//     item.node.insertAdjacentElement("afterend", ratingElement);
//     item.node.parentElement?.parentElement?.parentElement?.insertAdjacentElement(
//       "beforeend",
//       ratingElement
//     );
//   });
// });

// function fetchMovieDetails(movieName: string) {
//   const queryParam = `${movieName.split(" ").join("+")}`;
//   return fetch(`${baseUrl}search?query=${queryParam}`, {
//     headers: {
//       "Access-Control-Allow-Origin": "no-cors",
//     },
//   }).then(async (res) => {
//     const data = await res.json();
//     console.log("search result:");
//     // console.log(JSON.stringify(data));
//     const imdbId = data.results[0]?.id;
//     console.log("id: ", imdbId);
//     const movieDetailsRes = await fetch(`${baseUrl}title/${imdbId}`, {
//       headers: {
//         "Access-Control-Allow-Origin": "no-cors",
//       },
//     });
//     const movieDetails = await movieDetailsRes.json();
//     console.log("-----------------------------");
//     // console.log("movieDetails: ", JSON.stringify(movieDetails));
//     const rating = movieDetails.rating;
//     console.log("-----------------------------");
//     console.log(`rating: ${JSON.stringify(rating)}`);
//     return rating as MovieDetails;
//   });
// }
