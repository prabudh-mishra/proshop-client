import React, { useEffect } from 'react';
import {
	Button,
	Card,
	Col,
	Form,
	Image,
	ListGroup,
	Row,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Message from '../components/Message';

import { FaTrash } from 'react-icons/fa';

import { addToCart, removeFromCart } from '../data/actions/cartActions';

const CartPage = ({ match, location, history }) => {
	const productId = match.params.id;
	const qty = location.search ? Number(location.search.split('=')[1]) : 1;

	const dispatch = useDispatch();

	const cart = useSelector((state) => state.cart);
	const { cartItems } = cart;

	useEffect(() => {
		if (productId) {
			dispatch(addToCart(productId, qty));
		}
	}, [dispatch, productId, qty]);

	const removeFromCartHandler = (id) => {
		dispatch(removeFromCart(id));
	};

	const checkoutHandler = () => {
		console.log('checking out...');
		history.push('login?redirect=shipping');
	};

	return (
		<>
			<Row>
				<Col md={8}>
					<h1>Shopping cart</h1>

					{cartItems.length === 0 ? (
						<Message>
							Your cart is empty <Link to='/'>Go Back</Link>
						</Message>
					) : (
						<ListGroup variant='flush'>
							{cartItems.map((item) => (
								<ListGroup.Item key={item.product}>
									<Row>
										<Col md={2}>
											<Image src={item.image} alt={item.name} fluid rounded />
										</Col>
										<Col md={3}>
											<Link to={`/product/${item.product}`}>{item.name}</Link>
										</Col>
										<Col md={2}>${item.price}</Col>
										<Col md={2}>
											<Form.Control
												as='select'
												value={item.qty}
												onChange={(e) =>
													dispatch(
														addToCart(item.product, Number(e.target.value))
													)
												}
											>
												{[...Array(item.countInStock).keys()].map((x) => (
													<option key={x + 1} value={x + 1}>
														{x + 1}
													</option>
												))}
											</Form.Control>
										</Col>
										<Col md={2}>
											<Button
												variant='light'
												onClick={() => {
													removeFromCartHandler(item.product);
												}}
											>
												<FaTrash />
											</Button>
										</Col>
									</Row>
								</ListGroup.Item>
							))}
						</ListGroup>
					)}
				</Col>

				<Col md={4}>
					<Card>
						<ListGroup variant='flush'>
							<ListGroup.Item>
								<h2>
									Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}
									) items
								</h2>
								${cartItems.reduce((acc, item) => acc + item.price, 0)}
							</ListGroup.Item>

							<ListGroup.Item>
								<Button
									className='w-100'
									disabled={cartItems.length === 0}
									onClick={checkoutHandler}
								>
									Proceed to checkout
								</Button>
							</ListGroup.Item>
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</>
	);
};

export default CartPage;
