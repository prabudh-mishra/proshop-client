import React from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// components
import Footer from './components/Footer';
import Header from './components/Header';

//pages
import CartPage from './pages/CartPage';
import HomePage from './pages/HomePage';
import ProductDetailsPage from './pages/ProductDetailsPage';

function App() {
	return (
		<Router>
			<Header />

			<Container>
				<main>
					<Route exact path='/' component={HomePage} />
					<Route exact path='/product/:id' component={ProductDetailsPage} />
					<Route exact path='/cart' component={CartPage} />
					<Route exact path='/cart/:id' component={CartPage} />
				</main>
			</Container>

			<Footer />
		</Router>
	);
}

export default App;
