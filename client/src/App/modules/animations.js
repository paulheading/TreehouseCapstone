import gsap from "gsap";

export const lines = {
  visible: 4,
  height: 39,
  split: 13,
};

export function moveRelated(value, clicks, limit) {
  let tl = gsap.timeline({ defaults: { duration: 0.3 } });
  limit = limit - lines.visible;

  if (clicks < limit) {
    tl.to(value, { y: -(clicks * lines.height) });
  } else if (clicks === limit) {
    tl.to(value, { y: -(clicks * lines.height + lines.split) });
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

export function animateHeart(value) {
  value = value.children[0].children[0];
  gsap.to(value, { fill: "#FF8A80" });
}

export function clearHeart(value) {
  value = value.parentNode.parentNode.nextSibling.children[0].querySelector(
    "path.fill"
  );
  return value !== null ? gsap.set(value, { clearProps: "all" }) : null;
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
