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
      postElement.innerHTML = `<h2 class="content_head">${post.title}</h2>
        <p class="content_body">${post.body}
        <div class="comment_row">Comments: 
        <button type="button" class="comment_button">Expand</button></div></p>`;
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
                commentpostId.classList.add("comment_ID_style");
                commentpostId.textContent = comment.id + ".";

                const commentEmail = document.createElement("div");
                commentEmail.classList.add("comment_email_style");
                commentEmail.textContent = comment.email;

                const commentName = document.createElement("div");
                commentName.classList.add("comment_name_style");
                commentName.textContent = comment.name;

                const commentBody = document.createElement("div");
                commentBody.classList.add("comment_body_style");
                commentBody.textContent = comment.body;

                const commentContainer1 = document.createElement("div");
                commentContainer1.classList.add("comment_container_1");
                commentContainer1.appendChild(commentpostId);
                commentContainer1.appendChild(commentName);

                const commentContainer2 = document.createElement("div");
                commentContainer2.classList.add("comment_container_2");
                commentContainer2.appendChild(commentEmail);
                commentContainer2.appendChild(commentBody);

                const commentBoxsmall = document.createElement("div");
                commentBoxsmall.classList.add("comment_box_small");

                commentBoxsmall.appendChild(commentContainer1);
                commentBoxsmall.appendChild(commentContainer2);

                commentBox.appendChild(commentBoxsmall);
              });
              postElement.appendChild(commentBox);
            })
            .catch((error) => console.error("Error fetching comments:", error));
        }
      });
    });
  }
});
