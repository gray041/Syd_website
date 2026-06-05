const progressLine = document.getElementById("progressLine");
const cursorDot = document.getElementById("cursorDot");
const talkBtn = document.getElementById("talkBtn");
const moreProjectsBtn = document.getElementById("moreProjectsBtn");
const extraProjects = document.querySelectorAll(".extra-project");
const portraitCard = document.getElementById("portraitCard");
const stickyNote = document.getElementById("stickyNote");

window.addEventListener("scroll", () => {
  const total = document.body.scrollHeight - window.innerHeight;
  progressLine.style.width = ((window.scrollY / total) * 100) + "%";
});

window.addEventListener("mousemove", (event) => {
  if (cursorDot) {
    cursorDot.style.left = event.clientX + "px";
    cursorDot.style.top = event.clientY + "px";
  }

  movePortrait(event);
  moveSticky(event);
});

if (talkBtn) {
  talkBtn.addEventListener("click", () => {
    document.getElementById("contact").scrollIntoView({
      behavior: "smooth"
    });
  });
}

moreProjectsBtn.addEventListener("click", () => {
  extraProjects.forEach((project) => {
    project.classList.toggle("show");
  });

  const isOpen = extraProjects[0].classList.contains("show");

  moreProjectsBtn.innerHTML = isOpen
    ? 'Show less projects <span>↑</span>'
    : 'View more projects <span>→</span>';
});

function movePortrait(event) {
  if (!portraitCard) return;

  const rect = portraitCard.getBoundingClientRect();
  const x = event.clientX - (rect.left + rect.width / 2);
  const y = event.clientY - (rect.top + rect.height / 2);

  portraitCard.style.transform = `rotate(4deg) translate(${x * 0.012}px, ${y * 0.012}px)`;
}

function moveSticky(event) {
  if (!stickyNote) return;

  const paper = stickyNote.querySelector("p");
  const rect = stickyNote.getBoundingClientRect();

  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  if (x > 0 && x < rect.width && y > 0 && y < rect.height) {
    const rotateY = (x - rect.width / 2) / 18;
    const rotateX = (rect.height / 2 - y) / 18;

    paper.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotate(-8deg) scale(1.05)`;
  } else {
    paper.style.transform = "rotate(-8deg)";
  }
}
const wireframeButtons = document.querySelectorAll(".wireframe-open");
const wireframeLightbox = document.getElementById("wireframeLightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxTitle = document.getElementById("lightboxTitle");
const lightboxClose = document.getElementById("lightboxClose");

wireframeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    lightboxImage.src = button.dataset.img;
    lightboxTitle.textContent = button.dataset.title;
    wireframeLightbox.classList.add("active");
    document.body.style.overflow = "hidden";
  });
});

function closeWireframeLightbox() {
  wireframeLightbox.classList.remove("active");
  lightboxImage.src = "";
  document.body.style.overflow = "";
}

lightboxClose.addEventListener("click", closeWireframeLightbox);

wireframeLightbox.addEventListener("click", (event) => {
  if (event.target === wireframeLightbox) {
    closeWireframeLightbox();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && wireframeLightbox.classList.contains("active")) {
    closeWireframeLightbox();
  }
});