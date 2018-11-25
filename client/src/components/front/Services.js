import React, { Component } from 'react';
import './Services.css';
import { BrowserRouter as NavLink,Link } from 'react-router-dom';


class Sevices extends Component {
    render() {
        return (
            <div>
            <div id="services" className="container-fluid text-center">
            <h2>DASHBOARD</h2>
            <h4>What we offer</h4>
            <br />
            <div className="row slideanim">
              <div className="col-sm-4">
              <a href="/Complain" className="glyphicon glyphicon-file logo-small"></a>
                <h4>COMPLAINS</h4>
                <p>show all the complains</p>
              </div> 
              <div className="col-sm-4">
              <a href="/reports" className="glyphicon glyphicon-lock logo-small"></a>
               
                <h4>REPORTS</h4>
                <p>Lorem ipsum dolor sit amet..</p>
              </div>
              <div className="col-sm-4">
              <a href="/registerIds" className="glyphicon glyphicon-off logo-small"></a>
                <h4>REGISTER IDs</h4>
                <p>Register new Technicians and Customers</p>
              </div>
            </div>
            <br /><br />
            <div className="row slideanim"> 
              <div className="col-sm-4">
              <a href="/stores" className="glyphicon glyphicon-phone-alt logo-small"></a>
                
                <h4>VOICE</h4>                                                              
                <p>Lorem ipsum dolor sit amet..</p>
              </div>
              <div className="col-sm-4">
              <a href="#" className="glyphicon glyphicon-tasks logo-small"></a>
              
                <h4 style={{color:"#303030"}}>ADSL</h4>
                <p>Lorem ipsum dolor sit amet..</p>
              </div>
              <div className="col-sm-4">
              <a href="#" className="glyphicon glyphicon-blackboard logo-small"></a>
                <h4 style={{color:"#303030"}}>PEO-TV</h4>
                <p>Lorem ipsum dolor sit amet..</p>
              </div>
            </div>
          </div>
          </div>   
        );

    }
}
                
                    
                    
export default Sevices;
