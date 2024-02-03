document.addEventListener("DOMContentLoaded", function () {
  const mainElement = document.querySelector("main");
  const searchInput = document.getElementById("searchInput");
  const searchButton = document.getElementById("searchButton");

  fetch("https://jsonplaceholder.typicode.com/posts")
    .then((response) => response.json())
    .then((posts) => {
      // display the posts first; its posts as thats what the website calls it
      displayPosts(posts);

      //   Eventlistener for inputs and filter
      searchButton.addEventListener("click", function () {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredPosts = posts.filter((post) =>
          post.title.toLowerCase().includes(searchTerm)
        );
        displayPosts(filteredPosts);
      });
    })
    .catch((error) => console.error("Error fetching posts:", error));
  // the we display them again:
  function displayPosts(posts) {
    //    clear them?
    mainElement.innerHTML = "";
    // create  the posts and put them on the page.
    posts.forEach((post) => {
      const postElement = document.createElement("div");
      postElement.classList.add("content_section");
      postElement.innerHTML = `<h2>${post.title}</h2>
        <p class="content_body">${post.body}</p><button type="button" class="post-button">See Comments</button>`;

      mainElement.appendChild(postElement);
    });
  }
});
