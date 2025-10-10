import axios from "axios";

// Base URL for GitHub API
const BASE_URL = "https://api.github.com/search/users";

/**
 * Search GitHub users with advanced filters.
 * @param {string} username - The username to search for.
 * @param {string} location - The location filter.
 * @param {string|number} minRepos - Minimum repository count filter.
 * @returns {Promise<Array>} A list of matching users.
 */
export const searchUsers = async (username, location, minRepos) => {
  try {
    // Build the query string
    let query = "";

    if (username) query += `${username} in:login`;
    if (location) query += ` location:${location}`;
    if (minRepos) query += ` repos:>${minRepos}`;

    const response = await axios.get(`${BASE_URL}?q=${query}`);

    // Return simplified user data
    return response.data.items.map((user) => ({
      id: user.id,
      login: user.login,
      avatar_url: user.avatar_url,
      html_url: user.html_url,
    }));
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};



