import React from "react";
import "./Header.scss";
import { withRouter } from "react-router-dom";

import { compose } from "redux";
import { connect } from "react-redux";

const Header = ({
  history
}) => {
  return (
    <>
      <div className="header">
        <div className="user-avatar">
        </div>
      </div>
    </>
  );
};

const mapState = state => ({
});
const mapProps = {
};
const enhance = compose(connect(mapState, mapProps), withRouter);
export default enhance(Header);
