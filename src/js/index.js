const domain = 'http://127.0.0.1:5501';

document.addEventListener("DOMContentLoaded", function () {
  const loadPage = async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("페이지를 불러올 수 없습니다.");
      const html = await response.text();
      document.getElementById("mainContent").innerHTML = html;
    } catch (error) {
      document.getElementById("mainContent").innerHTML = `<h1>오류</h1><p>${error.message}</p>`;
    }
  };

  // 페이지 세팅
  const currentLanguage = localStorage.getItem("language") || "ko"; 
  const currentPage = localStorage.getItem("currentPage") || "page1.html"; 

  document.getElementById("sbxLanguage").value = currentLanguage;
  loadPage(`${domain}/src/html/${currentLanguage}/${currentPage}`);

  // 상단 메뉴 클릭 이벤트
  document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", function (event) {
      event.preventDefault(); // 기본 링크 이동 방지

      loadPage(`${domain}/src/html/${currentLanguage}/${this.getAttribute("data-page")}`);

      localStorage.setItem("currentPage", this.getAttribute("data-page"));
    });
  });

  // 언어 변경 시 페이지 갱신
  document.getElementById("sbxLanguage").addEventListener("change", function () {
    const selectedLanguage = this.value; 
    localStorage.setItem("language", selectedLanguage);

    console.log(selectedLanguage);

    if (selectedLanguage === "ko") {
      location.href = `${domain}/index.html`; 
    } else {
      location.href = `${domain}/src/html/${selectedLanguage}/index.html`;
    }
  });
});
