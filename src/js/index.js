const domain = 'http://127.0.0.1:5501';

document.addEventListener("DOMContentLoaded", function () {
  const loadPage = async (url) => {
    try {
      const response = await fetch(url);

      if (!response.ok) throw new Error("페이지를 불러올 수 없습니다.");

      const html = await response.text();
      
      document.getElementById("mainContent").innerHTML = html;

      // 새로 로드된 콘텐츠 내 섹션에도 슬라이드 효과 적용
      observeSections();
    } catch (error) {
      document.getElementById("mainContent").innerHTML = `<h1>오류</h1><p>${error.message}</p>`;
    }
  };

  const observeSections = () => {
    const sections = document.querySelectorAll("section");

    const observerOptions = {
      root: null,
      threshold: 0.1, // 섹션이 10% 이상 보일 때 트리거
    };

    const observerCallback = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible"); // visible 클래스 추가
          observer.unobserve(entry.target); // 한 번 나타난 섹션은 다시 감지하지 않음
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach(section => observer.observe(section));
  };

  // 페이지 초기 로드 시 섹션 감지 시작
  observeSections();

  // 기존 이벤트 리스너들 유지
  const currentLanguage = localStorage.getItem("language") || "ko";
  const currentPage = localStorage.getItem("currentPage") || "page1.html";

  document.getElementById("sbxLanguage").value = currentLanguage;
  loadPage(`${domain}/src/html/${currentLanguage}/${currentPage}`);

  document.getElementById("btnLogo").addEventListener("click", () => {});

  document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      loadPage(`${domain}/src/html/${currentLanguage}/${this.getAttribute("data-page")}`);
      localStorage.setItem("currentPage", this.getAttribute("data-page"));
    });
  });

  document.getElementById("sbxLanguage").addEventListener("change", function () {
    const selectedLanguage = this.value;
    localStorage.setItem("language", selectedLanguage);

    if (selectedLanguage === "ko") {
      location.href = `${domain}/index.html`;
    } else {
      location.href = `${domain}/src/html/${selectedLanguage}/index.html`;
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
