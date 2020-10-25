import React from "react";
//container moves everything to the middle
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";

const App = () => {
  return (
    <>
      <Header />
      <main className="py-3">
        {/* container help centers everything */}
        <Container>
          <HomeScreen />
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default App;
