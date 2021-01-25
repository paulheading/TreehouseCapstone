import axios from "axios";

function getToken() {
  return fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        btoa(
          `30a7191314fb49d4b56579de3eb7c05c:dcc629385ce4482b89a9af883fc66cc2`
        ),
    },
    body: "grant_type=client_credentials",
  })
    .then((res) => res.json())
    .then((res) => res.access_token)
    .catch((err) => console.error(err));
}

async function getSpotify(query) {
  const token = await getToken();
  return await axios
    .get(
      `https://api.spotify.com/v1/search?q=album:${query}&type=album&limit=30`,
      {
        headers: { Authorization: "Bearer " + token },
      }
    )
    .then(({ data }) => {
      return data.albums.items;
    })
    .then((data) => {
      return data.filter(({ album_type }) => {
        return album_type !== "single";
      });
    })
    .then((data) => {
      return data.filter((_, index) => {
        return index < 15;
      });
    })
    .then((data) => {
      return data.map(({ name, id, external_urls, images, release_date }) => {
        return { name, id, url: external_urls.spotify, images, release_date };
      });
    });
}

export async function getSpotifyData(query) {
  let data = await getSpotify(query);
  console.log("spotify: ", data);
  return data;
}

export async function getOMDBData(query) {
  let data = await fetch(
    `https://www.omdbapi.com/?t=${query}&apikey=${process.env.REACT_APP_OMDB_API}`
  ).then((res) => res.json());
  console.log("omdb: ", data);
  return data;
}
