import React from "react";
import { Modal, Button, Table } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import { LinkContainer } from "react-router-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listBooks } from "../actions/bookActions";
const FilterPage = ({ history }) => {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const [show2, setShow2] = useState(false);
  const handleShow2 = () => setShow2(true);
  const handleClose2 = () => setShow2(false);
  const dispatch = useDispatch();

  const bookList = useSelector((state) => state.bookList);
  const { loading, error, books } = bookList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listBooks());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo]);
  return (
    <div>
      <Button
        onClick={handleShow}
        className="btn btn-success"
        data-toggle="modal"
      >
        <span>Patients</span>
      </Button>
      <span>
        <span style={{ paddingLeft: 50 }}> </span>{" "}
      </span>
      <Button
        onClick={handleShow2}
        className="btn btn-success"
        data-toggle="modal"
      >
        <span>Filter 2</span>
      </Button>
      <Modal show={show} onHide={handleClose} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Patient Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h3>
            {" "}
            <h1>Patients</h1>
            {loading ? (
              <Loader />
            ) : error ? (
              <Message variant="danger">{error}</Message>
            ) : (
              <Table striped bbooked hover responsive className="table-sm">
                <thead>
                  <tr>
                    <th>Patients</th>

                    <th>Paid</th>
                    <th>App Attend</th>
                    <th>FollowUp 1</th>
                    <th>FollowUp 2</th>
                    <th>FollowUp 3</th>
                    <th>Appointment Date</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {books.map((book) => (
                    <tr key={book._id}>
                      <td>{book.user && book.user.name}</td>

                      <td style={{ paddingLeft: 20 }}>
                        {book.isPaid ? (
                          <i
                            className="fas fa-check"
                            style={{ color: "green" }}
                          ></i>
                        ) : (
                          <i
                            className="fas fa-times"
                            style={{ color: "red" }}
                          ></i>
                        )}
                      </td>
                      <td style={{ paddingLeft: 40 }}>
                        {book.isDelivered ? (
                          <i
                            className="fas fa-check"
                            style={{ color: "green" }}
                          ></i>
                        ) : (
                          <i
                            className="fas fa-times"
                            style={{ color: "red" }}
                          ></i>
                        )}
                      </td>
                      <td style={{ paddingLeft: 40 }}>
                        {book.isfollowUpOne ? (
                          <i
                            className="fas fa-calendar-check"
                            style={{ color: "green" }}
                          ></i>
                        ) : (
                          <i
                            className="fas fa-times"
                            style={{ color: "red" }}
                          ></i>
                        )}
                      </td>
                      <td style={{ paddingLeft: 40 }}>
                        {book.isfollowUpTwo ? (
                          <i
                            className="fas fa-calendar-check"
                            style={{ color: "green" }}
                          ></i>
                        ) : (
                          <i
                            className="fas fa-times"
                            style={{ color: "red" }}
                          ></i>
                        )}
                      </td>
                      <td style={{ paddingLeft: 40 }}>
                        {book.isfollowUpThree ? (
                          <i
                            className="fas fa-calendar-check"
                            style={{ color: "green" }}
                          ></i>
                        ) : (
                          <i
                            className="fas fa-times"
                            style={{ color: "red" }}
                          ></i>
                        )}
                      </td>
                      <td>{book.bookDate}</td>
                      <td>
                        <LinkContainer to={`/book/${book._id}`}>
                          <Button variant="light" className="btn-sm">
                            Details
                          </Button>
                        </LinkContainer>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </h3>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close Button
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={show2} onHide={handleClose2}>
        <Modal.Header closeButton>
          <Modal.Title>Patient Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h3>Bye</h3>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close Button
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default FilterPage;
