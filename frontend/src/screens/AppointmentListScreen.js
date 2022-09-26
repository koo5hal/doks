import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Paginate from "../components/Paginate";
import {
  listAppointments,
  deleteAppointment,
  createAppointment,
} from "../actions/appointmentActions";
import { APPOINTMENT_CREATE_RESET } from "../constants/appointmentConstants";

const AppointmentListScreen = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const appointmentList = useSelector((state) => state.appointmentList);
  const { loading, error, appointments, page, pages } = appointmentList;

  const appointmentDelete = useSelector((state) => state.appointmentDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = appointmentDelete;

  const appointmentCreate = useSelector((state) => state.appointmentCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    appointment: createdAppointment,
  } = appointmentCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch({ type: APPOINTMENT_CREATE_RESET });

    if (!userInfo || !userInfo.isAdmin) {
      history.push("/login");
    }

    if (successCreate) {
      history.push(`/admin/appointment/${createdAppointment._id}/edit`);
    } else {
      dispatch(listAppointments("", pageNumber));
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    createdAppointment,
    pageNumber,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteAppointment(id));
    }
  };

  const createAppointmentHandler = () => {
    dispatch(createAppointment());
  };

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Appointments</h1>
        </Col>
        <Col className="text-right">
          <Button className="my-3" onClick={createAppointmentHandler}>
            <i className="fas fa-plus"></i> Create Doc Profile
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>REGION</th>
                <th>CLINIC</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => (
                <tr key={appointment._id}>
                  <td>{appointment._id}</td>
                  <td>{appointment.name}</td>
                  <td>Rs{appointment.price}</td>
                  <td>{appointment.category}</td>
                  <td>{appointment.clinic}</td>
                  <td>
                    <LinkContainer
                      to={`/admin/appointment/${appointment._id}/edit`}
                    >
                      <Button variant="light" className="btn-sm">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(appointment._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pages={pages} page={page} isAdmin={true} />
        </>
      )}
    </>
  );
};

export default AppointmentListScreen;
