const domain = 'http://127.0.0.1:5501';
// const domain = 'https://yujinnnee.github.io/saenip/';

document.addEventListener("DOMContentLoaded", function () {
  const loadPageInIframe = async (url) => {
    try {
      const iframe = document.querySelector(".main-iframe");
      const mainContent = document.querySelector(".main-content");
      const footer = document.querySelector(".footer");

      iframe.src = url;

      iframe.onload = () => {
        const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
        const iframeHeight = iframeDocument.body.scrollHeight;      
        const footerHeight = footer.offsetHeight;                   
        mainContent.style.height = `${iframeHeight + footerHeight}px`;

        const sections = iframeDocument.querySelectorAll("section");
        observeIframeSections(sections);

        window.scrollTo(0, 0);
      };
    } catch (error) {
      document.getElementById("mainContent").innerHTML = `<h1>오류</h1><p>${error.message}</p>`;
    }
  };

  const observeIframeSections = (sections) => {
    const observerOptions = {
      root: null,
      threshold: 0.1,
    };

    const observerCallback = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach(section => observer.observe(section));
  };

  const currentLanguage = localStorage.getItem("language") || "ko";
  const currentPage = localStorage.getItem("currentPage") || "page1.html";

  document.getElementById("sbxLanguage").value = currentLanguage;
  loadPageInIframe(`${domain}/src/pages/${currentLanguage}/${currentPage}`);

  document.getElementById("btnLogo").addEventListener("click", () => {});

  document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      const newPage = this.getAttribute("data-page");
      loadPageInIframe(`${domain}/src/pages/${currentLanguage}/${newPage}`);
      localStorage.setItem("currentPage", newPage);
    });
  });

  document.getElementById("sbxLanguage").addEventListener("change", function () {
    const selectedLanguage = this.value;
    localStorage.setItem("language", selectedLanguage);

    if (selectedLanguage === "ko") {
      location.href = `${domain}/index.html`;
    } else {
      location.href = `${domain}/src/pages/${selectedLanguage}/index.html`;
    }
  });

  const header = document.querySelector(".header");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 0) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });
});
