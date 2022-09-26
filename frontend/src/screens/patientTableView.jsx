import React, { useEffect } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message.js";
import Loader from "../components/Loader.js";
import Paginate from "../components/Paginate.js";
import { listPatients } from "../actions/patientActions";
import { Link } from "react-router-dom";

const PatientsTableView = ({ keyword, pageNumber }) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const patientsList = useSelector((state) => state.patientsList);
  const { loading, error, patients, page, pages } = patientsList;
  useEffect(() => {
    if (!patients) {
      dispatch(listPatients(keyword, pageNumber));
    }
  }, [dispatch, keyword, pageNumber]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
   
                <th>NAME</th>
                <th>STATUS</th>
                <th>First Follow Up</th>
                <th>Second Follow Up</th>
                <th>Third Follow Up</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient) => (
                <tr key={patient._id}>
           
                  <td>
                    <Link to={`/patient/${patient._id}`}>{patient.name}</Link>
                  </td>
                  <td>
                    <span
                      style={{
                        color:
                          patient.status === "Outside"
                            ? "red"
                            : patient.status === "Home"
                            ? "blue"
                            : "black",
                      }}
                    >
                      {patient.status}
                    </span>
                  </td>
                  <td>
                   {patient.nextDate}
                  </td> <td>
                   {patient.nextDate2}
                  </td>
                  <td>
                   {patient.nextDate3}
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

export default PatientsTableView;
