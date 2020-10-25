import React from 'react';
//for pushing to router history ect
import { BrowserRouter as Router, Route } from 'react-router-dom';
//container moves everything to the middle
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen'

const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        {/* container help centers everything */}
        <Container>
          <Route path='/' exact component={HomeScreen} />
          <Route path='/product/:id' exact component={ProductScreen} />

        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
