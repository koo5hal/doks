import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Patient from "../components/patient";
import Loading from "../components/Loader.js";
import Message from "../components/Message.js";
import { listPatients } from "../actions/patientActions";
import Paginate from "../components/Paginate.js";
import {
  Row,
  Col,
  ButtonGroup,
  ToggleButton,
  Container,
} from "react-bootstrap";
import PatientsTableView from "./patientTableView";

const HomeView = ({ match, history }) => {
  const [isGrid, setIsGrid] = useState(true);
  const keyword = match.params.keyword;

  const pageNumber = match.params.pageNumber || 1;
  const userLogin = useSelector((state) => state.userLogin);
  const { loading: userLoading, userInfo } = userLogin;

  const dispatch = useDispatch();

  const patientsList = useSelector((state) => state.patientsList);
  const { loading, error, patients, page, pages } = patientsList;

  useEffect(() => {
    if (!userLoading && !userInfo) {
      history.push("/login");
    }
    dispatch(listPatients(keyword, pageNumber));
  }, [keyword, pageNumber]);

  return (
    <>
      <>
        <Container>
          <Row className="justify-content-md-center">
            <Col xs lg="2"></Col>
            <Col md="auto">
              <ButtonGroup toggle>
                {["Grid", "Table"].map((type) => (
                  <ToggleButton
                    key={type}
                    type="radio"
                    variant="secondary"
                    name="radio"
                    value={type}
                    checked={(isGrid ? "Grid" : "Table") === type}
                    onChange={(e) =>
                      setIsGrid(e.target.value === "Grid" ? true : false)
                    }
                  >
                    {type === "Grid" ? <> Grid</> : <> Table </>}
                  </ToggleButton>
                ))}
              </ButtonGroup>
            </Col>
            <Col xs lg="2"></Col>
          </Row>
        </Container>
      </>

      <h1>Patients Reports</h1>
      {loading ? (
        <Loading />
      ) : error ? (
        <Message variant="danger">No Patient reports</Message>
      ) : isGrid ? (
        <>
          <Row>


         
                
             




            {patients.map((patient) => (
              <Col key={patient._id} sm={12} md={6} lg={4} xl={3}> {patient.name ==  userInfo.name || userInfo.isAdmin == true ? (
              
                 <Patient stuentDetails={patient} />
          
     
                ) : (
                  <p></p>
                )}
                
              
              </Col>
            ))}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ""}
          />
        </>
      ) : (
        <>
          <PatientsTableView keyword={keyword} pageNumber={pageNumber} />
        </>
      )}
    </>
  );
};

export default HomeView;
