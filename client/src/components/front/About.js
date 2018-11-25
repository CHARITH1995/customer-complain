import React, { Component } from 'react';
import { BrowserRouter as Router, NavLink } from 'react-router-dom';


class About extends Component {
    render() {
        return (
            <div>
            <div id="about" className="container-fluid">
            <div className="row">
              <div className="col-sm-8">
                <h2>About Company Page</h2><br />
                <h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</h4><br />
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                <br/><NavLink to="http://www.slt.lk/">Get in Touch</NavLink>
              </div>
              <div className="col-sm-4">
                <span className="glyphicon glyphicon-signal logo slideanim"></span>
              </div>
            </div>
          </div>
          <div className="container-fluid bg-grey">
            <div className="row">
              <div className="col-sm-4">
                <span className="glyphicon glyphicon-globe logo slideanim"></span>
              </div>
              <div className="col-sm-8">
                <h2>Our Values</h2><br />
                <h4><strong>MISSION:</strong> Our mission lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</h4><br />
                <p><strong>VISION:</strong> Our vision Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
              </div>
            </div>
          </div>
          </div>
        );

    }
}
                
                    
                    
export default About;
