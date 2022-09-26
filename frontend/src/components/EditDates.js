import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  Form,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import CheckoutSteps from "../components/CheckoutSteps";
import { createBook } from "../actions/bookActions";
import { BOOK_CREATE_RESET } from "../constants/bookConstants";
import { USER_DETAILS_RESET } from "../constants/userConstants";

const EditDates = ({ history }) => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);

  if (!cart.patientInfo.address) {
    history.push("/shipping");
  } else if (!cart.paymentMethod) {
    history.push("/payment");
  }
  //   Calculate prices
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );
  cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100);
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

  const [booking, setBook] = useState("");
  const placeBookHandler = () => {
    dispatch(
      createBook({
        bookItems: cart.cartItems,
        patientInfo: cart.patientInfo,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        bookDate: booking,
        totalPrice: cart.totalPrice,
      })
    );
  };

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address:</strong>
                {cart.patientInfo.address}, {cart.patientInfo.city}{" "}
                {cart.patientInfo.postalCode}, {cart.patientInfo.country}
              </p>
            </ListGroup.Item>
            <Form.Group controlId="booking">
              <Form.Label>Book</Form.Label>
              <Form.Control
                type="Date"
                value={booking}
                onChange={(e) => setBook(e.target.value)}
              ></Form.Control>
              <p style={{ paddingTop: 20 }}>
                You have chosen the following date: {booking}
              </p>
            </Form.Group>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <strong>Method: </strong>
              {cart.paymentMethod}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Book Items</h2>
              {cart.cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup variant="flush">
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
                        <Col md={4}>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Book Summary</h2>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {error && <Message variant="danger">{error}</Message>}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cart.cartItems === 0}
                  onClick={placeBookHandler}
                >
                  Place Book
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default EditDates;
