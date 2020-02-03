import React, { useState } from "react";
import "./Shell.scss";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle, faTimes } from "@fortawesome/free-solid-svg-icons";

import { compose } from "redux";
import { connect } from "react-redux";
import shell from '../assets/imgs/shell.svg';
import shellCap from '../assets/imgs/shell-cap.svg';

const Shell = () => {
  
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      <div className="shell" onClick={()=>setModalOpen(true)}>
        <img src={shellCap} alt="" className="shell-cap"></img>
        <img src={shell} alt=""></img>
      </div>
      {modalOpen &&
        <div className="modal" >
          <div className="modal-content">
            <div className="modal-header">
              <div>
                <FontAwesomeIcon icon={faExclamationTriangle} className="hide-mobile" style={{marginRight: "10px"}}/>
                CONFIRM
              </div>
              <FontAwesomeIcon icon={faTimes} onClick={()=>setModalOpen(false)}/>
            </div>
            <div className="modal-body">
              This is modal body
            </div>
          </div>
        </div>
      }
    </>
  );
};

const mapState = state => ({
});
const mapProps = {
};
const enhance = compose(connect(mapState, mapProps), withRouter);
export default enhance(Shell);
