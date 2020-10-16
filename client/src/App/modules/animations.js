import gsap from "gsap";

export const lines = {
  visible: 3,
  height: 39,
};

export function moveRelated(value, clicks, limit) {
  let tl = gsap.timeline({ defaults: { duration: 0.3 } });
  limit = limit - lines.visible;

  if (clicks <= limit) {
    tl.to(value, { y: -(clicks * lines.height) });
  }
}

export function moveDown(value, clicks, limit) {
  value = value.parentNode.previousSibling.children[0];
  moveRelated(value, clicks, limit);
}

export function moveUp(value, clicks, limit) {
  value = value.parentNode.nextSibling.children[0];
  moveRelated(value, clicks, limit);
}

export function animateSave(value) {
  value = value.children[0].children[0];
  gsap.to(value, { fill: "#FF8A80" });
}

export function changeNavbar(input) {
  let target = document.querySelector(".navbar-collapse");
  if (input === "open") {
    target.classList.remove("collapse");
    target.classList.add("show");
  } else if (input === "close") {
    target.classList.remove("show");
    target.classList.add("collapse");
  }
}

export function spinMe(target) {
  gsap.to(target, {
    rotateZ: "+=360",
    ease: "none",
    duration: 2,
    repeat: -1,
  });
}

export function addClass(name, places) {
  if (places.length) {
    places.forEach((value) => {
      let target = document.querySelector(value);
      target.classList.add(name);
    });
  } else {
    let target = document.querySelector(places);
    target.classList.add(name);
  }
}

export function removeClass(name, places) {
  if (places.length) {
    places.forEach((value) => {
      let target = document.querySelector(value);
      target.classList.remove(name);
    });
  } else {
    let target = document.querySelector(places);
    target.classList.remove(name);
  }
}
