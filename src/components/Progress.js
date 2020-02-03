import React, { useState, useRef } from "react";
import "./Progress.scss";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faBitcoin } from "@fortawesome/free-brands-svg-icons";
import { compose } from "redux";
import { connect } from "react-redux";

const Progress = () => {
  
  const [value, setValue] = useState(64);
  const [start, setStart] = useState(false);
  const ref = useRef(null);

  const mouseMove = (e) => {
    if(start) {
      let v=Math.round(100-(e.nativeEvent.pageY-ref.current.getBoundingClientRect().y)*100/ref.current.clientHeight);
      if(v>100) {
        v=100;
      } else if(v<0) {
        v=0;
      }
      setValue(v)
    } 
  }
  const moveTo = (e) => {
    setStart(true);
    let v=Math.round(100-(e.nativeEvent.pageY-ref.current.getBoundingClientRect().y)*100/ref.current.clientHeight);
    if(v>100) {
      v=100;
    } else if(v<0) {
      v=0;
    }
    setValue(v)
  }
  return (
    <>
      <div className="progress">
        <div className="progress-label">
          <span>100</span>
          <span>0</span>
        </div>

        <div className="progress-bar" 
          ref={ref}
          onMouseMove={(e)=>mouseMove(e)}
          onMouseDown={(e)=>{moveTo(e)}}
          onMouseUp={(e)=>setStart(false)}
        >
          <div className="value" style={{height: value+'%'}}>
            <div className="value-tag">
              <div className="div">
                <div className="arrow"></div>
                <span>{value}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bet-amount">
        <div className="value">
          <div className="label">BET AMOUNT</div>
          <div className="amount">
            <FontAwesomeIcon icon={faBitcoin} />
            0.04885313
          </div>
        </div>
        <div className="sub-tag">
          1/2
        </div>
        <div className="sub-tag right-tag">
          x2
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
export default enhance(Progress);
