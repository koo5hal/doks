import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Header2 from './components/Header2';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import AppointmentScreen from './screens/AppointmentScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import UserDetailScreen from './screens/UserDetailScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceBookScreen from './screens/PlaceBookScreen';
import BookScreen from './screens/BookScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import AppointmentListScreen from './screens/AppointmentListScreen';
import AppointmentEditScreen from './screens/AppointmentEditScreen';
import BookListScreen from './screens/BookListScreen';
import HomeView from './screens/homeView';
import AddPatientView from './screens/addPatientView';
import PatientDetailsView from './screens/patientDetailsView';
import ProfileDetails from './screens/ProfileDetails';
import MyReport from './screens/MyReport';
import EditDates from './components/EditDates';
import FilterPage from './screens/FilterPage';
import UpdateProfileScreen from './screens/UpdateProfileScreen';
import AddPatientReport from './screens/addPatientReport';
import { useDispatch, useSelector } from 'react-redux';
const App = () => {
  return (
    <Router>
      <Header />

      <main className='py-3'>
        <Container>
          <Route path='/book/:id' component={BookScreen} />
          <Route path='/myreport/:id' component={MyReport} />
          <Route path='/userdetail' component={UserDetailScreen} />
          <Route path='/payment' component={PaymentScreen} />
          <Route path='/placebook' component={PlaceBookScreen} />
          <Route path='/login' component={LoginScreen} />
          <Route path='/register' component={RegisterScreen} />
          <Route path='/profile' component={ProfileScreen} />
          <Route path='/updateprofile' component={UpdateProfileScreen} />
          <Route path='/myprofile' component={ProfileDetails} />
          <Route path='/appointment/:id' component={AppointmentScreen} />
          <Route path='/saved/:id?' component={CartScreen} />
          <Route path='/admin/userlist' component={UserListScreen} />
          <Route path='/admin/user/:id/edit' component={UserEditScreen} />
          <Route
            path='/admin/appointmentlist'
            component={AppointmentListScreen}
            exact
          />{' '}
          <Route path='/editDates' component={EditDates} exact />
          <Route
            path='/admin/appointmentlist/:pageNumber'
            component={AppointmentListScreen}
            exact
          />
          <Route
            path='/admin/appointment/:id/edit'
            component={AppointmentEditScreen}
          />
          <Route path='/admin/booklist' component={BookListScreen} />
          <Route path='/search/:keyword' component={HomeScreen} exact />
          <Route path='/page/:pageNumber' component={HomeScreen} exact />
          <Route
            path='/search/:keyword/page/:pageNumber'
            component={HomeScreen}
            exact
          />
          <Route path='/filterPage' component={FilterPage} exact />
          <Route path='/' component={HomeScreen} exact />
          <Route path='/patients' component={HomeView} exact />
          <Route path='/addPatient' component={AddPatientView} />
          <Route path='/addpatientreport' component={AddPatientReport} />
          <Route path='/patient/edit/:id' component={AddPatientView} exact />
          <Route path='/patient/:id' component={PatientDetailsView} exact />
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
