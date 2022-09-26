import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import Loading from "../components/Loader.js";
import Message from "../components/Message.js";
import {
  getPatientDetails,
  updatePatient,
  deletePatient,
} from "../actions/patientActions";
import { PATIENT_UPDATE_RESET } from "../constants/patientConstant";
import HomeView from "./homeView.jsx";
import Patient from "../components/patient.jsx";
const PatientDetailsView = ({ match, history }) => {
  const [status, setStatus] = useState("");
  const dispatch = useDispatch();
  const patientDetails = useSelector((state) => state.patientDetails);
  const { loading, error, patient } = patientDetails;
  const patientUpdate = useSelector((state) => state.patientUpdate);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = patientUpdate;
  const patientDelete = useSelector((state) => state.patientDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = patientDelete;
  const bookDetails = useSelector((state) => state.bookDetails);
  const { book } = bookDetails;
  useEffect(() => {
    if (successDelete) {
      history.push("/");
    }
    if (successUpdate) {
      dispatch({ type: PATIENT_UPDATE_RESET });
    }
    if (!patient || !patient._id || patient._id !== match.params.id) {
      dispatch(getPatientDetails(match.params.id));
    }
    if (patient && patient._id && !status) {
      setStatus(patient.status);
    }
  }, [dispatch, match, successUpdate, successDelete]);

  const navigateToEdit = () => {
    history.push({
      pathname: `/patient/edit/${patient._id}`,
      state: { patientProps: patient },
    });
  };
  const updateStatus = () => {
    patient.status = status;
    dispatch(updatePatient(patient));
  };

  const deletePatient = () => {
    if (window.confirm("Are you sure")) {
      dispatch(deletePatient(patient._id));
    }
  };
  return (
    <>       
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      {loading || loadingUpdate || loadingDelete ? (
        <Loading />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
          {errorDelete && <Message variant="danger">{errorDelete}</Message>}
          {patient && (
            <Row>
             
              <Col md={4}>  
                <ListGroup variant="flush">
               <p>{patient.books.patientInfo.name ==  userInfo.name || userInfo.isAdmin == true ? (
                  <ListGroup.Item>
                       <p><h4>{patient.books.patientInfo.name}</h4></p>
                  <p>Appointment on:
                    {patient.books.bookDate}</p>
                  <p>Address: {patient.books.patientInfo.address}</p>
                  <p>Region: {patient.books.patientInfo.city}</p>
                  <p>Age: {patient.books.patientInfo.age}</p>
                  <p>Phone: {patient.books.patientInfo.phoneNumber}</p>
                  <p style={{color: "#B40000",fontSize:19}}>Health Issue:</p>
                  <p >     {patient.books.patientInfo.healthProblem}</p>
           
                  <p>    </p>
                </ListGroup.Item>
                  ) : (
                    <p></p>
                  )}</p>
                
                 
                  

















                  
                 
                 
                </ListGroup>
      
              </Col>
          
              <Col md={6}>
                <Card>
                  <ListGroup variant="flush">
                   
                    <ListGroup.Item>
                      <Row>
                        <Col>Patient Current Status: <span style={{fontSize:25}}>{patient.status}</span></Col>
                       
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                          <Form.Control 
                            size="sm"
                            as="select"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                          >
                            {["Healthy", "Stable", "Sick","Covid Positive"].map((x) => (
                              <option key={x} value={x}>
                                {x}
                              </option>
                            ))}
                          </Form.Control>
                      <p></p>
                      <Button
                     
                        className="btn-block"
                        type="button"
                        onClick={updateStatus}
                      >
                        Update
                      </Button><ListGroup.Item variant="secondary">
                      <Button onClick={navigateToEdit}> Edit Here:
    
                      </Button>
                    </ListGroup.Item>
                    </ListGroup.Item> <ListGroup.Item>
                 <h4>First Follow-Up</h4>
                 <p>Update your health status on: <span style={{color: "Black",fontSize:17}}> {patient.nextDate1}</span></p> 
                    <p>Patient's Health Feedback:<span style={{fontSize:16}}> {patient.pHealth}</span></p>
                    <p>Doctor Advice: <span style={{fontSize:16}}>{patient.docAdvice}</span></p> 
                     <p>Prescription:<span style={{fontSize:16}}> {patient.prescription}</span></p> 
                     <p>Next Follow-up:<span style={{color: "Black",fontSize:17}}> {patient.nextFollowUp}</span></p> 
                     <p>Second Follow-up date:<span style={{color: "#B40000",fontSize:19}}> {patient.nextDate}</span></p> 
                  </ListGroup.Item><ListGroup.Item>
                 <h4>Second Follow-Up</h4>
                   
                    <p>Patient's Health Feedback:<span style={{fontSize:16}}> {patient.pHealth2}</span></p>
                    <p>Doctor Advice: <span style={{fontSize:16}}>{patient.docAdvice2}</span></p> 
                     <p>Prescription:<span style={{fontSize:16}}> {patient.prescription2}</span></p> 
                     <p>Next Follow-up:<span style={{color: "Black",fontSize:17}}> {patient.nextFollowUp2}</span></p> 
                     <p>Third Follow-up date:<span style={{color: "#B40000",fontSize:19}}> {patient.nextDate2}</span></p> 
                  </ListGroup.Item>
                  <ListGroup.Item>
                 <h4>Third Follow-Up</h4>
                   
                    <p>Patient's Health Feedback:<span style={{fontSize:16}}> {patient.pHealth3}</span></p>
                    <p>Doctor Advice: <span style={{fontSize:16}}>{patient.docAdvice3}</span></p> 
                     <p>Prescription:<span style={{fontSize:16}}> {patient.prescription3}</span></p> 
                     <p>Next Follow-up:<span style={{color: "Black",fontSize:17}}> {patient.nextFollowUp3}</span></p> 
                     <p>Third Follow-up date:<span style={{color: "#B40000",fontSize:19}}> {patient.nextDate3}</span></p> 
                  </ListGroup.Item>
                  </ListGroup>
                </Card>
              </Col>
              <Col>
                
              </Col>
            </Row>
          )}
        </>
      )}
    
    </>
  );
};

export default PatientDetailsView;
