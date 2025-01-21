window.onload = function () {
  document.querySelectorAll('.button-style1').forEach(button => {
    button.addEventListener('click', () => {
      const targetSection = document.getElementById(button.dataset.target);
      
      // 대상 섹션의 위치 계산
      const targetPosition = targetSection.getBoundingClientRect().top

      // 부모창에서 스크롤 이동
      window.parent.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    });
  });
}
