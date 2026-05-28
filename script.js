const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const navItems = document.querySelectorAll(".nav-links a");

const closeNavigation = () => {
  document.body.classList.remove("nav-open");
  navToggle.setAttribute("aria-expanded", "false");
};

navToggle.addEventListener("click", () => {
  const isOpen = document.body.classList.toggle("nav-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

navItems.forEach((item) => {
  item.addEventListener("click", closeNavigation);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeNavigation();
  }
});

document.addEventListener("click", (event) => {
  if (!document.body.classList.contains("nav-open")) {
    return;
  }

  const clickedNavigation = navLinks.contains(event.target) || navToggle.contains(event.target);
  if (!clickedNavigation) {
    closeNavigation();
  }
});
