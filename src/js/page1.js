window.onload = function () {
  document.querySelectorAll('[name="kakao"]').forEach(button => {
    const handler = () => {
      if(button.textContent.includes('문의')){
        window.open('http://pf.kakao.com/_biTSG/chat', '_blank');
      }
    };
  
    button.addEventListener('click', handler);
  });

      document.getElementById('btnDetail').addEventListener('click', () => {
        const parentDocument = window.parent.document; // 부모 화면에 접근
        const page3Element = parentDocument.getElementById('page3'); // 부모의 id="page3" 찾기
    
        if (page3Element) {
          page3Element.click(); // 부모 요소의 클릭 트리거
        } else {
          console.error('Page3 요소를 찾을 수 없습니다.');
        }
      });
}  