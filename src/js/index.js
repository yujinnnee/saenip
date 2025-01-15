const domain = 'http://127.0.0.1:5501';
//const domain = 'https://yujinnnee.github.io/saenip/';

document.addEventListener("DOMContentLoaded", function () {
  const loadPageInIframe = async (url) => {
    try {
      const iframe = document.querySelector(".main-iframe");
      const mainContent = document.querySelector(".main-content");
      const footer = document.querySelector(".footer");

      const updateIframeHeight = () => {
        const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
        if (iframeDocument && iframeDocument.body) {
          const iframeHeight = iframeDocument.body.scrollHeight;
          const footerHeight = footer.offsetHeight;
          mainContent.style.height = `${iframeHeight + footerHeight}px`;
        }
      };

      iframe.src = url;

      iframe.onload = () => {
        updateIframeHeight();

        const sections = iframe.contentDocument.querySelectorAll("section");
        observeIframeSections(sections);

        window.scrollTo(0, 0);
      };

      window.addEventListener("resize", updateIframeHeight);
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

  document.getElementById("btnLogo").addEventListener("click", () => { });

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

  // 변경시점 저장
  let smallWidth = 0;
  function checkHeaderLines() {
    const header = document.querySelector('.header');
    // 가려진 부분을 포함한 전체 넓이
    const headerFullWidth = header.scrollWidth;
    const screenWidthWithoutScrollbar = document.documentElement.clientWidth;

    if (headerFullWidth > screenWidthWithoutScrollbar) {
      smallWidth = headerFullWidth;
      header.classList.add('small-screen');
      document.getElementById('overlay').classList.toggle('small-screen'); // 오버레이 표시/숨기기
    }
    else {
      if (smallWidth < headerFullWidth) {
        header.classList.remove('small-screen');
        document.getElementById('overlay').classList.remove('small-screen'); // 오버레이 표시/숨기기
        header.classList.remove('open'); // 'open' 클래스 토글하여 메뉴 표시/숨기기
        document.getElementById('overlay').classList.remove('open'); // 오버레이 표시/숨기기
      }
    }
  }

  // 페이지 로드 시 또는 윈도우 크기 변경 시 감지
  window.addEventListener('load', checkHeaderLines);
  window.addEventListener('resize', checkHeaderLines);

  // 햄버거 메뉴 클릭 시 동작
  document.getElementById('hamburgerBtn').addEventListener('click', () => {

    header.classList.toggle('open'); // 'open' 클래스 토글하여 메뉴 표시/숨기기
    document.getElementById('overlay').classList.toggle('open'); // 오버레이 표시/숨기기
  });

  // 햄버거 메뉴 클릭 시 동작
  document.getElementById('overlay').addEventListener('click', () => {
    header.classList.remove('open'); // 'open' 클래스 토글하여 메뉴 표시/숨기기
    document.getElementById('overlay').classList.remove('open'); // 오버레이 표시/숨기기
  });
});
