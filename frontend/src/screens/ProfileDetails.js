import React, { useState, useEffect } from "react";
import { Table, Form, Button, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import { listMyBooks } from "../actions/bookActions";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";

const ProfileDetails = ({ location, history }) => {
  const bookDetails = useSelector((state) => state.bookDetails);
  const { book } = bookDetails;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const bookListMy = useSelector((state) => state.bookListMy);
  const { loading: loadingBooks, error: errorBooks, books } = bookListMy;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user || !user.name || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(getUserDetails("profile"));
        dispatch(listMyBooks());
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, history, userInfo, user, success]);

  return (
    <Row>
      <Col md={9}>
        <h2>My Profile</h2>
        <p>{user.name}</p>
      </Col>
      <Col md={9}>
        <h2>My Appointmentsssssss</h2>
        {loadingBooks ? (
          <Loader />
        ) : errorBooks ? (
          <Message variant="danger">{errorBooks}</Message>
        ) : (
          <Table striped bbooked hover responsive className="table-sm">
            <thead>
              <tr>
                {" "}
                <th>DOCTOR</th>
                <th>APPOINTMENT DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>Attended</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book._id}>
                  {book.bookItems.map((item, index) => (
                    <td>{item.name}</td>
                  ))}

                  <td>{book.bookDate}</td>
                  <td>{book.totalPrice}</td>
                  <td>
                    {book.isPaid ? (
                      book.paidAt.substring(0, 10)
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }}></i>
                    )}
                  </td>
                  <td>
                    {book.isDelivered ? (
                      book.deliveredAt.substring(0, 10)
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }}></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/book/${book._id}`}>
                      <Button className="btn-sm" variant="light">
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};

export default ProfileDetails;
