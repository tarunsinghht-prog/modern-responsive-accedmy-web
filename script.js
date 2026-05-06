const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-menu a[href^='#']");
const sections = document.querySelectorAll("main section[id]");
const inquiryForm = document.querySelector(".inquiry-form");
const emailInquiry = document.querySelector(".email-inquiry");

document.getElementById("year").textContent = new Date().getFullYear();

function closeMenu() {
  navToggle.classList.remove("is-open");
  navMenu.classList.remove("is-open");
  navToggle.setAttribute("aria-expanded", "false");
  document.body.classList.remove("menu-open");
}

navToggle.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("is-open");
  navToggle.classList.toggle("is-open", isOpen);
  navToggle.setAttribute("aria-expanded", String(isOpen));
  document.body.classList.toggle("menu-open", isOpen);
});

navLinks.forEach((link) => {
  link.addEventListener("click", closeMenu);
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

document.querySelectorAll(".reveal").forEach((item) => revealObserver.observe(item));

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      document.querySelectorAll(".nav-menu a").forEach((link) => link.classList.remove("active"));
      const activeLink = document.querySelector(`.nav-menu a[href="#${entry.target.id}"]`);
      activeLink?.classList.add("active");
    });
  },
  {
    rootMargin: "-42% 0px -50% 0px",
    threshold: 0
  }
);

sections.forEach((section) => navObserver.observe(section));

function getInquiryMessage() {
  const formData = new FormData(inquiryForm);
  const name = formData.get("name")?.toString().trim() || "Not shared";
  const phone = formData.get("phone")?.toString().trim() || "Not shared";
  const interest = formData.get("interest")?.toString().trim() || "Not selected";
  const message = formData.get("message")?.toString().trim() || "Please contact me with details.";

  return [
    "Hi Blue Heart Dance Academy, I want to inquire about classes.",
    "",
    `Name: ${name}`,
    `Mobile: ${phone}`,
    `Interested in: ${interest}`,
    `Message: ${message}`
  ].join("\n");
}

function updateEmailLink() {
  if (!inquiryForm || !emailInquiry) return;
  const subject = encodeURIComponent("Dance Class Inquiry - Blue Heart Dance Academy");
  const body = encodeURIComponent(getInquiryMessage());
  emailInquiry.href = `mailto:tarunsingh.ht@gmail.com?subject=${subject}&body=${body}`;
}

if (inquiryForm) {
  inquiryForm.addEventListener("input", updateEmailLink);
  inquiryForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const message = encodeURIComponent(getInquiryMessage());
    window.open(`https://wa.me/919058131481?text=${message}`, "_blank", "noopener");
  });
  updateEmailLink();
}
