import React, { useEffect } from 'react';
import { Button, Card, Col, Image, ListGroup, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { getProductDetails } from '../data/actions/productActions';

import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';

const ProductDetailsPage = ({ match }) => {
	const dispatch = useDispatch();

	const productDetails = useSelector((state) => state.productDetails);
	const { product, loading, error } = productDetails;

	useEffect(() => {
		dispatch(getProductDetails(match.params.id));
	}, [dispatch, match]);

	return (
		<>
			<Link className='btn btn-dark my-3' to='/'>
				Go Back
			</Link>

			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<Row>
					<Col md={6}>
						<Image
							className='product-image'
							src={product.image}
							alt={product.name}
						/>
					</Col>

					<Col md={3}>
						<ListGroup variant='flush'>
							<ListGroup.Item>
								<h3>{product.name}</h3>
							</ListGroup.Item>
							<ListGroup.Item>
								<Rating
									value={product.rating}
									text={`${product.numReviews} reviews`}
								/>
							</ListGroup.Item>
							<ListGroup.Item>Price: ${product.price}</ListGroup.Item>
							<ListGroup.Item>
								Description: {product.description}
							</ListGroup.Item>
						</ListGroup>
					</Col>

					<Col md={3}>
						<Card>
							<ListGroup variant='flush'>
								<ListGroup.Item>
									<Row>
										<Col>Price:</Col>
										<Col>
											<strong>${product.price}</strong>
										</Col>
									</Row>
								</ListGroup.Item>
								<ListGroup.Item>
									<Row>
										<Col>Status:</Col>
										<Col>
											<strong>
												{product.countInStock > 0 ? 'In Stock' : 'Out of stock'}
											</strong>
										</Col>
									</Row>
								</ListGroup.Item>
								<ListGroup.Item>
									<Button
										className='w-100'
										disabled={product.countInStock === 0}
									>
										Add to cart
									</Button>
								</ListGroup.Item>
							</ListGroup>
						</Card>
					</Col>
				</Row>
			)}
		</>
	);
};

export default ProductDetailsPage;
