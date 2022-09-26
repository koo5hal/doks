import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { savePatientInfo } from "../actions/cartActions";

const UserDetailScreen = ({ history }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const cart = useSelector((state) => state.cart);
  const { patientInfo } = cart;
  const [name, setName] = useState("");
  const [address, setAddress] = useState(patientInfo.address);
  const [city, setCity] = useState(patientInfo.city);
  const [age, setAge] = useState(patientInfo.age);
  const [phoneNumber, setPostalCode] = useState(patientInfo.phoneNumber);
  const [healthProblem, setCountry] = useState(patientInfo.healthProblem);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      savePatientInfo({ name, address, city, age, phoneNumber, healthProblem })
    );
    history.push("/payment");
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h2>Please Enter Your Informations</h2>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            as="select"
            value={name}
            onChange={(e) => setName(e.target.value)}
          >
            <option value="">Select...</option>
            <option value={userInfo.name}>{userInfo.name} </option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter address"
            value={address}
            required
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="age">
          <Form.Label>Your Age</Form.Label>
          <Form.Control
            type="Number"
            placeholder="Enter Your Age"
            value={age}
            required
            onChange={(e) => setAge(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="city">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter city"
            value={city}
            required
            onChange={(e) => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="phoneNumber">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Phone Number"
            value={phoneNumber}
            required
            onChange={(e) => setPostalCode(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="healthProblem">
          <Form.Label>Health Issue</Form.Label>
          <Form.Control
            type="text"
            placeholder="Describe your health issues (e.g Fever..)"
            value={healthProblem}
            required
            onChange={(e) => setCountry(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default UserDetailScreen;
