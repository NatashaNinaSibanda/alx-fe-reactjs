import React, { useState } from "react";
import SearchComponent from "./components/SearchComponent"; // use the canvas copy
import { searchUsers, enrichUsers } from "./services/githubService";
import UserCard from "./components/UserCard";

export default function App() {
  const [users, setUsers] = useState([]);
  const [criteria, setCriteria] = useState({ username: "", location: "", minRepos: null });
  const [page, setPage] = useState(1);
  const [perPage] = useState(12);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function runSearch(criteriaFromForm) {
    setError("");
    setLoading(true);
    try {
      const payload = {
        username: criteriaFromForm.username || "",
        location: criteriaFromForm.location || "",
        minRepos: criteriaFromForm.minRepos ?? null,
        page: 1,
        per_page: perPage
      };
      const res = await searchUsers(payload);
      const enriched = await enrichUsers(res.items, 8); // enrich top 8 results
      setUsers(enriched);
      setTotal(res.total_count);
      setPage(1);
      setCriteria(payload);
    } catch (err) {
      console.error(err);
      setError("Search failed. Check console or your network/GitHub token.");
    } finally {
      setLoading(false);
    }
  }

  async function loadMore() {
    setLoading(true);
    setError("");
    try {
      const nextPage = page + 1;
      const res = await searchUsers({ ...criteria, page: nextPage, per_page: perPage });
      const enriched = await enrichUsers(res.items, 8);
      setUsers(prev => [...prev, ...enriched]);
      setPage(nextPage);
    } catch (err) {
      console.error(err);
      setError("Could not load more results.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <SearchComponent onSearch={runSearch} />
      {error && <div className="text-red-600 mt-4">{error}</div>}

      <div className="mt-6">
        {loading && <div className="text-sm text-gray-500">Loading...</div>}

        {!loading && users.length === 0 && <div className="text-gray-600 mt-4">No results — try a different query.</div>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {users.map(u => (
            <UserCard key={u.id} user={u} />
          ))}
        </div>

        {users.length > 0 && users.length < total && (
          <div className="flex justify-center mt-6">
            <button
              onClick={loadMore}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? "Loading..." : "Load more"}
            </button>
          </div>
        )}

        {total > 0 && (
          <p className="text-sm text-gray-500 mt-3">
            Showing {users.length} of {total} results.
          </p>
        )}
      </div>
    </div>
  );
}


