import axios from "axios"; 

const GITHUB_API_URL = "https://api.github.com/users";
const TOKEN = import.meta.env.VITE_APP_GITHUB_API_KEY || "";

export const fetchUserData = async (username) => {
  try {
    const response = await axios.get(`${GITHUB_API_URL}/${username}`, {
      headers: {
        Authorization: TOKEN ? `token ${TOKEN}` : "",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

