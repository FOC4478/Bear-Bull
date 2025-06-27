const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
  question.addEventListener('click', () => {
    const answer = question.nextElementSibling;
    const arrow = question.querySelector('.arrow');

    answer.classList.toggle('open');
    arrow.classList.toggle('rotate');

    const hamburger = document.querySelector('.hambuger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
});
});












  
