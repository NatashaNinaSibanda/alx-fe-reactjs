import axios from "axios";


export const searchUsers = async (username, location, minRepos) => {
  try {
  
    let query = "";

    if (username) query += `${username} in:login`;
    if (location) query += ` location:${location}`;
    if (minRepos) query += ` repos:>${minRepos}`;


    const url = `https://api.github.com/search/users?q=${query}`;

    const response = await axios.get(url);

  
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




