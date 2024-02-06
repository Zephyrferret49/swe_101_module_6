document.addEventListener("DOMContentLoaded", function () {
  const mainElement = document.querySelector("main");
  const searchInput = document.getElementById("searchInput");
  const searchButton = document.getElementById("searchButton");

  fetch("https://jsonplaceholder.typicode.com/posts")
    .then((response) => response.json())
    .then((posts) => {
      displayPosts(posts);
    })
    .catch((error) => console.error("Error fetching posts:", error));

  function displayPosts(posts) {
    mainElement.innerHTML = "";
    posts.forEach((post) => {
      const postElement = document.createElement("div");
      postElement.classList.add("content_section");
      postElement.innerHTML = `<h2>${post.title}</h2>
        <p class="content_body">${post.body}</p><button type="button" class="comment_button">See Comments</button>`;
      mainElement.appendChild(postElement);

      const commentButton = postElement.querySelector(".comment_button");
      commentButton.addEventListener("click", function () {
        const commentBox = postElement.querySelector(".comment_box");
        if (commentBox) {
          commentBox.remove();
        } else {
          const postId = post.id;
          fetch(
            `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
          )
            .then((response) => response.json())
            .then((comments) => {
              const commentBox = document.createElement("div");
              commentBox.classList.add("comment_box");
              comments.forEach((comment) => {
                const commentpostId = document.createElement("div");
                commentpostId.textContent = comment.id;

                const commentEmail = document.createElement("div");
                commentEmail.textContent = comment.email;

                const commentName = document.createElement("div");
                commentName.textContent = comment.name;

                const commentBody = document.createElement("div");
                commentBody.textContent = comment.body;

                const commentContainer = document.createElement("div");
                commentContainer.classList.add("comment");
                commentContainer.appendChild(commentpostId);
                commentContainer.appendChild(commentEmail);
                commentContainer.appendChild(commentName);
                commentContainer.appendChild(commentBody);

                commentBox.appendChild(commentContainer);
              });
              postElement.appendChild(commentBox);
            })
            .catch((error) => console.error("Error fetching comments:", error));
        }
      });
    });
  }
});
