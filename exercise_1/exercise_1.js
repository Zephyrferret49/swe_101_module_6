const fetchData = async () => {
  const settledResponse = await fetch("https://api.metacamp.so/learn/courses");
  const jsonResponse = await settledResponse.json();
  const data = jsonResponse.data.filter((course) =>
    course.name.includes("Fundamentals")
  );
  console.log(data);
  return data;
};

// https://jsonplaceholder.typicode.com/posts
// https://jsonplaceholder.typicode.com/comments?postId=1

fetchData();
