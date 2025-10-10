import axios from "axios";

/**
 * Search GitHub users by username, location, and minimum repositories.
 * @param {string} username - GitHub username query
 * @param {string} location - GitHub user location
 * @param {number} minRepos - Minimum number of public repositories
 * @returns {Promise<Array>} - Array of enriched user objects
 */
export const searchUsers = async (username, location, minRepos) => {
  try {
    
    let query = "";
    if (username) query += `${username} in:login`;
    if (location) query += ` location:${location}`;
    if (minRepos) query += ` repos:>${minRepos}`;

    const url = `https://api.github.com/search/users?q=${encodeURIComponent(query)}`;

    
    const response = await axios.get(url);
    const users = response.data.items;

    
    return await enrichUsers(users);
  } catch (error) {
    console.error("Error searching users:", error);
    throw error;
  }
};

/**
 * Enrich users with location and public repository count.
 * @param {Array} users - Array of GitHub user objects from search
 * @returns {Promise<Array>} - Array of enriched user objects
 */
export const enrichUsers = async (users) => {
  try {
    const enriched = await Promise.all(
      users.map(async (user) => {
        const res = await axios.get(`https://api.github.com/users/${user.login}`);
        return {
          id: user.id,
          login: user.login,
          avatar_url: user.avatar_url,
          html_url: user.html_url,
          location: res.data.location || "N/A",
          public_repos: res.data.public_repos,
        };
      })
    );
    return enriched;
  } catch (error) {
    console.error("Error enriching users:", error);
    throw error;
  }
};





