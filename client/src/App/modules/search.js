import { spotifyApi } from "./spotify";

export async function searchFilm(delta, key) {
  const get = await fetch(`//www.omdbapi.com/?t=${delta}&apikey=${key}`);
  return await get.json();
}

export function searchAlbums(delta, blackLists) {
  return spotifyApi
    .searchAlbums(delta, { limit: 15 })
    .then((data) => {
      return data.albums.items.map(
        ({ name, id, external_urls, images, release_date }) => {
          const url = external_urls.spotify;
          return {
            name,
            id,
            url,
            images,
            release_date,
          };
        }
      );
    })
    .then((data) => {
      let filter = [];
      if (blackLists) {
        data.forEach((data) => {
          blackLists.forEach(({ searchTerm, albumId }) => {
            if (searchTerm === delta) {
              if (albumId === data.id) {
                filter.push(albumId);
              }
            }
          });
        });
      }
      return data.filter((data) => {
        return filter.indexOf(data.id) === -1;
      });
    })
    .then((data) => {
      data.forEach((value) => {
        value.related = [];
        spotifyApi.getAlbumTracks(value.id).then(({ items }) => {
          items.forEach(({ artists }) => {
            artists.forEach(({ external_urls, name }) => {
              const url = external_urls.spotify;
              let exists = false;
              value.related.forEach((value) => {
                if (value.name === name) {
                  exists = true;
                }
              });
              if (!exists) {
                value.related.push({ url, name });
              }
            });
          });
        });
      });
      return data;
    })
    .then(
      (data) => {
        return { data, expired: false };
      },
      () => {
        return { expired: true };
      }
    );
}
