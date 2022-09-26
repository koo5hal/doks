import React from "react";
import { Card, Col, Row, Image } from "react-bootstrap";
import { Link } from "react-router-dom";import { useDispatch, useSelector } from "react-redux"
const Patient = ({ stuentDetails: patient }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/patient/${patient._id}`}>
       
      </Link>
      <Card.Body>
        <Link to={`/patient/${patient._id}`}>
          <Card.Title as="div">
            <strong>{patient.name}</strong>
          </Card.Title>
        </Link>

        <Row>
         
        </Row>
        
        <Card.Text>
       
          <h5>{patient.status}</h5>
         
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Patient;
