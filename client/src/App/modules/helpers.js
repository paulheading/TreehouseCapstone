// https://thomlom.dev/setup-eslint-prettier-react/

export const site_url =
  process.env.REACT_APP_ENV === "production"
    ? process.env.REACT_APP_SITE_URL
    : "http://localhost:5000";

// POST functions

export async function createRoute(route, custom) {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(custom),
  };
  return await fetch(`${site_url}/${route}`, options).then((res) => res.json());
}

// DELETE functions

export async function delRoute(route, custom) {
  try {
    const response = await fetch(`${site_url}/${route}/${custom}`, {
      method: "DELETE",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

// GET functions

export async function getRoute(route, custom) {
  const response = await fetch(`${site_url}/${route}/${custom}`);
  const data = await response.json();
  return data;
}

export async function getAuthRoute(route, name, pass) {
  let headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", "Basic " + btoa(name + ":" + pass));
  const response = await fetch(`${site_url}/${route}`, { headers });
  const data = await response.json();
  return data;
}

// FILTER functions

export function limitString(string, limit = 40) {
  if (string) {
    if (string.length > limit) {
      string = string.slice(0, limit);
      string += "...";
    }
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
  if (arr.length) {
    arr.forEach((value) => {
      if (value.searchTerm === query) {
        saved = true;
      }
    });
  }
  return saved;
}

// MICRO functions

export function applyClass(condition, name) {
  return condition ? name : "";
}

export function ifClassExists(className) {
  return className ? className : "";
}

export function applyVariant(variant, handle) {
  return variant ? `${handle}-${variant}` : "";
}
