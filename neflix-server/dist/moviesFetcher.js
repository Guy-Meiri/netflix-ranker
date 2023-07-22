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
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchMovieDetails = void 0;
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
function fetchMovieDetails(movieName) {
    const queryParam = `${movieName.split(" ").join("+")}`;
    return fetch(`${baseUrl}search?query=${queryParam}`, {
        headers: {
            "Access-Control-Allow-Origin": "no-cors",
        },
    }).then((res) => __awaiter(this, void 0, void 0, function* () {
        var _a;
        const data = yield res.json();
        console.log("search result:");
        // console.log(JSON.stringify(data));
        const imdbId = (_a = data.results[0]) === null || _a === void 0 ? void 0 : _a.id;
        console.log("id: ", imdbId);
        const movieDetailsRes = yield fetch(`${baseUrl}title/${imdbId}`, {
            headers: {
                "Access-Control-Allow-Origin": "no-cors",
            },
        });
        const movieDetails = yield movieDetailsRes.json();
        console.log("-----------------------------");
        // console.log("movieDetails: ", JSON.stringify(movieDetails));
        const rating = movieDetails.rating;
        console.log("-----------------------------");
        console.log(`rating: ${JSON.stringify(rating)}`);
        return rating;
    }));
}
exports.fetchMovieDetails = fetchMovieDetails;
