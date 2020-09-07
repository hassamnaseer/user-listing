import React, { Fragment, useEffect, useState } from "react";
import "./Users.css";
import { Link } from "react-router-dom";
import { Icon } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { useDispatch } from "react-redux";
import { setUser } from "../../Redux/Action";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState([]);
  const [totalPages, setTotalPages] = useState();
  const [activePage, setActivePage] = useState(0);
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(0);
  const [offset, setOffset] = useState(0);
  const [ad, setAd] = useState({});
  const [displayAd, setDisplayAd] = useState(true);
  const dispatch = useDispatch();
  const user_array = [];

  const compare = (a, b) => {
    if (a.first_name < b.first_name) {
      return -1;
    }
    if (a.first_name > b.first_name) {
      return 1;
    }
    return 0;
  };

  useEffect(() => {
    axios.get("https://reqres.in/api/users?page=1").then((user_page_1) => {
      console.log(user_page_1);
      setAd(user_page_1.data.ad);
      user_page_1.data.data.map((a) => {
        user_array.push(a);
      });
      axios.get("https://reqres.in/api/users?page=2").then((user_page_2) => {
        user_page_2.data.data.map((b) => {
          user_array.push(b);
        });
        setTotalPages(Math.ceil(user_array.length / perPage));
        user_array.sort(compare);
        const sliced = user_array.slice(offset, offset + perPage);
        setUsers(sliced);
      });
    });
  }, [activePage]);

  const handlePageClick = (e) => {
    setActivePage(e.selected);
    setOffset(e.selected * perPage);
  };

  return (
    <Fragment>
      <Container fluid className="img-container">
        <img className="w-100" src={require("./overlay.png")} />
        <p className="img-text">Our Users</p>
      </Container>
      {navigator.onLine ?
      <Container fluid className="top">
        {displayAd && (
          <Row>
            <Col xs="auto" sm="8" md="6" lg="6" className="col-center">
              <div className="ad">
                <Icon
                  className="close_ad"
                  onClick={() => setDisplayAd(false)}
                  name="close"
                />
                <p>{ad.text}</p>
                <hr />
                <p>
                  Ad by{" "}
                  <a href={ad.url} target="_blank">
                    <strong>{ad.company}</strong>
                  </a>
                </p>
              </div>
            </Col>
          </Row>
        )}

        <Row>
          <Col xs="auto" sm="10" md="10" lg="auto" className="col-center">
            <h1 className="heading">
              As a listing application, we have lots of Users and they are
              growing fast.
              <br />
              Have a look at them.
            </h1>
          </Col>
        </Row>
        <Row className="align-items-center">
          <Col xs="8" sm="6" md="auto" lg="auto" className="content col-center">
            {users.map((user, index) => {
              return (
                <Link
                  to={"/User/" + user.first_name + "-" + user.last_name}
                  onClick={() => dispatch(setUser(user))}
                >
                  <Row className="user-container">
                    <Col className="avatar_container">
                      <img className="avatar" src={user.avatar} />
                    </Col>

                    <Col className="text-col">
                      <h3 className="text">
                        {user.first_name} {user.last_name}
                      </h3>
                    </Col>
                  </Row>
                </Link>
              );
            })}
          </Col>
        </Row>
        <Row>
          {users.length !== 0 && (
            <ReactPaginate
              previousLabel={<Icon name="angle left" />}
              nextLabel={<Icon name="angle right" />}
              pageCount={totalPages}
              containerClassName={"pagination"}
              subContainerClassName={"pages pagination"}
              activeClassName={"active"}
              marginPagesDisplayed={2}
              onPageChange={handlePageClick}
            />
          )}
        </Row>
      </Container>
      :
      <Container className="error_msg_container">
        <Row>
          <Col>
            <h3 className="error_msg">You don't have an active internet connection!</h3>
          </Col>
        </Row>
      </Container>
      }
    </Fragment>
  );
};

export default Users;
