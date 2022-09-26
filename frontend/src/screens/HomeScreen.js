import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import Appointment from '../components/Appointment';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Paginate from '../components/Paginate';
import Slider from '../components/Slider';
import Meta from '../components/Meta';
import { listAppointments } from '../actions/appointmentActions';

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword;

  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const appointmentList = useSelector((state) => state.appointmentList);
  const { loading, error, appointments, page, pages } = appointmentList;

  useEffect(() => {
    dispatch(listAppointments(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      <Meta />
      <Slider />
      <h1
        style={{
          paddingTop: 140,
          paddingBottom: 100,
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          fontfamily: 'Edu NSW ACT Foundation',
        }}
      >
        Our Doctors
      </h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            {appointments.map((appointment) => (
              <Col key={appointment._id} sm={12} md={6} lg={4} xl={3}>
                <Appointment appointment={appointment} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ''}
          />
        </>
      )}
      <div id='call'></div>
      <h1
        style={{
          paddingTop: 140,

          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          fontfamily: 'Raleway',
          fontSize: 20,
        }}
      >
        For Emergency Call On
      </h1>
      <h1
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          fontfamily: 'Raleway',
          fontSize: 30,
        }}
      >
        57879630
      </h1>
      <p
        style={{
          paddingTop: 140,
          fontfamily: 'Raleway',
          fontSize: 20,
        }}
      >
        Contact
      </p>
      <p>Hotline: 847</p>
      <p>Email: Modokter@gmail.com</p>
    </>
  );
};

export default HomeScreen;
