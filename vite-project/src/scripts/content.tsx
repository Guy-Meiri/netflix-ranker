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
const baseUrl = "https://imdb-api.projects.thetuhin.com/";

function getVideos(): NetflixVideo[] {
  const items = document.querySelectorAll(".fallback-text");

  const itemNames: NetflixVideo[] = [];
  items.forEach((i) => {
    itemNames.push({ node: i, name: i.innerHTML });
  });
  console.log(JSON.stringify(itemNames));
  return itemNames;
}

const items = getVideos();

items.forEach((item) => {
  fetchMovieDetails(item.name).then((res) => {
    console.log("name: ", item.name, "res from top: ", JSON.stringify(res));
    const ratingElement = document.createElement("div");
    ratingElement.innerText = `Rating: ${res.star} (count: ${res.count})`;
    item.node.insertAdjacentElement("afterend", ratingElement);
    item.node.parentElement?.parentElement?.parentElement?.insertAdjacentElement(
      "beforeend",
      ratingElement
    );
  });
});

function fetchMovieDetails(movieName: string) {
  const queryParam = `${movieName.split(" ").join("+")}`;
  return fetch(`${baseUrl}search?query=${queryParam}`, {
    headers: {
      "Access-Control-Allow-Origin": "no-cors",
    },
  }).then(async (res) => {
    const data = await res.json();
    console.log("search result:");
    // console.log(JSON.stringify(data));
    const imdbId = data.results[0]?.id;
    console.log("id: ", imdbId);
    const movieDetailsRes = await fetch(`${baseUrl}title/${imdbId}`, {
      headers: {
        "Access-Control-Allow-Origin": "no-cors",
      },
    });
    const movieDetails = await movieDetailsRes.json();
    console.log("-----------------------------");
    // console.log("movieDetails: ", JSON.stringify(movieDetails));
    const rating = movieDetails.rating;
    console.log("-----------------------------");
    console.log(`rating: ${JSON.stringify(rating)}`);
    return rating as MovieDetails;
  });
}

// fetch("https://imdb-api.projects.thetuhin.com/title/tt6470478").then(
//   async (res) => {
//     const data = await res.json();
//     console.log(JSON.stringify(data));
//   }
// );

// chrome.runtime.onMessage.addListener((obj, sender, response) => {
//   console.log("in chrome.runtime.onMessage.addListener", sender, response);
//   const items = document.querySelectorAll(".fallback-text");

//   const itemNames: string[] = [];
//   items.forEach((i) => {
//     itemNames.push(i.innerHTML);
//   });
//   console.log(JSON.stringify(itemNames));
//   const { type } = obj;
//   if (type === "loaded_netflix") {
//     console.log(type);
//   }
// });

export {};
