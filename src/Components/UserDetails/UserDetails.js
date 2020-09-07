import React, { Fragment } from "react";
import "./UserDetails.css";
import { Link } from "react-router-dom";
import { Container, Row, Col, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector } from "react-redux";

const UserDetails = () => {
  const user = useSelector((state) => state.user);

  return (
    <Fragment>
      <Container fluid className="img-container-1">
        <img className="w-100" src={require("./overlay.png")} />
        <p className="img-text_1">User Details</p>
      </Container>
      <Container fluid>
        {Object.keys(user).length !== 0 && <Row>
          <Col style={{textAlign: 'start'}}>
            <Link to="/"><p className="user_link_back">&lt;&lt; Users</p></Link>
          </Col>
        </Row>}
        <Row className="align-items-center">
          <Col lg={{ span: 4, offset: 4 }} className="align-self-center">
            {Object.keys(user).length !== 0 ? (
              <div className="user_info">
                <h2>Here are the details of the selected User:</h2>
                <hr />
                <img className="user_avatar" src={user.avatar} />

                <Table responsive borderless>
                  <tbody>
                    <tr>
                      <td style={{ textAlign: "right" }}>
                        <h3 className="property_name">First Name:</h3>
                      </td>
                      <td style={{ textAlign: "left" }}>
                        <h3>{user.first_name}</h3>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ textAlign: "right" }}>
                        <h3 className="property_name">Last Name:</h3>
                      </td>
                      <td style={{ textAlign: "left" }}>
                        <h3>{user.last_name}</h3>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ textAlign: "right" }}>
                        <h3 className="property_name">Email:</h3>
                      </td>
                      <td style={{ textAlign: "left" }}>
                        <h3>{user.email}</h3>
                      </td>
                    </tr>
                  </tbody>
                </Table>
                <hr />
              </div>
            ) : (
              <div className="no_user">
                Please select a user from <Link to="/">list of Users</Link>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default UserDetails;
