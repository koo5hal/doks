import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import Rating from "./Rating";

const Appointment = ({ appointment }) => {
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/appointment/${appointment._id}`}>
        <Card.Img src={appointment.image} variant="top" />
      </Link>

      <Card.Body>
        <Link to={`/appointment/${appointment._id}`}>
          <Card.Title as="div">
            <h5>{appointment.name}</h5>
          </Card.Title>
        </Link>
        <Card.Text as="h3">{appointment.specialityOne} specialist</Card.Text>{" "}
        <Card.Text as="div">
          <Rating
            value={appointment.rating}
            text={`${appointment.numReviews} reviews`}
          />
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Appointment;
