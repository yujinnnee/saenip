window.onload = function () {
  document.querySelectorAll('[name="kakao"]').forEach(button => {
    const handler = () => {
      if(button.textContent.includes('문의')){
        window.open('http://pf.kakao.com/_biTSG/chat', '_blank');
      }
    };
  
    button.addEventListener('click', handler);
  });
}  