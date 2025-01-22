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

  setEqualButtonHeights();

  // 창 크기가 변경될 때도 높이를 동기화
  window.addEventListener('resize', setEqualButtonHeights);
  
  // 버튼들의 높이를 동기화하는 함수
  function setEqualButtonHeights() {
    const buttons = document.querySelectorAll('.container1 .buttons button');
    let maxHeight = 0;

    // 모든 버튼의 높이를 확인하여 가장 큰 값 저장
    buttons.forEach(button => {
      button.style.height = 'auto'; // 기존 높이 초기화
      const buttonHeight = button.offsetHeight;
      if (buttonHeight > maxHeight) {
        maxHeight = buttonHeight;
      }
    });

    // 모든 버튼에 동일한 높이 적용
    buttons.forEach(button => {
      button.style.height = `${maxHeight}px`;
    });
  }
}
