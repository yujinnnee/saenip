document.addEventListener("DOMContentLoaded", () => {
  const mainContent = document.getElementById("mainContent");

  const loadPage = async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("페이지를 불러올 수 없습니다.");
      const html = await response.text();
      mainContent.innerHTML = html;
    } catch (error) {
      mainContent.innerHTML = `<h1>오류</h1><p>${error.message}</p>`;
    }
  };

  document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", event => {
      event.preventDefault(); // 기본 링크 이동 방지

      const page = './src/html/' + event.target.getAttribute("data-page");
      loadPage(page);
    });
  });

  // 기본 페이지
  loadPage("./src/html/page1.html");
});
