"use strict";

// Mobile navigation

const btnNavEl = document.querySelector(".btn-mobile-nav");
const headerEl = document.querySelector(".header");

btnNavEl.addEventListener("click", function () {
  headerEl.classList.toggle("nav-open");
});

// Smooth scrolling

const allLinks = document.querySelectorAll("a:link");

allLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    e.preventDefault();

    const href = link.getAttribute("href");

    if (href === "#")
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

    if (href !== "#") {
      const sectionEl = document.querySelector(href);
      sectionEl.scrollIntoView({ behavior: "smooth" });
    }

    if (link.classList.contains("nav-bar-link"))
      headerEl.classList.toggle("nav-open");
  });
});

// Sticky navigation

const sectionHeroEl = document.querySelector(".section-hero");

const obs = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];

    if (ent.isIntersecting === false) {
      document.body.classList.add("sticky");
    }

    if (ent.isIntersecting === true) {
      document.body.classList.remove("sticky");
    }
  },
  {
    root: null,
    threshold: 0,
    rootMargin: "-80px",
  }
);

obs.observe(sectionHeroEl);

// Reveal section

window.addEventListener("scroll", function () {
  const reveals = document.querySelectorAll(".reveal");
  for (let i = 0; i < reveals.length; i++) {
    const windowHeight = window.innerHeight;
    const revealTop = reveals[i].getBoundingClientRect().top;
    const revealPoint = 100;

    revealTop < windowHeight - revealPoint
      ? reveals[i].classList.add("active")
      : reveals[i].classList.remove("active");
  }
});

// window.addEventListener("scroll", function () {
//   const reveals = document.querySelectorAll(".reveal");
//   reveals.forEach(function () {
//     const windowHeight = window.innerHeight;
//     const revealTop = reveals[0].getBoundingClientRect().top;
//     const revealPoint = 100;

//     revealTop < windowHeight - revealPoint
//       ? reveals[0].classList.add("active")
//       : reveals[0].classList.remove("active");
//   });

// Maps - location

var map = L.map("map").setView([44.878117, 18.797083], 17);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  foo: "bar",
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

L.marker([44.878117, 18.797083]).addTo(map);

// .bindPopup("A pretty CSS3 popup.<br> Easily customizable.")
// .openPopup();

// Current year

const yearEl = document.querySelector(".year");
const currentYear = new Date().getFullYear();
yearEl.textContent = currentYear;

// Email contact

const form = document.querySelector("form");
const sendForm = document.querySelector(".send");

sendForm.addEventListener("click", (e) => {
  e.preventDefault();
  const [...data] = new FormData(form);
  const convertObject = Object.fromEntries(data);
  const { name, email, message } = convertObject;

  const configEmail = {
    service_id: "service_gq1ejwq",
    template_id: "template_p9shtty",
    user_id: "6uGEnA79cuH8zhpgk",
    template_params: {
      name: name,
      email: email,
      message: message,
    },
  };

  const response = fetch("https://api.emailjs.com/api/v1.0/email/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(configEmail),
  })
    .then((data) => console.log(data), form.reset())
    .catch((err) => console.error(err));
});
