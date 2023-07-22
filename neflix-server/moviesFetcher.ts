interface MovieDetails {
  count: number;
  star: number;
}

interface NetflixVideo {
  name: string;
  node: Element;
}

// items.forEach((item) => {
//     fetchMovieDetails(item.name).then((res) => {
//       console.log("name: ", item.name, "res from top: ", JSON.stringify(res));
//       const ratingElement = document.createElement("div");
//       ratingElement.innerText = `Rating: ${res.star} (count: ${res.count})`;
//       item.node.insertAdjacentElement("afterend", ratingElement);
//       item.node.parentElement?.parentElement?.parentElement?.insertAdjacentElement(
//         "beforeend",
//         ratingElement
//       );
//     });
//   });
const baseUrl = "https://imdb-api.projects.thetuhin.com/";

export function fetchMovieDetails(movieName: string) {
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
