import React, {useState, useRef} from "react";
import "./LandingPage.scss";

import Modal from 'react-modal';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBitcoin } from "@fortawesome/free-brands-svg-icons";
import { faExclamationTriangle, faTimes } from "@fortawesome/free-solid-svg-icons";

import { connect } from "react-redux";

import shell from '../assets/imgs/shell.svg';
import shellCap from '../assets/imgs/shell-cap.svg';

import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const EXCHANGE_RATES = gql`
  {
    bets {
      id
      time
      name
      game
      bet
      payout
      profit
    }
  }
`;

Modal.setAppElement('#modal-element')

const LandingPage = () => {
  const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };
  const [value, setValue] = useState(64.75);
  const [modalOpen, setModalOpen] = useState(false);
  const [pos, setPos] = useState({x:0, y:0})
  const [start, setStart] = useState(false);
  const ref = useRef(null);
  const { data } = useQuery(EXCHANGE_RATES);

  const mouseMove = (e) => {
    e.stopPropagation();
    if(start) {
      setPos({x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY});
      let v=Math.round(10000-(e.nativeEvent.pageY-ref.current.getBoundingClientRect().y)*10000/ref.current.clientHeight)/100;
      if(v>100) {
        v=100;
      } else if(v<0) {
        v=0;
      }
      setValue(v)
    }
    
  }

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col col-2">
            <div className="card">
              <div className="progress">
                <div className="progress-label">
                  <span>100</span>
                  <span>0</span>
                </div>

                <div className="progress-bar" 
                  ref={ref}
                  onMouseMove={(e)=>mouseMove(e)}
                  onMouseDown={(e)=>setStart(true)}
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
            </div>
          </div>
          
          <div className="col col-3">
            <div className="card h-100">
              <table>
                <thead>
                  <tr>
                    <th>TIME</th>
                    <th className="hide-mobile">BET</th>
                    <th className="hide-mobile">MULTIPLER</th>
                    <th>PROFIT</th>
                  </tr>
                </thead>
                <tbody>
                  { data && data.bets.map((item, index)=>{
                      return (
                        <tr key={index}>
                          <td className="td-1">{(new Date(item.time)).toLocaleString()}</td>
                          <td className="td-2 hide-mobile"><FontAwesomeIcon icon={faBitcoin} />{item.bet/1000}</td>
                          <td className="td-3 hide-mobile">x{item.payout/4}</td>
                          <td className="td-4 "><FontAwesomeIcon icon={faBitcoin} />{item.profit/1000}</td>
                        </tr>
                      )
                    })
                  }
                  
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="col col-2">
            <div className="card h-100">
              <div className="shell" onClick={()=>setModalOpen(true)}>
                <img src={shellCap} alt="" className="shell-cap"></img>
                <img src={shell} alt=""></img>
              </div>
            </div>
          </div>
        </div>
        
        <Modal isOpen={modalOpen} style={customStyles} contentLabel="Example Modal">
          <div className="modal-header">
            <div>
              <FontAwesomeIcon icon={faExclamationTriangle} style={{marginRight: "10px"}}/>
              CONFIRM
            </div>
            <FontAwesomeIcon icon={faTimes} onClick={()=>setModalOpen(false)}/>
          </div>
          <div className="modal-body">
            This is modal body
          </div>
        </Modal>
      </div>
    </>
  );
};

const mapState = state => ({});
const mapProps = {
  
};
const enhance = connect(mapState, mapProps);
export default enhance(LandingPage);
