import "./styles.css";

const navToggle = document.querySelector("[data-nav-toggle]");
const nav = document.querySelector("[data-nav]");

if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    const isOpen = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!isOpen));
    nav.classList.toggle("is-open", !isOpen);
  });

  nav.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      navToggle.setAttribute("aria-expanded", "false");
      nav.classList.remove("is-open");
    }
  });
}

const year = document.querySelector("#year");
if (year) {
  year.textContent = new Date().getFullYear();
}

const contactForm = document.querySelector("#contact-form");
const status = document.querySelector("#form-status");

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(contactForm);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const subject = String(formData.get("subject") || "").trim();
    const message = String(formData.get("message") || "").trim();

    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Course or subject: ${subject}`,
      "",
      message,
    ].join("\n");

    const mailto = new URL("mailto:garnes2@rpi.edu");
    mailto.searchParams.set("subject", `Tutoring request: ${subject || "STEM help"}`);
    mailto.searchParams.set("body", body);

    if (status) {
      status.textContent = "Opening your email app...";
    }

    window.location.href = mailto.toString();
  });
}
