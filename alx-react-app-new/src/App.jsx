import Header from "./components/Header";
import UserProfile from "./components/UserProfile";
import MainContent from "./components/MainContent";
import Footer from "./components/Footer";

function App() {
  return (
    <div>
      <Header />
      <MainContent />
      <UserProfile 
        name="Natasha" 
        age={25} 
        bio="I love exploring new cities, learning React, and building cool projects." 
      />
      <Footer />
    </div>
  );
}

export default App;
