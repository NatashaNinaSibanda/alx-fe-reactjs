// src/services/githubService.js
import axios from "axios";

const SEARCH_URL = "https://api.github.com/search/users";
const USER_URL = "https://api.github.com/users";
const TOKEN = import.meta.env.VITE_GITHUB_TOKEN || null;

const axiosInstance = axios.create({
  headers: TOKEN ? { Authorization: `token ${TOKEN}` } : {}
});

/**
 * searchUsers - calls GitHub search API with advanced parameters
 * @param {Object} opts - { username, location, minRepos, page, per_page }
 * @returns { items, total_count, rateLimit }
 */
export async function searchUsers(opts = {}) {
  const {
    username = "",
    location = "",
    minRepos = null,
    page = 1,
    per_page = 30
  } = opts;

  const parts = [];
  if (username && username.trim()) parts.push(username.trim());
  if (location && location.trim()) parts.push(`location:"${location.trim()}"`);
  if (Number.isInteger(minRepos)) parts.push(`repos:>${minRepos}`);
  // ensure we search users
  parts.push("type:user");

  const q = parts.join(" ");
  const url = `${SEARCH_URL}?q=${encodeURIComponent(q)}&page=${page}&per_page=${per_page}`;

  const res = await axiosInstance.get(url);
  const rateLimit = {
    remaining: res.headers["x-ratelimit-remaining"],
    limit: res.headers["x-ratelimit-limit"],
    reset: res.headers["x-ratelimit-reset"]
  };

  return {
    items: res.data.items || [],
    total_count: res.data.total_count || 0,
    rateLimit
  };
}

/**
 * getUserDetails - fetches user details (location, public_repos, bio, etc)
 */
export async function getUserDetails(username) {
  const res = await axiosInstance.get(`${USER_URL}/${encodeURIComponent(username)}`);
  return res.data;
}

/**
 * enrichUsers - fetch details for first `limit` users to avoid too many requests
 * - merges `details` object into each user: user.details = { public_repos, location, ... }
 */
export async function enrichUsers(users = [], limit = 10) {
  const toEnrich = users.slice(0, limit);
  const rest = users.slice(limit);

  const promises = toEnrich.map(u =>
    getUserDetails(u.login)
      .then(details => ({ ...u, details }))
      .catch(() => ({ ...u, details: null }))
  );

  const enriched = await Promise.all(promises);
  return [...enriched, ...rest];
}

