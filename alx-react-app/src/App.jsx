import React from 'react';
import UserProfile from './components/UserProfile';

function App() {
  return (
    <div>
      <h1>User Profiles</h1>
      <UserProfile name="Alice" age={25} bio="Loves hiking and photography" />
      <UserProfile name="Bob" age={30} bio="Enjoys coding and traveling" />
      <UserProfile name="Natasha" age={22} bio="Aspiring software engineer" />
    </div>
  );
}

export default App;
