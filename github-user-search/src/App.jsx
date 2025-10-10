import React, { useState } from "react";
import Search from "./components/Search";
import { searchUsers, enrichUsers } from "./services/githubService";
import UserCard from "./components/UserCard";

const App = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (filters) => {
    setLoading(true);
    const basicResults = await searchUsers(filters);
    const detailedResults = await enrichUsers(basicResults);
    setUsers(detailedResults);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Search onSearch={handleSearch} />

      {loading ? (
        <p className="text-center mt-10 text-gray-600">Loading users...</p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
          {users.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;



