import { spotifyApi } from "./spotify";

export async function searchFilm(delta, key) {
  const get = await fetch(`//www.omdbapi.com/?t=${delta}&apikey=${key}`);
  return await get.json();
}

function optimiseAlbumData(data) {
  return data.map(({ name, id, external_urls, images, release_date }) => {
    return {
      name,
      id,
      url: external_urls.spotify,
      images,
      release_date,
    };
  });
}

function filterBlacklistedResults(data, delta, blacklist) {
  let filter = [];
  if (blacklist) {
    data.forEach((data) => {
      blacklist.forEach(({ searchTerm, albumId }) => {
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
}

async function getRelatedData(id) {
  return await spotifyApi.getAlbumTracks(id).then(({ items }) => {
    let results = [];
    items.map(({ artists }) => {
      return artists.map(({ external_urls, name }) => {
        let exists = false;
        results.forEach((value) => {
          if (value.name === name) {
            exists = true;
          }
        });
        if (!exists) {
          return results.push({ url: external_urls.spotify, name });
        }
        return null;
      });
    });
    return results;
  });
}

async function getAlbumArtists(data) {
  const tingo = data.map(async (value) => {
    value.related = await getRelatedData(value.id);
    return value;
  });

  return Promise.all(tingo).then((results) => {
    return results;
  });
}

export function searchAlbums(delta, blacklist) {
  return spotifyApi
    .searchAlbums(delta, { limit: 15 })
    .then((data) => {
      return optimiseAlbumData(data.albums.items);
    })
    .then((data) => {
      return filterBlacklistedResults(data, delta, blacklist);
    })
    .then((data) => {
      return getAlbumArtists(data);
    })
    .then(
      (data) => {
        return !data ? { data: [], expired: false } : { data, expired: false };
      },
      () => {
        return { data: [], expired: true };
      }
    );
}
