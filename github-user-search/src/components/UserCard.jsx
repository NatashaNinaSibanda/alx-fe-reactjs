import React from "react";

const UserCard = ({ user }) => {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all p-4 flex flex-col items-center text-center">
      <img
        src={user.avatar_url}
        alt={user.login}
        className="w-24 h-24 rounded-full mb-4 border-2 border-blue-500"
      />
      <h3 className="text-lg font-semibold">{user.login}</h3>
      {user.location && <p className="text-gray-500">{user.location}</p>}
      <p className="text-gray-600 text-sm">Repos: {user.public_repos ?? "N/A"}</p>
      <a
        href={user.html_url}
        target="_blank"
        rel="noreferrer"
        className="mt-3 text-blue-600 hover:underline"
      >
        View Profile
      </a>
    </div>
  );
};

export default UserCard;

