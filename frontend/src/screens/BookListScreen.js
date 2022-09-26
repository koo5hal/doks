import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listBooks } from "../actions/bookActions";

const BookListScreen = ({ history }) => {
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
    <>
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
              <th>Date</th>

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
                <td>{book.createdAt.substring(0, 10)}</td>

                <td style={{ paddingLeft: 20 }}>
                  {book.isPaid ? (
                    <i className="fas fa-check" style={{ color: "green" }}></i>
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>
                <td style={{ paddingLeft: 40 }}>
                  {book.isDelivered ? (
                    <i className="fas fa-check" style={{ color: "green" }}></i>
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>
                <td style={{ paddingLeft: 40 }}>
                  {book.isfollowUpOne ? (
                    <i
                      className="fas fa-calendar-check"
                      style={{ color: "green" }}
                    ></i>
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>
                <td style={{ paddingLeft: 40 }}>
                  {book.isfollowUpTwo ? (
                    <i
                      className="fas fa-calendar-check"
                      style={{ color: "green" }}
                    ></i>
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>
                <td style={{ paddingLeft: 40 }}>
                  {book.isfollowUpThree ? (
                    <i
                      className="fas fa-calendar-check"
                      style={{ color: "green" }}
                    ></i>
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
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
    </>
  );
};

export default BookListScreen;
