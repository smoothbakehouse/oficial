document.addEventListener("DOMContentLoaded", () => {

  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const closeBtn = document.querySelector(".lightbox-close");

  document.querySelectorAll(".cookie-card img").forEach(img => {
    img.addEventListener("click", () => {
      lightboxImg.src = img.src;
      lightbox.classList.add("active");
    });
  });

  lightbox.addEventListener("click", () => {
    lightbox.classList.remove("active");
  });

  closeBtn.addEventListener("click", e => {
    e.stopPropagation();
    lightbox.classList.remove("active");
  });

});
