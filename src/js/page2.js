window.onload = function () {
    document.querySelectorAll('[name="kakao"]').forEach(button => {
        button.addEventListener('click', () => {
          window.open('http://pf.kakao.com/_biTSG/chat', '_blank');
        });
      });
}  