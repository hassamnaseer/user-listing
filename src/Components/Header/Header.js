import React, { Fragment } from "react";
import "./Header.css";
import { Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Fragment>
      <header>
        <div>
          <h1 className="h-heading"><Link to="/"><Icon name="users" />User Listing</Link></h1>
        </div>
      </header>
    </Fragment>
  );
};

export default Header;
