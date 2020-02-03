import React from "react";
import "./BetsDataTable.scss";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faBitcoin } from "@fortawesome/free-brands-svg-icons";
import { compose } from "redux";
import { connect } from "react-redux";
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

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

const BetsDataTable = () => {
  const { data } = useQuery(EXCHANGE_RATES);
  
  return (
    <>
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
    </>
  );
};

const mapState = state => ({
});
const mapProps = {
};
const enhance = compose(connect(mapState, mapProps), withRouter);
export default enhance(BetsDataTable);
