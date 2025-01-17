window.onload = function () {
  document.querySelectorAll('.button-style1').forEach(button => {
    button.addEventListener('click', () => {
      const targetSection = document.getElementById(button.dataset.target);

      targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}
