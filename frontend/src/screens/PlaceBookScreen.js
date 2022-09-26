import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  Form,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import CheckoutSteps from '../components/CheckoutSteps';
import { createBook } from '../actions/bookActions';
import { BOOK_CREATE_RESET } from '../constants/bookConstants';
import { USER_DETAILS_RESET } from '../constants/userConstants';

const PlaceBookScreen = ({ history }) => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);

  if (!cart.patientInfo.address) {
    history.push('/userdetail');
  } else if (!cart.paymentMethod) {
    history.push('/payment');
  }
  //   Calculate prices
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );

  cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)));
  cart.totalPrice = Number(cart.itemsPrice).toFixed(2);

  //DATE

  const bookCreate = useSelector((state) => state.bookCreate);
  const { book, success, error } = bookCreate;

  useEffect(() => {
    if (success) {
      history.push(`/book/${book._id}`);
      dispatch({ type: USER_DETAILS_RESET });
      dispatch({ type: BOOK_CREATE_RESET });
    }
    // eslint-disable-next-line
  }, [history, success]);

  const [booking, setBook] = useState('');
  const placeBookHandler = () => {
    dispatch(
      createBook({
        bookItems: cart.cartItems,
        patientInfo: cart.patientInfo,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,

        taxPrice: cart.taxPrice,
        bookDate: booking,
        followUpOneDate: '',
        followUpTwoDate: '',
        followUpThreeDate: '',
        totalPrice: cart.totalPrice,
      })
    );
  };

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={9}>
          <ListGroup variant='flush'>
            <Form.Group controlId='booking'>
              <Form.Label style={{ fontcolor: 'red' }}>
                Choose an appointment date!
              </Form.Label>
              <Form.Control
                type='Date'
                value={booking}
                onChange={(e) => setBook(e.target.value)}
              ></Form.Control>{' '}
              <Form.Label style={{ fontcolor: 'red' }}>
                <p></p>
                You will be informed about appointment TIME!
              </Form.Label>
              <p style={{ paddingTop: 60, fontSize: 18 }}>
                You have chosen the following date: {booking}
              </p>
            </Form.Group>

            <ListGroup.Item>
              {cart.cartItems.length === 0 ? (
                <Message>No doctor chosen!</Message>
              ) : (
                <ListGroup variant='flush'>
                  <h5>For an appointment with</h5>
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/appointment/${item.appointment}`}>
                            {item.name}
                          </Link>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4} style={{ paddingTop: 70 }}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <Button
                  type='button'
                  className='btn-block'
                  disabled={cart.cartItems === 0}
                  onClick={placeBookHandler}
                >
                  Continue
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceBookScreen;
