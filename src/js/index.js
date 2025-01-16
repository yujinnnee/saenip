const domain = 'http://127.0.0.1:5501';
//const domain = 'https://yujinnnee.github.io/saenip/';

document.addEventListener("DOMContentLoaded", function () {

  // 멤버 변수 선언
  const header = document.querySelector('.header');            // 헤더
  const footer = document.querySelector(".footer");            // 푸터
  const overlay = document.querySelector('.overlay');          // 오버레이
  const iframe = document.querySelector(".main-iframe");       // iframe
  const mainContent = document.querySelector(".main-content"); // 메인 컨텐츠
  const hamberger = document.getElementById('hamburgerBtn');   // 햄버거 버튼
  const sbxLanguage = document.getElementById("sbxLanguage");  // 언어 선택 박스
  const navA = document.querySelectorAll("nav a");             // 네비게이션 a 태그

  // 변경시점 저장 변수
  let changeWidth = 0;                                         // 화면 넓이 변경 변수

  // 언어와 페이지 불러오기
  const [language, page] = window.location.search.substring(1).split('?');

  // 스토리지 초기화
  if (language && language.trim()) localStorage.setItem("language", language.trim());
  else localStorage.setItem("language", "ko");
  if (language && language.trim()) localStorage.setItem("currentPage", `${page.trim()}.html`);
  else localStorage.setItem("currentPage", "page1.html");

  // 페이지 불러오기
  ChangeLanguage();
  LoadPage();

  // 함수 설정

  // 페이지 불러오기 함수
  function LoadPage() {
    try {

      const page = localStorage.getItem("currentPage");
      const language = localStorage.getItem("language");

      // iframe src 설정
      iframe.src = `${domain}/src/pages/${language}/${page}`;

      // URL 업데이트
      history.pushState({ page: page }, '', `?${language}?${page.replace('.html', '')}`);

      // iframe 로드 시
      iframe.onload = () => {
        // iframe 높이 업데이트
        UpdateIframeHeight();

        const sections = iframe.contentDocument.querySelectorAll("section"); // iframe 내 섹션들 선택
        SectionEvent(sections); // 섹션 감시 시작

        window.scrollTo(0, 0); // 페이지 상단으로 이동
      };
    } catch (error) {
      document.getElementById("mainContent").innerHTML = `<h1>오류</h1><p>${error.message}</p>`; // 오류 발생 시 메시지 표시
    }
  }

  // iframe 높이 업데이트 함수
  function UpdateIframeHeight() {
    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
    if (iframeDoc && iframeDoc.body) {
      mainContent.style.height = `${iframeDoc.body.scrollHeight + footer.offsetHeight}px`;
    }
  }

  // 섹션 이벤트 함수
  function SectionEvent(sections) {
    const observerOptions = {
      root: null,
      threshold: 0.1, // 10% 보이면 콜백 실행
    };

    const observerCallback = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible"); // 섹션이 보이면 'visible' 클래스 추가
          observer.unobserve(entry.target); // 감시 해제
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach(section => observer.observe(section)); // 각 섹션을 감시
  }

  // 메뉴 스타일 변경 함수
  function ChangeMenuStyle() {
    const headerFullWidth = header.scrollWidth;    // 가려진 부분을 포함한 전체 넓이
    const screenWidthWithoutScrollbar = document.documentElement.clientWidth;    // 화면 넓이

    // 화면 넓이가 줄어들었을 때
    if (headerFullWidth > screenWidthWithoutScrollbar) {
      changeWidth = headerFullWidth;
      MobileMenu();
    }
    // 화면넓이가 늘어났을 때
    else if (changeWidth < headerFullWidth) {
      WebMenu();
    }
  }

  // 언어 변경 함수
  function ChangeLanguage() {
    // 변경할 요소 리스트 불러오기
    const elements = document.querySelectorAll('[data-text-key]');

    // 언어 불러오기
    const language = localStorage.getItem("language");

    // 언어에 따라 텍스트 변경
    elements.forEach(element => {
      const key = element.getAttribute('data-text-key');
      if (languages[language] && languages[language][key]) {
        element.innerHTML = languages[language][key];  // 해당 언어로 텍스트 업데이트
      }
    });

    // 언어 변경시에도 resize 이벤트 발생
    ChangeMenuStyle();
  }
  // 모바일 메뉴바로 변경 함수
  function MobileMenu() {
    header.classList.add('small-screen');
    overlay.classList.toggle('small-screen'); // 오버레이 표시/숨기기
  }

  // 웹 메뉴바로 변경 함수
  function WebMenu() {
    header.classList.remove('small-screen', 'open');
    overlay.classList.remove('small-screen', 'open');
  }


  // 햄버거 메뉴 열기 함수
  function MenuOpen() {
    header.classList.toggle('open');
    overlay.classList.toggle('open');
  }

  // 햄버거 메뉴 닫기 함수
  function MenuClose() {
    header.classList.remove('open');
    overlay.classList.remove('open');
  }

  // 이벤트 설정

  // nav a 버튼 클릭 이벤트
  navA.forEach(link => link.addEventListener("click", event => {
    try {
      // a 이벤트 막기
      event.preventDefault();

      // 스토리지에 저장
      localStorage.setItem("currentPage", event.currentTarget.getAttribute("data-page"));
    } catch (error) {
      console.log(`페이지 저장 실패 : ${error.message}`);
    }
    // 페이지 로드
    LoadPage();
  }));

  // 언어 선택 박스 변경 이벤트
  sbxLanguage.addEventListener("change", () => {
    try {
      // 스토리지에 저장
      localStorage.setItem("language", sbxLanguage.value);
    } catch (error) {
      console.log(`언어 변경 실패 : ${error.message}`);
    }
    // 언어 변경
    ChangeLanguage();
    // 페이지 로드
    LoadPage();
  });

  // 햄버거 메뉴 클릭 이벤트
  hamberger.addEventListener('click', () => {
    if (header.classList.contains('open')) MenuClose(); // 메뉴가 열려 있다면 닫기
    else MenuOpen(); // 메뉴가 닫혀 있다면 열기
  });

  // overlay 클릭 이벤트
  overlay.addEventListener('click', MenuClose);

  // 스크롤 이벤트
  window.addEventListener("scroll", () =>
    /* classList.toggle 메서드의 두 번째 매개변수는 조건을 기반으로 클래스를 추가하거나 제거하는 기능을 제공합니다. 따라서 remove가 없어지더라도 동일하게 동작합니다. */
    header.classList.toggle("scrolled", window.scrollY > 0)
  );

  // 페이지 로드시 이벤트
  window.addEventListener('load', ChangeMenuStyle);

  // 페이지 변경 시 이벤트
  window.addEventListener('resize', () => {
    // iframe 높이 변경
    UpdateIframeHeight();
    // 메뉴 스타일 변경
    ChangeMenuStyle();
  });
});

// index 화면 언어 설정
const languages = {
  ko: {
    logo: "SAENIP",
    home: "홈",
    domesticServices: "국내 서비스 소개",
    domesticPricing: "국내 요금 안내",
    internationalServices: "해외 서비스 소개",
    internationalPricing: "해외 요금 안내",
    inquiry: "견적문의 및 오시는 길",
    kakaoConsultation: "카카오톡 상담문의",
    languageKorean: "한국어",
    languageEnglish: "English",
    languageChinese: "中文",
    companyInfo: "(주)새닢&nbsp;&nbsp;&nbsp;대표자: 손재봉&nbsp;&nbsp;&nbsp;사업자번호: 121-81-99283",
    contactInfo: "대표 전화: 010-2565-4892&nbsp;&nbsp;&nbsp;대표 메일: saenipkorea@daum.net",
    inquiryBtn: "견적문의 및 오시는 길"
  },
  en: {
    logo: "SAENIP",
    home: "Home",
    domesticServices: "Domestic Services",
    domesticPricing: "Domestic Pricing",
    internationalServices: "International Services",
    internationalPricing: "International Pricing",
    inquiry: "Inquiry and Directions",
    kakaoConsultation: "KakaoTalk Consultation",
    languageKorean: "Korean",
    languageEnglish: "English",
    languageChinese: "Chinese",
    companyInfo: "(주)SAENIP&nbsp;&nbsp;&nbsp;CEO: Jaebong Son&nbsp;&nbsp;&nbsp;Business Number: 121-81-99283",
    contactInfo: "Main Phone: 010-2565-4892&nbsp;&nbsp;&nbsp;Email: saenipkorea@daum.net",
    inquiryBtn: "Inquiry and Directions"
  },
  zh: {
    logo: "SAENIP",
    home: "首页",
    domesticServices: "国内服务介绍",
    domesticPricing: "国内费用指南",
    internationalServices: "国际服务介绍",
    internationalPricing: "国际费用指南",
    inquiry: "询价与方向",
    kakaoConsultation: "KakaoTalk 咨询",
    languageKorean: "韩语",
    languageEnglish: "英语",
    languageChinese: "中文",
    companyInfo: "(주)SAENIP&nbsp;&nbsp;&nbsp;CEO: Son Jaebong&nbsp;&nbsp;&nbsp;公司注册号: 121-81-99283",
    contactInfo: "联系电话: 010-2565-4892&nbsp;&nbsp;&nbsp;邮箱: saenipkorea@daum.net",
    inquiryBtn: "询价与方向"
  }
};