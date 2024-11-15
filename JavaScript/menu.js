document.addEventListener("DOMContentLoaded", () => {
    const currentPage = window.location.pathname;
    const menuLinks = document.querySelectorAll(".menu li a");
  
    menuLinks.forEach(link => {
      if (link.getAttribute("href") === currentPage) {
        link.classList.add("active");
      }
    });
  });
  