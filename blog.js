const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('active');
  });




// Scroll animation for fade-in effect
const fadeInElements = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.1
});

fadeInElements.forEach(el => observer.observe(el));


document.addEventListener("DOMContentLoaded", () => {
  const blogContainer = document.getElementById("blog-container");

  fetch("php/getBlogs.php")
    .then(response => response.json())
    .then(data => {
      if (data.length === 0) {
        blogContainer.innerHTML = "<p>No blog posts available.</p>";
        return;
      }

      data.forEach(post => {
        const blogItem = document.createElement("div");
        blogItem.className = "blog-post";

        blogItem.innerHTML = `
          <h3>${post.title}</h3>
          <p class="date">${post.date}</p>
          <p class="excerpt">${post.content.substring(0, 150)}...</p>
          <a href="blog-details.html?id=${post.id}" class="read-more">Read More</a>
        `;

        blogContainer.appendChild(blogItem);
      });
    })
    .catch(error => {
      console.error("Error loading blog posts:", error);
      blogContainer.innerHTML = "<p>Unable to load posts at the moment.</p>";
    });
});



