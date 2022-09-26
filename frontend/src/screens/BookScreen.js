import React, { useState, useEffect } from "react";
import axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import { Link } from "react-router-dom";
import { Row, Col, ListGroup, Image, Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {
  getBookDetails,
  payBook,
  deliverBook,
  followBook1,
  followBook2,
  followBook3,
  followBook4,
} from "../actions/bookActions";
import { BOOK_PAY_RESET, BOOK_DELIVER_RESET } from "../constants/bookConstants";
import { listBooks } from "../actions/bookActions";

const BookScreen = ({ match, history }) => {
  const bookId = match.params.id;
  const [isfollowUpOne, setIsfollowUpOne] = useState("");
  const [sdkReady, setSdkReady] = useState(false);

  const dispatch = useDispatch();

  const bookList = useSelector((state) => state.bookList);
  const { books } = bookList;

  const bookDetails = useSelector((state) => state.bookDetails);
  const { book, loading, error } = bookDetails;

  const bookPay = useSelector((state) => state.bookPay);
  const { loading: loadingPay, success: successPay } = bookPay;

  const bookDeliver = useSelector((state) => state.bookDeliver);
  const { loading: loadingDeliver, success: successDeliver } = bookDeliver;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }

    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (!book || successPay || successDeliver || book._id !== bookId) {
      dispatch({ type: BOOK_PAY_RESET });
      dispatch({ type: BOOK_DELIVER_RESET });
      dispatch(getBookDetails(bookId));
    } else if (!book.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, bookId, successPay, successDeliver, book, history, userInfo]);

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult);
    dispatch(payBook(bookId, paymentResult));
  };

  const deliverHandler = () => {
    dispatch(deliverBook(book));
  };

  const followHandler1 = () => {
    dispatch(followBook1(book));
  };

  const followHandler2 = () => {
    dispatch(followBook2(book));
  };
  const followHandler3 = () => {
    dispatch(followBook3(book));
  };
  const followHandler4 = () => {
    dispatch(followBook4(book));
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Patient Informations</h2>
              <p>
                <strong>Patient Id: </strong> {book._id}
              </p>
              <p>
                <strong>Name: </strong> {book.user.name}
              </p>
              <p>
                <strong>Email: </strong>{" "}
                <a href={`mailto:${book.user.email}`}>{book.user.email}</a>
              </p>
              <p>
                <strong>Age: </strong>
                {book.patientInfo.age}
              </p>
              <p>
                <strong>Phone: </strong>
                {book.patientInfo.phoneNumber}
              </p>
              <p>
                <strong>Address: </strong>
                {book.patientInfo.address}
              </p>
              <p>
                <strong>Health issues: </strong>
                {book.patientInfo.healthProblem}
              </p>
              {book.isDelivered ? (
                <Message variant="success">
                  Appointment Done! {book.deliveredAt}
                </Message>
              ) : (
                <Message variant="danger">
                  Appointment on {book.bookDate}. Make sure to go!
                </Message>
              )}{" "}
              {book.isfollowUpOne ? (
                <Message variant="success">
                  Follow Up One Done! {book.isfollowUpOne}
                </Message>
              ) : (
                <Message variant="danger">First Follow-Up Pending</Message>
              )}{" "}
              {book.isfollowUpTwo ? (
                <Message variant="success">
                  Follow Up Two Done! {book.isfollowUpTwo}
                </Message>
              ) : (
                <Message variant="danger">Second Follow-Up Pending</Message>
              )}{" "}
              {book.isfollowUpThree ? (
                <Message variant="success">
                  Third Follow-Up One Done! {book.isfollowUpThree}
                </Message>
              ) : (
                <Message variant="danger">Third Follow-Up Pending</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <p>Rs 100 Appointment Booking Fee</p>
              {book.isPaid ? (
                <Message variant="success">Paid!</Message>
              ) : (
                <Message variant="danger">Not Paid</Message>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Patient's Appointment</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Booking date:</Col>
                  <Col>{book.createdAt.substring(0, 10)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Appointment date</Col>
                  <Col>{book.bookDate}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>Rs{book.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {!book.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                  {!sdkReady ? (
                    <Loader />
                  ) : (
                    <PayPalButton
                      amount={book.totalPrice}
                      onSuccess={successPaymentHandler}
                    />
                  )}
                </ListGroup.Item>
              )}
              {loadingDeliver && <Loader />}
              {userInfo && userInfo.isAdmin && book.isPaid && (
                <ListGroup.Item>
                  <Button
                    type="button"
                    className="btn btn-block"
                    onClick={deliverHandler}
                  >
                    Mark Appointment as Attended
                  </Button>
                </ListGroup.Item>
              )}{" "}
              {loadingDeliver && <Loader />}
              {userInfo && userInfo.isAdmin && (
                <ListGroup.Item>
                  <Button
                    type="button"
                    className="btn btn-block"
                    onClick={followHandler1}
                  >
                    Set First Follow Up as Done
                  </Button>
                </ListGroup.Item>
              )}{" "}
              {loadingDeliver && <Loader />}
              {userInfo && userInfo.isAdmin && (
                <ListGroup.Item>
                  <Button
                    type="button"
                    className="btn btn-block"
                    onClick={followHandler2}
                  >
                    Set Second Follow Up
                  </Button>
                </ListGroup.Item>
              )}{" "}
              {loadingDeliver && <Loader />}
              {userInfo && userInfo.isAdmin && (
                <ListGroup.Item>
                  <Button
                    type="button"
                    className="btn btn-block"
                    onClick={followHandler3}
                  >
                    Set Third Follow Up as Done
                  </Button>
                </ListGroup.Item>
              )}{" "}
              {loadingDeliver && <Loader />}
              {userInfo && userInfo.isAdmin && (
                <ListGroup.Item>
                  <Button
                    style={{ backgroundColor: "#D50248" }}
                    type="button"
                    className="btn btn-block"
                    onClick={followHandler4}
                  >
                    Reset All
                  </Button>
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default BookScreen;
