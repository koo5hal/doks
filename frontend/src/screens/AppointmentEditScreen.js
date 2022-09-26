import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import {
  listAppointmentDetails,
  updateAppointment,
} from '../actions/appointmentActions';
import { APPOINTMENT_UPDATE_RESET } from '../constants/appointmentConstants';

const AppointmentEditScreen = ({ match, history }) => {
  const appointmentId = match.params.id;

  const [name, setName] = useState('');
  const [qualification, setQualification] = useState('');
  const [specialityOne, setspecialityOne] = useState('');
  const [specialityTwo, setspecialityTwo] = useState('');
  const [specialityThree, setspecialityThree] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [clinic, setClinic] = useState('');
  const [region, setRegion] = useState('');

  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const dispatch = useDispatch();

  const appointmentDetails = useSelector((state) => state.appointmentDetails);
  const { loading, error, appointment } = appointmentDetails;

  const appointmentUpdate = useSelector((state) => state.appointmentUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = appointmentUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: APPOINTMENT_UPDATE_RESET });
      history.push('/admin/appointmentlist');
    } else {
      if (!appointment.name || appointment._id !== appointmentId) {
        dispatch(listAppointmentDetails(appointmentId));
      } else {
        setName(appointment.name);
        setQualification(appointment.qualification);
        setspecialityOne(appointment.specialityOne);
        setspecialityTwo(appointment.specialityTwo);
        setspecialityThree(appointment.specialityThree);
        setPrice(appointment.price);
        setImage(appointment.image);
        setClinic(appointment.clinic);
        setRegion(appointment.region);

        setDescription(appointment.description);
      }
    }
  }, [dispatch, history, appointmentId, appointment, successUpdate]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const { data } = await axios.post('/api/upload', formData, config);

      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateAppointment({
        _id: appointmentId,
        name,
        qualification,
        specialityOne,
        specialityTwo,
        specialityThree,
        price,
        image,
        clinic,
        region,
        description,
      })
    );
  };

  return (
    <>
      <Link to='/admin/appointmentlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Create Doctor Profile</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                as='select'
                value={name}
                onChange={(e) => setName(e.target.value)}
              >
                <option value=''>Select...</option>
                <option value={userInfo.name}>{userInfo.name} </option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId='qualification'>
              <Form.Label>Qualifications</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter your qualifications'
                value={qualification}
                onChange={(e) => setQualification(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='rating'>
              <Form.Label>Speciality</Form.Label>
              <Form.Control
                as='select'
                value={specialityOne}
                onChange={(e) => setspecialityOne(e.target.value)}
              >
                <option value=''>Select...</option>
                <option value='Pycho'>Allergists/Immunologists</option>
                <option value='Skin'>Anesthesiologists</option>
                <option value='Cardiac'>Cardiologists</option>
                <option value='Dentist'>Colon and Rectal Surgeons</option>
                <option value='Pediate'>Dermatologists</option>
                <option value='Pycho'>Endocrinologists</option>
                <option value='Skin'>Gastroenterologists</option>
                <option value='Cardiac'>Hematologists</option>
                <option value='Dentist'>Internists</option>
                <option value='Pediate'>Neurologists</option>
                <option value='Skin'>Pathologists</option>
                <option value='Cardiac'>Pediatricians</option>
                <option value='Dentist'>Physiatrists</option>
                <option value='Pediate'>General Surgeons</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId='speciality3'>
              <Form.Label>Speciality 2</Form.Label>
              <Form.Control
                type='text'
                placeholder=''
                value={specialityTwo}
                onChange={(e) => setspecialityTwo(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='speciality3'>
              <Form.Label>Speciality 3</Form.Label>
              <Form.Control
                type='text'
                placeholder=''
                value={specialityThree}
                onChange={(e) => setspecialityThree(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='image'>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter image url'
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              <Form.File
                id='image-file'
                label='Choose File'
                custom
                onChange={uploadFileHandler}
              ></Form.File>
              {uploading && <Loader />}
            </Form.Group>

            <Form.Group controlId='clinic'>
              <Form.Label>Clinic</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Name and Address of your Clinic'
                value={clinic}
                onChange={(e) => setClinic(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='region'>
              <Form.Label>Region</Form.Label>
              <Form.Control
                as='select'
                value={region}
                onChange={(e) => setRegion(e.target.value)}
              >
                <option value=''>Select...</option>
                <option value='Savanne'>Savanne</option>
                <option value='Moka'>Moka</option>
                <option value='Port Louis'>Port Louis</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default AppointmentEditScreen;
