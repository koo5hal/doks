import React, { useState, useEffect } from "react";
import axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import { Link } from "react-router-dom";
import { Row, Col, ListGroup, Image, Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getBookDetails, payBook, deliverBook } from "../actions/bookActions";
import { BOOK_PAY_RESET, BOOK_DELIVER_RESET } from "../constants/bookConstants";
import { listBooks } from "../actions/bookActions";
import EditDates from "../components/EditDates";

const MyReport = ({ match, history }) => {
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

    if (!book || successPay || successDeliver || book._id !== bookId) {
      dispatch({ type: BOOK_PAY_RESET });
      dispatch({ type: BOOK_DELIVER_RESET });
      dispatch(getBookDetails(bookId));
    } else if (!book.isPaid) {
      if (!window.paypal) {
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, bookId, successPay, successDeliver, book, history, userInfo]);

  const deliverHandler = () => {
    dispatch(deliverBook(book));
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
              <h5>
                <strong>Dear </strong> {book.user.name}, you have appointment
                on:
              </h5>
              <h2 style={{ color: "#D50248" }}>{book.bookDate}</h2>
              <h5 style={{ paddingTop: 20 }}>Your Informations:</h5>
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
              <h5 style={{ paddingTop: 20 }}>Your Doctor</h5>
              {book.bookItems.length === 0 ? (
                <Message>Book is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {book.bookItems.map((item, index) => (
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
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Follow-Ups</h2>{" "}
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
            </ListGroup>
          </Card>
        </Col>
      </Row>{" "}
    </>
  );
};

export default MyReport;
