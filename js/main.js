const menuButton = document.querySelector("#menu-toggle");
const navMenu = document.querySelector("#nav-menu");

menuButton.addEventListener("click", function () {
  navMenu.classList.toggle("active");

  const isOpen = navMenu.classList.contains("active");

  menuButton.setAttribute("aria-expanded", isOpen);

  if (isOpen) {
    menuButton.setAttribute("aria-label", "Close navigation menu");
  } else {
    menuButton.setAttribute("aria-label", "Open navigation menu");
  }
});

const menuLinks = document.querySelectorAll("#nav-menu a");

menuLinks.forEach(function (link) {
  link.addEventListener("click", function () {
    navMenu.classList.remove("active");

    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation menu");
  });
});

const themeButton = document.querySelector("#theme-toggle");

let savedTheme = "light";

try {
  savedTheme = localStorage.getItem("theme") || "light";
} catch (error) {
  savedTheme = "light";
}

if (savedTheme === "dark") {
  document.body.classList.add("dark-mode");
}

function updateThemeButton() {
  const isDark = document.body.classList.contains("dark-mode");

  themeButton.setAttribute("aria-pressed", String(isDark));

  themeButton.setAttribute(
    "aria-label",
    isDark ? "Switch to light mode" : "Switch to dark mode",
  );
}

updateThemeButton();

themeButton.addEventListener("click", function () {
  document.body.classList.toggle("dark-mode");

  const isDark = document.body.classList.contains("dark-mode");

  try {
    localStorage.setItem("theme", isDark ? "dark" : "light");
  } catch (error) {}

  updateThemeButton();
});

const projects = [
  {
    title: "Personal Portfolio Website",
    description: "A responsive personal portfolio website.",
    category: "Portfolio",
    technologies: ["HTML", "CSS", "JavaScript"],
    image: "/assets/images/portfolio1.png",
    github: "https://github.com/eimyatmoe",
    demo: "https://eimyatmoe.github.io/personal-portfolio/",
  },
  {
    title: "Project 02",
    description: "Project details coming soon.",
    category: "E-Commerce",
    technologies: ["HTML", "CSS", "JavaScript"],
    github: "",
    demo: "",
  },
  {
    title: "Project 03",
    description: "Project details coming soon.",
    category: "POS Systems",
    technologies: ["PHP", "MySQL"],
    github: "",
    demo: "",
  },
  {
    title: "Project 04",
    description: "Project details coming soon.",
    category: "POS Systems",
    technologies: ["Python", "SQLite"],
    github: "",
    demo: "",
  },
];

const projectList = document.getElementById("project-list");
const projectCount = document.getElementById("project-count");
const filterButtons = document.querySelectorAll(".filter-btn");

function showProjects(category) {
  projectList.innerHTML = "";

  let selectedProjects = projects;

  if (category !== "All") {
    selectedProjects = projects.filter(function (project) {
      return project.category === category;
    });
  }

  selectedProjects.forEach(function (project) {
    let tags = "";

    project.technologies.forEach(function (technology) {
      tags += "<span>" + technology + "</span>";
    });

    let github = "<span class='project-github'>GitHub</span>";
    let demo = "<span class='project-demo'>Live Demo</span>";

    if (project.github !== "") {
      github =
        "<a class='project-github' href='" +
        project.github +
        "' target='_blank' rel='noopener noreferrer'>GitHub</a>";
    }

    if (project.demo !== "") {
      demo =
        "<a class='project-demo' href='" +
        project.demo +
        "' target='_blank' rel='noopener noreferrer'>Live Demo</a>";
    }

    const card = document.createElement("article");
    card.className = "project-card";

    card.innerHTML =
      '<div class="project-browser">' +
      '<div class="browser-header">' +
      "<span></span><span></span><span></span>" +
      "</div>" +
      '<div class="project-image">' +
      (project.image
        ? '<img src="' +
          project.image +
          '" alt="' +
          project.title +
          ' Screenshot">'
        : "<span>Project Screenshot</span>") +
      "</div>" +
      "</div>" +
      '<span class="project-category">' +
      project.category +
      "</span>" +
      "<h3>" +
      project.title +
      "</h3>" +
      "<p>" +
      project.description +
      "</p>" +
      '<div class="project-technologies">' +
      tags +
      "</div>" +
      '<div class="project-links">' +
      github +
      demo +
      "</div>";

    projectList.appendChild(card);
  });

  projectCount.textContent = "Showing " + selectedProjects.length + " projects";
}

filterButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    filterButtons.forEach(function (item) {
      item.classList.remove("active");
      item.setAttribute("aria-pressed", "false");
    });

    button.classList.add("active");
    button.setAttribute("aria-pressed", "true");

    const category = button.dataset.category;

    showProjects(category);
  });
});

showProjects("All");

const contactForm = document.querySelector(".contact-form");

const nameInput = document.querySelector("#contact-name");
const emailInput = document.querySelector("#contact-email");
const messageInput = document.querySelector("#contact-message");

const nameError = document.querySelector("#name-error");
const emailError = document.querySelector("#email-error");
const messageError = document.querySelector("#message-error");

const messageCount = document.querySelector("#message-count");
const formStatus = document.querySelector("#form-status");

function showError(input, errorElement, message) {
  errorElement.textContent = message;
  input.setAttribute("aria-invalid", "true");
}

function clearError(input, errorElement) {
  errorElement.textContent = "";
  input.removeAttribute("aria-invalid");
}

function checkName() {
  const name = nameInput.value.trim();

  if (name.length < 2) {
    showError(nameInput, nameError, "Name must have at least 2 characters.");
    return false;
  }

  clearError(nameInput, nameError);
  return true;
}

function checkEmail() {
  const email = emailInput.value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(email)) {
    showError(emailInput, emailError, "Please enter a valid email address.");
    return false;
  }

  clearError(emailInput, emailError);
  return true;
}

function checkMessage() {
  const message = messageInput.value.trim();

  if (message.length < 20) {
    showError(
      messageInput,
      messageError,
      "Message must have at least 20 characters.",
    );
    return false;
  }

  if (message.length > 500) {
    showError(
      messageInput,
      messageError,
      "Message cannot exceed 500 characters.",
    );
    return false;
  }

  clearError(messageInput, messageError);
  return true;
}

nameInput.addEventListener("input", function () {
  formStatus.textContent = "";

  if (nameInput.hasAttribute("aria-invalid")) {
    checkName();
  }
});

emailInput.addEventListener("input", function () {
  formStatus.textContent = "";

  if (emailInput.hasAttribute("aria-invalid")) {
    checkEmail();
  }
});

messageInput.addEventListener("input", function () {
  messageCount.textContent =
    messageInput.value.trim().length + " / 500 characters";

  formStatus.textContent = "";

  if (messageInput.hasAttribute("aria-invalid")) {
    checkMessage();
  }
});

contactForm.addEventListener("submit", function (event) {
  event.preventDefault();

  formStatus.textContent = "";

  const validName = checkName();
  const validEmail = checkEmail();
  const validMessage = checkMessage();

  if (!validName) {
    nameInput.focus();
    return;
  }

  if (!validEmail) {
    emailInput.focus();
    return;
  }

  if (!validMessage) {
    messageInput.focus();
    return;
  }

  formStatus.textContent = "Demo only. Your message has not been sent.";
});
