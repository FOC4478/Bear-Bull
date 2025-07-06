   const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('active');
  });



  document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("community-container");

  fetch("php/getCommunityPosts.php")
    .then(response => response.json())
    .then(posts => {
      if (posts.length === 0) {
        container.innerHTML = "<p>No posts yet. Be the first to contribute!</p>";
        return;
      }

      posts.forEach(post => {
        const div = document.createElement("div");
        div.className = "community-post";
        div.innerHTML = `
          <h3>${post.title}</h3>
          <p>${post.content}</p>
          <div class="post-meta">Posted by ${post.author || "Anonymous"} on ${post.date}</div>
        `;
        container.appendChild(div);
      });
    })
    .catch(err => {
      console.error("Error fetching community posts:", err);
      container.innerHTML = "<p>Error loading posts.</p>";
    });
});

//   const observer = new IntersectionObserver(entries => {
//     entries.forEach(entry => {
//       if (entry.isIntersecting) {
//         entry.target.classList.add('visible');
//       }
//     });
//   }, { threshold: 0.1 });

//   document.querySelectorAll('section').forEach(sec => observer.observe(sec));

