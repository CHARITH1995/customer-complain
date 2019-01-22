import React, { Component } from 'react';
import './Services.css';
import { Tooltip } from 'react-bootstrap';



class Sevices extends Component {
  render() {
    return (
      <div>
        <div id="services" className="container-fluid">
          <div className="servise-text">
            <h2>Services</h2>
          </div>
          <br />
          <div className="row slideanim">
            <div className="col-sm-4">
              <a href="/Complain" className="glyphicon glyphicon-file logo-small"></a>
              <h4>COMPLAINS</h4>
              <Tooltip placement="bottom" className="in" id="tooltip-bottom">
                show complain of this month
              </Tooltip>
            </div>
            <div className="col-sm-4">
              <a href="/reports" className="glyphicon glyphicon-lock logo-small"></a>
              <h4>REPORTS</h4>
              <Tooltip placement="bottom" className="in" id="tooltip-bottom">
                see system proformance of this month
              </Tooltip>
            </div>
            <div className="col-sm-4">
              <a href="/registerIds" className="glyphicon glyphicon-user logo-small"></a>
              <h4>REGISTER IDs</h4>
              <Tooltip placement="bottom" className="in" id="tooltip-bottom">
                register new customer and technicians to system
              </Tooltip>
            </div>
          </div>
          <br /><br />
          <div className="row slideanim">
            <div className="col-sm-4">
              <a href="/stockview" className="glyphicon glyphicon-briefcase logo-small"></a>
              <h4>E-STOCK</h4>
              <Tooltip placement="bottom" className="in" id="tooltip-bottom">
                add new items to stock
              </Tooltip>
            </div>
            <div className="col-sm-4">
              <a href="/itemstypes" className="glyphicon glyphicon-tasks logo-small"></a>
              <h4 style={{ color: "#303030" }}>ADD ITEM TYPES</h4>
              <Tooltip placement="bottom" className="in" id="tooltip-bottom">
                add new item types to system
              </Tooltip>
            </div>
            <div className="col-sm-4">
              <a href="/onlinestore" className="glyphicon glyphicon-shopping-cart logo-small"></a>
              <h4 style={{ color: "#303030" }}>E-SHOP</h4>
              <Tooltip placement="bottom" className="in" id="tooltip-bottom">
               here you can see online shopping available items
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
    );

  }
}



export default Sevices;
