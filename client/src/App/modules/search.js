import axios from "axios";

const SPOTIFY = {
  USER_ID: process.env.REACT_APP_SPOTIFY_USER_ID,
  CLIENT_ID: process.env.REACT_APP_SPOTIFY_CLIENT_ID,
  CLIENT_SECRET: process.env.REACT_APP_SPOTIFY_CLIENT_SECRET,
  TOKEN_BASE: "https://accounts.spotify.com/api/token",
  API_BASE: "https://api.spotify.com/v1",
};

function getToken() {
  return fetch(SPOTIFY.TOKEN_BASE, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " + btoa(`${SPOTIFY.CLIENT_ID}:${SPOTIFY.CLIENT_SECRET}`),
    },
    body: "grant_type=client_credentials",
  })
    .then((res) => res.json())
    .then((res) => res.access_token)
    .catch((err) => console.error(err));
}

function filterBlacklist(query, blacklist, data) {
  blacklist.forEach(({ searchTerm, albumId }) => {
    if (searchTerm === query) {
      data = data.filter(({ id }) => {
        return id !== albumId;
      });
    }
  });
  return data;
}

async function attachRelated(data) {
  data = data.map(async (item) => {
    const info = await getAlbumInfo(item.id);
    item.related = [];
    info.tracks.items.forEach(({ artists }) => {
      artists.map(({ name, external_urls }) => {
        let exists = false;
        item.related.forEach((item) => {
          if (item.name === name) {
            exists = true;
          }
        });
        return !exists
          ? item.related.push({ name, url: external_urls.spotify })
          : null;
      });
    });
    return item;
  });
  return Promise.all(data).then((data) => data);
}

async function getSpotify(query, blacklist) {
  const token = await getToken();

  return await axios
    .get(`${SPOTIFY.API_BASE}/search?q=album:${query}&type=album&limit=30`, {
      headers: { Authorization: "Bearer " + token },
    })
    .then(({ data }) => {
      return data.albums.items;
    })
    .then((data) => {
      return data.filter(({ album_type }) => {
        return album_type !== "single";
      });
    })
    .then((data) => {
      if (blacklist) {
        return blacklist.length > 0
          ? filterBlacklist(query, blacklist, data)
          : data;
      }
      return data;
    })
    .then((data) => {
      return data.filter((_, index) => {
        return index < 15;
      });
    })
    .then(async (data) => {
      return await attachRelated(data);
    })
    .then((data) => {
      return data.map(
        ({ name, id, related, external_urls, images, release_date }) => {
          return {
            name,
            id,
            related,
            url: external_urls.spotify,
            images,
            release_date,
          };
        }
      );
    });
}

async function getAlbumInfo(query) {
  const token = await getToken();

  return await axios
    .get(`${SPOTIFY.API_BASE}/albums/${query}`, {
      headers: { Authorization: "Bearer " + token },
    })
    .then(({ data }) => {
      return data;
    });
}

export async function getSpotifyData(query, blacklist) {
  let data = await getSpotify(query, blacklist);
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
