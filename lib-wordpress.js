// Import required modules
import axios from "axios";

// Store the API URL and credentials
const WP_API_URL = process.env.WP_API_URL;
const WP_JWT_TOKEN = process.env.WP_JWT_TOKEN;

// Function to get the post list from WordPress instance
async function getPostList() {
  // Create an axios instance with the required authentication
  const wpApi = axios.create({
    baseURL: WP_API_URL,
    headers: { Authorization: "Bearer " + WP_JWT_TOKEN },
  });

  // Make a GET request to the WordPress REST API to fetch the post list
  const response = await wpApi.get("/wp/v2/posts");

  // Return the list of posts
  return response.data;
}

// Function to create a new post on the WordPress instance
async function createNewPost(
  title,
  content,
  metaDescription = "",
  categories = [],
  status = "publish"
) {
  // Create an axios instance with the required authentication
  const wpApi = axios.create({
    baseURL: WP_API_URL,
    headers: { Authorization: "Bearer " + WP_JWT_TOKEN },
  });

  // Set the post data
  const postData = {
    title,
    content: content,
    status,
    categories,
    excerpt: metaDescription,
  };

  // Make a POST request to the WordPress REST API to create the new post
  const response = await wpApi.post("/wp/v2/posts", postData);

  // Return the newly created post
  return response.data;
}

export { getPostList, createNewPost };
