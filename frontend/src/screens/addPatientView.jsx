import React, { useState, useEffect } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import FormContainer from '../components/FormContainer.js';
import { useDispatch, useSelector } from 'react-redux';
import { addPatient, updatePatient } from '../actions/patientActions';
import Loading from '../components/Loader.js';
import Message from '../components/Message.js';
import { PATIENT_UPDATE_RESET } from '../constants/patientConstant';
import Loader from '../components/Loader.js';

const AddPatientView = () => {
  const history = useHistory();
  const [isEdit, setIsEdit] = useState(false);
  const [name, setName] = useState('');
  const [pHealth, setPHealth] = useState('')
  const [pHealth2, setPHealth2] = useState('');  
  const [pHealth3, setPHealth3] = useState('');
  const [books, setBooks] = useState('');
  const patientDetails = useSelector((state) => state.patientDetails);
  const { patient } = patientDetails;
  const [docAdvice, setDocAdvice] = useState('');
  const [docAdvice2, setDocAdvice2] = useState('');
  const [docAdvice3, setDocAdvice3] = useState('');
  const [nextDate, setNextDate] = useState('');
  const [nextDate1, setNextDate1] = useState('');
  const [nextDate2, setNextDate2] = useState('');
  const [nextDate3, setNextDate3] = useState('');
  const [prescription, setPrescription] = useState('');
  const [prescription2, setPrescription2] = useState('');
  const [prescription3, setPrescription3] = useState('');
  const [nextFollowUp, setNextFollowUp] = useState('');
  const [nextFollowUp2, setNextFollowUp2] = useState('');
  const [nextFollowUp3, setNextFollowUp3] = useState('');
  const [status, setStatus] = useState('Healthy');
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const dispatch = useDispatch();
  const patientAdd = useSelector((state) => state.patientAdd);
  const { loading, error, success } = patientAdd;
  const patientUpdate = useSelector((state) => state.patientUpdate);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);
  const [show4, setShow4] = useState(false);
  const handleShow2 = () => setShow2(true);
  const handleClose2 = () => setShow2(false);
  const handleShow3 = () => setShow3(true);
  const handleClose3 = () => setShow3(false);
  const handleShow4 = () => setShow4(true);
  const handleClose4 = () => setShow4(false);
  
  
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = patientUpdate;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    }
    if (successUpdate) {
      dispatch({ type: PATIENT_UPDATE_RESET });
      history.push('/patients');
    }
    if (history.location.state && history.location.state.patientProps) {
      setIsEdit(true);
      const patient = history.location.state.patientProps;
      setName(patient.name);
      setPHealth(patient.pHealth);
      setPHealth2(patient.pHealth2);
      setPHealth3(patient.pHealth3);
      setDocAdvice(patient.docAdvice);
      setDocAdvice2(patient.docAdvice2);   setDocAdvice3(patient.docAdvice3);
      setBooks(patient.books);
      setPrescription(patient.prescription);
      setPrescription2(patient.prescription2);
      setPrescription3(patient.prescription3);
      setNextFollowUp(patient.nextFollowUp);
      setNextFollowUp2(patient.nextFollowUp2);
      setNextFollowUp3(patient.nextFollowUp3);
      setStatus(patient.status);
      setNextDate(patient.nextDate);
      setNextDate1(patient.nextDate1);
      setNextDate2(patient.nextDate2);
      setNextDate3(patient.nextDate3);
    }
    if (success) {
      history.push('/');
    }
  }, [dispatch, history, success, successUpdate]);

  const submitHandler = () => {
    if (isEdit === true) {
      const _id = history.location.state.patientProps._id;
      dispatch(
        updatePatient({
          _id,
          name,
          pHealth,
          pHealth2,
          pHealth3,
          docAdvice,
          docAdvice2,
          docAdvice3,
          nextDate,
          nextDate1,
          nextDate2,
          nextDate3,
          books,
          prescription,
          prescription2,
          prescription3,
          nextFollowUp,
          nextFollowUp2,
          nextFollowUp3,
          status,
        })
      );
    } else {
      dispatch(
        addPatient({
          name,
          pHealth,
          pHealth2,
          pHealth3,
          nextDate,
          nextDate1,
          nextDate2,
          nextDate3,

          docAdvice,
          docAdvice2,
          docAdvice3,
          books,
          prescription,
          prescription2,
          prescription3,
          nextFollowUp,
          nextFollowUp2,
          nextFollowUp3,
          status,
        })
      );
    }
  };

  return (
    <>
      <Link to='/' className='btn btn-light my-3'>
        Go Back
      </Link>

      {loading || loadingUpdate ? (
        <Loader />
      ) : (
        <>
          {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
          <FormContainer>
            {loading && <Loading />}
            {error && <Message variant='danger'>{error}</Message>}
            <Button
              onClick={handleShow2}
              className='btn btn-success'
              data-toggle='modal'
            >
              <span>Follow-up One</span>
             
            </Button>
            <Modal show={show2} onHide={handleClose2}>
              <Modal.Header closeButton>
                <Modal.Title>Patient Details</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form onSubmit={submitHandler}></Form>{' '}
                <p>
                  {userInfo.isAdmin == true ? (
                    <div>
                      <h1>
                        {isEdit
                          ? 'Update Patient Health'
                          : 'Add Patient Report'}
                      </h1>

                      <Form.Group controlId='name'>
                        <Form.Label>Id</Form.Label>
                        <Form.Control
                          type='name'
                          placeholder='Enter name'
                          value={books}
                          onChange={(e) => setBooks(e.target.value)}
                        ></Form.Control>
                        <Form.Group controlId='name'>
                          <Form.Label>Name</Form.Label>
                          <Form.Control
                            type='name'
                            placeholder='Enter name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          ></Form.Control>
                        </Form.Group>
                      </Form.Group>
                      <Form.Group controlId='status'>
                        <Form.Label>Status</Form.Label>
                        <Form.Control
                          as='select'
                          value={status}
                          onChange={(e) => setStatus(e.target.value)}
                        >
                          {['Healthy', 'Stable', 'Sick', 'Covid Positive'].map(
                            (x) => (
                              <option key={x} value={x}>
                                {x}
                              </option>
                            )
                          )}
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId='booking'>
                        <Form.Label>Update Health Feedback on: </Form.Label>
                        <Form.Control
                          type='Date'
                          value={nextDate1}
                          onChange={(e) => setNextDate1(e.target.value)}
                        ></Form.Control>
                        <p style={{ paddingTop: 20 }}>
                          The next follow-up will be on: {nextDate1}
                        </p>
                      </Form.Group>



                      <Form.Group controlId='docAdvice'>
                        <Form.Label>DocAdvice</Form.Label>
                        <Form.Control
                          type='text'
                          placeholder='Doctor Advice'
                          value={docAdvice}
                          onChange={(e) => setDocAdvice(e.target.value)}
                        ></Form.Control>
                      </Form.Group>

                      <Form.Group controlId='prescription'>
                        <Form.Label>Presciption:</Form.Label>
                        <Form.Control
                          type='text'
                          placeholder='Enter prescription'
                          value={prescription}
                          onChange={(e) => setPrescription(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Form.Group controlId='b'>
                        <Form.Label>Next Follow Up</Form.Label>
                        <Form.Control
                          as='select'
                          value={nextFollowUp}
                          onChange={(e) => setNextFollowUp(e.target.value)}
                        >
                          {[
                            ' ',
                            'Online Follow-up',
                            'Not Required',
                            'At Hospital',
                          ].map((x) => (
                            <option key={x} value={x}>
                              {x}
                            </option>
                          ))}
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId='booking'>
                        <Form.Label>Next Follow-up Date</Form.Label>
                        <Form.Control
                          type='Date'
                          value={nextDate}
                          onChange={(e) => setNextDate(e.target.value)}
                        ></Form.Control>
                        <p style={{ paddingTop: 20 }}>
                          The next follow-up will be on: {nextDate}
                        </p>
                      </Form.Group>
                      <Button
                        type='submit'
                        variant='primary'
                        onClick={submitHandler}
                      >
                        {isEdit ? 'Update' : 'Add Patient'}
                      </Button>
                    </div>
                  ) : (
                    <div>
                      <h1>
                        {isEdit
                          ? 'Provide Your Health Feedback'
                          : 'Add Patient Report'}
                      </h1>
                      <Form.Group controlId='pHealth'>
                        <Form.Label>Your Health</Form.Label>
                        <Form.Control
                          type='text'
                          placeholder='Enter pHealth'
                          value={pHealth}
                          onChange={(e) => setPHealth(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button
                        type='submit'
                        variant='primary'
                        onClick={submitHandler}
                      >
                        {isEdit ? 'Update' : 'Add Patient'}
                      </Button>
                    </div>
                  )}
                </p>
              </Modal.Body>
              <Modal.Footer>
                <Button variant='secondary' onClick={handleClose2}>
                  Close Button
                </Button>
              </Modal.Footer>
            </Modal>
          </FormContainer>
































<p></p>


          <FormContainer>
            {loading && <Loading />}
            {error && <Message variant='danger'>{error}</Message>}
            <Button
              onClick={handleShow3}
              className='btn btn-success'
              data-toggle='modal'
            >
              <span>Follow-up Two</span>
            
            </Button>
            <Modal show={show3} onHide={handleClose3}>
              <Modal.Header closeButton>
                <Modal.Title>Patient Details</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form onSubmit={submitHandler}></Form>{' '}
                <p>
                  {userInfo.isAdmin == true ? (
                    <div>
                      <h1>
                        {isEdit
                          ? 'Update Patient Health For Follow Up 2'
                          : 'Add Patient Report'}
                      </h1>

                      <Form.Group controlId='name'>
                        <Form.Label>Id</Form.Label>
                        <Form.Control
                          type='name'
                          placeholder='Enter name'
                          value={books}
                          onChange={(e) => setBooks(e.target.value)}
                        ></Form.Control>
                        <Form.Group controlId='name'>
                          <Form.Label>Name</Form.Label>
                          <Form.Control
                            type='name'
                            placeholder='Enter name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          ></Form.Control>
                        </Form.Group>
                      </Form.Group>
                      <Form.Group controlId='status'>
                        <Form.Label>Status</Form.Label>
                        <Form.Control
                          as='select'
                          value={status}
                          onChange={(e) => setStatus(e.target.value)}
                        >
                          {['Healthy', 'Stable', 'Sick', 'Covid Positive'].map(
                            (x) => (
                              <option key={x} value={x}>
                                {x}
                              </option>
                            )
                          )}
                        </Form.Control>
                      </Form.Group>

                      <Form.Group controlId='docAdvice'>
                        <Form.Label>Doctor Advice</Form.Label>
                        <Form.Control
                          type='text'
                          placeholder='Doctor Advice'
                          value={docAdvice2}
                          onChange={(e) => setDocAdvice2(e.target.value)}
                        ></Form.Control>
                      </Form.Group>

                      <Form.Group controlId='prescription'>
                        <Form.Label>Presciption:</Form.Label>
                        <Form.Control
                          type='text'
                          placeholder='Enter prescription'
                          value={prescription2}
                          onChange={(e) => setPrescription2(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Form.Group controlId='b'>
                        <Form.Label>Next Follow Up</Form.Label>
                        <Form.Control
                          as='select'
                          value={nextFollowUp2}
                          onChange={(e) => setNextFollowUp2(e.target.value)}
                        >
                          {[
                            ' ',
                            'Online Follow-up',
                            'Not Required',
                            'At Hospital',
                          ].map((x) => (
                            <option key={x} value={x}>
                              {x}
                            </option>
                          ))}
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId='booking'>
                        <Form.Label>Next Follow-up Date</Form.Label>
                        <Form.Control
                          type='Date'
                          value={nextDate2}
                          onChange={(e) => setNextDate2(e.target.value)}
                        ></Form.Control>
                        <p style={{ paddingTop: 20 }}>
                          The next follow-up will be on: {nextDate2}
                        </p>
                      </Form.Group>
                      <Button
                        type='submit'
                        variant='primary'
                        onClick={submitHandler}
                      >
                        {isEdit ? 'Update' : 'Add Patient'}
                      </Button>
                    </div>
                  ) : (
                    <div>
                      <h1>
                        {isEdit
                          ? 'Provide Your Health Feedback'
                          : 'Add Patient Report'}
                      </h1>
                      <Form.Group controlId='pHealth'>
                        <Form.Label>Your Health</Form.Label>
                        <Form.Control
                          type='text'
                          placeholder='Enter pHealth'
                          value={pHealth2}
                          onChange={(e) => setPHealth2(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button
                        type='submit'
                        variant='primary'
                        onClick={submitHandler}
                      >
                        {isEdit ? 'Update' : 'Add Patient'}
                      </Button>
                    </div>
                  )}
                </p>
              </Modal.Body>
              <Modal.Footer>
                <Button variant='secondary' onClick={handleClose3}>
                  Close Button
                </Button>
              </Modal.Footer>
            </Modal>
          </FormContainer>

































          <p></p>


          <FormContainer>
            {loading && <Loading />}
            {error && <Message variant='danger'>{error}</Message>}
            <Button
              onClick={handleShow4}
              className='btn btn-success'
              data-toggle='modal'
            >
              <span>Follow-up Three</span>
            
            </Button>
            <Modal show={show4} onHide={handleClose4}>
              <Modal.Header closeButton>
                <Modal.Title>Patient Details</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form onSubmit={submitHandler}></Form>{' '}
                <p>
                  {userInfo.isAdmin == true ? (
                    <div>
                      <h1>
                        {isEdit
                          ? 'Update Patient Health For Follow Up 3'
                          : 'Add Patient Report'}
                      </h1>

                      <Form.Group controlId='name'>
                        <Form.Label>Id</Form.Label>
                        <Form.Control
                          type='name'
                          placeholder='Enter name'
                          value={books}
                          onChange={(e) => setBooks(e.target.value)}
                        ></Form.Control>
                        <Form.Group controlId='name'>
                          <Form.Label>Name</Form.Label>
                          <Form.Control
                            type='name'
                            placeholder='Enter name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          ></Form.Control>
                        </Form.Group>
                      </Form.Group>
                      <Form.Group controlId='status'>
                        <Form.Label>Status</Form.Label>
                        <Form.Control
                          as='select'
                          value={status}
                          onChange={(e) => setStatus(e.target.value)}
                        >
                          {['Healthy', 'Stable', 'Sick', 'Covid Positive'].map(
                            (x) => (
                              <option key={x} value={x}>
                                {x}
                              </option>
                            )
                          )}
                        </Form.Control>
                      </Form.Group>

                      <Form.Group controlId='docAdvice'>
                        <Form.Label>Doctor Advice</Form.Label>
                        <Form.Control
                          type='text'
                          placeholder='Doctor Advice'
                          value={docAdvice3}
                          onChange={(e) => setDocAdvice3(e.target.value)}
                        ></Form.Control>
                      </Form.Group>

                      <Form.Group controlId='prescription'>
                        <Form.Label>Presciption:</Form.Label>
                        <Form.Control
                          type='text'
                          placeholder='Enter prescription'
                          value={prescription3}
                          onChange={(e) => setPrescription3(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Form.Group controlId='b'>
                        <Form.Label>Next Follow Up</Form.Label>
                        <Form.Control
                          as='select'
                          value={nextFollowUp3}
                          onChange={(e) => setNextFollowUp3(e.target.value)}
                        >
                          {[
                            ' ',
                            'Online Follow-up',
                            'Not Required',
                            'At Hospital',
                          ].map((x) => (
                            <option key={x} value={x}>
                              {x}
                            </option>
                          ))}
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId='booking'>
                        <Form.Label>Next Follow-up Date</Form.Label>
                        <Form.Control
                          type='Date'
                          value={nextDate3}
                          onChange={(e) => setNextDate3(e.target.value)}
                        ></Form.Control>
                        <p style={{ paddingTop: 20 }}>
                          The next follow-up will be on: {nextDate3}
                        </p>
                      </Form.Group>
                      <Button
                        type='submit'
                        variant='primary'
                        onClick={submitHandler}
                      >
                        {isEdit ? 'Update' : 'Add Patient'}
                      </Button>
                    </div>
                  ) : (
                    <div>
                      <h1>
                        {isEdit
                          ? 'Provide Your Health Feedback'
                          : 'Add Patient Report'}
                      </h1>
                      <Form.Group controlId='pHealth'>
                        <Form.Label>Your Health</Form.Label>
                        <Form.Control
                          type='text'
                          placeholder='Enter pHealth'
                          value={pHealth3}
                          onChange={(e) => setPHealth3(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button
                        type='submit'
                        variant='primary'
                        onClick={submitHandler}
                      >
                        {isEdit ? 'Update' : 'Add Patient'}
                      </Button>
                    </div>
                  )}
                </p>
              </Modal.Body>
              <Modal.Footer>
                <Button variant='secondary' onClick={handleClose4}>
                  Close Button
                </Button>
              </Modal.Footer>
            </Modal>
          </FormContainer>
        </>
      )}
    </>
  );
};

export default AddPatientView;
