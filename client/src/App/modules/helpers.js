// https://thomlom.dev/setup-eslint-prettier-react/

export const api = "http://localhost:5000";

// POST functions

export async function createRoute(route, custom) {
  let options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(custom),
  };
  let post = await fetch(`${api}/${route}`, options);
  return await post.json();
}

// DELETE functions

export async function delRoute(route, custom) {
  let options = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  };
  try {
    let del = await fetch(`${api}/${route}/${custom}`, options);
    return await del.json();
  } catch (error) {
    console.log(error);
  }
}

// GET functions

export async function getRoute(route, custom) {
  let get = await fetch(`${api}/${route}/${custom}`);
  return await get.json();
}

export async function getAuthRoute(route, name, pass) {
  let headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", "Basic " + btoa(name + ":" + pass));
  let get = await fetch(`${api}/${route}`, { headers });
  return await get.json();
}

// FILTER functions

export function limitString(string, limit = 40) {
  if (string.length > limit) {
    string = string.slice(0, limit);
    string += "...";
  }
  return string;
}

export function filterDate(input) {
  let temp = new Date(input);
  temp = temp.toDateString().split(" ");
  return `${temp[0]} ${temp[2]} ${temp[1]}, ${temp[3]}`;
}

export function isSaved(arr, query) {
  let saved = false;
  arr.forEach((value) => {
    if (value.searchTerm === query) {
      saved = true;
    }
  });
  return saved;
}

// MICRO functions

export function applyClass(condition, name) {
  return condition ? name : "";
}

export function applyVariant(variant, handle) {
  return variant ? `${handle}-${variant}` : "";
}
