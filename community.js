const hamburger = document.querySelector('.hambuger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});



//   const observer = new IntersectionObserver(entries => {
//     entries.forEach(entry => {
//       if (entry.isIntersecting) {
//         entry.target.classList.add('visible');
//       }
//     });
//   }, { threshold: 0.1 });

//   document.querySelectorAll('section').forEach(sec => observer.observe(sec));

