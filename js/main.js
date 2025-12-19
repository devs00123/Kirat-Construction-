// Mobile navigation toggle
const navToggle = document.getElementById("navToggle");
const mainNav = document.getElementById("mainNav");

if (navToggle && mainNav) {
  navToggle.addEventListener("click", () => {
    navToggle.classList.toggle("open");
    mainNav.classList.toggle("open");
  });

  // Close nav when a link is clicked (mobile)
  mainNav.addEventListener("click", (event) => {
    const target = event.target;
    if (target.matches("a.nav-link")) {
      navToggle.classList.remove("open");
      mainNav.classList.remove("open");
    }
  });
}

// Light / dark theme toggle
const themeToggle = document.getElementById("themeToggle");
const themeStorageKey = "kirat-theme";

function applyTheme(theme) {
  if (theme === "dark") {
    document.body.classList.add("theme-dark");
  } else {
    document.body.classList.remove("theme-dark");
  }
}

// On load: pick saved theme or system preference
const savedTheme = localStorage.getItem(themeStorageKey);
if (savedTheme === "dark" || savedTheme === "light") {
  applyTheme(savedTheme);
} else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
  applyTheme("dark");
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("theme-dark");
    localStorage.setItem(themeStorageKey, isDark ? "dark" : "light");
  });
}

// Scroll reveal animations using IntersectionObserver
const animatedElements = document.querySelectorAll("[data-animate]");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const delay = el.getAttribute("data-delay");
          if (delay) {
            el.style.transitionDelay = `${parseInt(delay, 10) / 1000}s`;
          }
          el.classList.add("animated");
          observer.unobserve(el);
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  animatedElements.forEach((el) => observer.observe(el));
} else {
  // Fallback: just show all
  animatedElements.forEach((el) => el.classList.add("animated"));
}

// Dynamic year in footer
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// Simple contact form handling (front-end only)
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

if (contactForm && formStatus) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !phone || !message) {
      formStatus.textContent = "Please fill in your name, phone and project details.";
      formStatus.classList.remove("success");
      formStatus.classList.add("error");
      return;
    }

    formStatus.textContent =
      "Thank you! Your enquiry has been captured locally. Please also call or email for a faster response.";
    formStatus.classList.remove("error");
    formStatus.classList.add("success");
    contactForm.reset();
  });
}


