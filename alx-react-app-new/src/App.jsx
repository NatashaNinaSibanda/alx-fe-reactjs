import React from "react";
import UserProfile from "./components/UserProfile";
import Header from "./components/Header";
import MainContent from "./components/MainContent";
import Footer from "./components/Footer";
import Counter from './components/Counter';

function App() {
  return (
    <div>
      <Header />
      <MainContent />
      <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", marginTop: "20px" }}>
        <UserProfile name="Alice" age={25} bio="Loves hiking and photography" />
        <UserProfile name="Bob" age={30} bio="Enjoys cooking and traveling" />
        <UserProfile name="Charlie" age={28} bio="Fan of music and tech gadgets" />
      </div>
      <Footer />
      <Counter />
    </div>
  );
}

export default App;


