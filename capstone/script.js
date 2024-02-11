/**
 * Fetches posts data from jsonplaceholder
 * Fectches comment data when expand button is clicked
 * Provides filtering for posts based on a search term.
 * Handles errors during fetching and displaying of posts.
 */

document.addEventListener("DOMContentLoaded", function () {
  /** @type {HTMLElement} */
  const mainElement = document.querySelector("main");
  /** @type {HTMLInputElement} */
  const searchInput = document.getElementById("searchInput");
  /** @type {HTMLButtonElement} */
  const searchButton = document.getElementById("searchButton");

  // Function to toggle loading class
  function toggleLoading(isLoading) {
    if (isLoading) {
      mainElement.classList.add("loading");
    } else {
      mainElement.classList.remove("loading");
    }
  }

  //Fetch posts data from jsonplaceholder api
  fetch("https://jsonplaceholder.typicode.com/posts")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((posts) => {
      try {
        displayPosts(posts);
      } catch (error) {
        console.error("Error displaying posts:", error.message);
        // Handle display error
      }

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
  /**
   * Displays posts in the main element.
   *
   * @param {Array<Object>} posts - An array of post objects to be displayed.
   */
  function displayPosts(posts) {
    mainElement.innerHTML = "";
    posts.forEach((post) => {
      const postElement = document.createElement("div");
      postElement.classList.add("content_section");
      // Introduce error handling for TypeError
      try {
        postElement.innerHTML = `<h2 class="content_head">${post.title}</h2>
        <p class="content_body">${post.body}
        <div class="comment_row">Comments: 
        <button type="button" class="comment_button">Expand</button></div></p>`;
      } catch (error) {
        console.error("TypeError:", error.message);
        return; // Skip this post if there's a TypeError
      }
      // creates the posts if ok
      mainElement.appendChild(postElement);
      /**
       * Displays comments after comment button is pressed
       */
      const commentButton = postElement.querySelector(".comment_button");
      commentButton.addEventListener("click", function () {
        const commentBox = postElement.querySelector(".comment_box");
        if (commentBox) {
          commentBox.remove();
          commentButton.textContent = "Expand";
        } else {
          const postId = post.id;
          fetch(
            `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
          )
            .then((response) => {
              // checks for network errors. if nothing is found, returns "no response from Network"
              if (!response.ok) {
                throw new Error("No response from Network");
              }
              return response.json(); // returns if successful
            })
            // code creating each section via data pulled from jsonplaceholder
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

                // 2 containers to enable better displayflex control
                commentBoxsmall.appendChild(commentContainer1);
                commentBoxsmall.appendChild(commentContainer2);

                commentBox.appendChild(commentBoxsmall);
              });
              postElement.appendChild(commentBox);
              commentButton.textContent = "Collapse";
            })
            .catch((error) => console.error("Error fetching comments:", error));
        }
      });
    });
  }
});
