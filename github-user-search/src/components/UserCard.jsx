// src/components/UserCard.jsx
import React from "react";

export default function UserCard({ user }) {
  // enriched results will have user.details
  const details = user.details || {};
  return (
    <div className="p-4 bg-white rounded-xl shadow-sm border">
      <div className="flex items-center gap-4">
        <img src={user.avatar_url} alt={user.login} className="w-16 h-16 rounded-full" />
        <div className="flex-1">
          <a
            href={user.html_url}
            target="_blank"
            rel="noreferrer"
            className="text-lg font-semibold hover:underline"
          >
            {user.login}
          </a>
          <div className="text-sm text-gray-500">
            {details.location || "Location not available"}
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
        <div>Repos: {details.public_repos ?? "N/A"}</div>
        <div>Followers: {details.followers ?? "N/A"}</div>
      </div>

      {details.bio && <p className="mt-2 text-sm text-gray-700">{details.bio}</p>}
    </div>
  );
}
