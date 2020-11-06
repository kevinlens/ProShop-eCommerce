import React from 'react';
//for pushing to router history ect
import { BrowserRouter as Router, Route } from 'react-router-dom';
//container moves everything to the middle
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';

const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        {/* container help centers everything */}
        <Container>
          <Route path='/login' exact component={LoginScreen} />
          <Route path='/register' exact component={RegisterScreen} />
          <Route path='/shipping' exact component={ShippingScreen} />
          <Route path='/placeorder' exact component={PlaceOrderScreen} />
          <Route path='/payment' exact component={PaymentScreen} />
          <Route path='/order/:id' exact component={OrderScreen} />
          <Route path='/profile' exact component={ProfileScreen} />
          <Route path='/product/:id' exact component={ProductScreen} />
          <Route path='/cart/:id?' exact component={CartScreen} />
          <Route path='/' exact component={HomeScreen} />
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
