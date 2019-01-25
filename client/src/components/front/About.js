import React, { Component } from 'react';
import { BrowserRouter as Router, NavLink } from 'react-router-dom';
import './About.css';

class About extends Component {
    render() {
        return (
            <div>
            <div id="about" className="container-fluid">
            <div className="row">
              <div className="col-sm-8">
                <h2>About Company </h2><br />
                <h4>Sri Lanka Telecom PLC. (SLTL) is one of Sri Lanka’s most valuable blue  chip companies with a market capitalisation which, as at 31st December 2017 topped Rs. 51 billion.</h4><br />
                <p> Sri Lanka Telecom is the leading Digital Service Provider and the leading broadband and backbone infrastructure services provider in the country.The Company has been awarded a National Long Term Rating of AAA (lka) and a B+ rating on Long Term Corporate Credit Rating by Standard & Poor’s.The SLT Group has a customer base of over eight million including multinational corporations, large and small corporate, public sector, retailand domestic customers. The SLT Group provides a full range of ICT facilities and services inthe areas of voice, data, broadband, wholesale, enterprise, TV and mobile services.The Sri Lanka Telecom Group provides an entire gamut of ICT solutions in the areas of fixedand mobile telephony, broadband, data, IPTV, cloud computing, hosted services and networking solutions to its valued customers via the latest cutting edge technologies and also diversified services. .</p>
                <br/><NavLink to="http://www.slt.lk/">Get in Touch</NavLink>
              </div>
              <div> <div className="col-sm-4">
              <img class ="aboutCls" src="/assets/10.jpg" /></div>
            </div>
            </div>
          </div>
         <div>
        
           <div className="col-sm-4">
             <img class ="missionCls" src="/assets/vision.jpg" /></div>
                  </div>
                  
              <div className="col-sm-8">
                <h2>Our Values</h2>
                <h4><strong>MISSION:</strong> "Your trusted spouse who enthusiastically dives into a sophisticated linguistic, innovative."</h4>
                <h4><strong>VISION:</strong> "Continuous drawing on the universally incomprehensible information, communication and entertainment services to all Sri Lankans."</h4>
              </div>
            </div>
            
         
        );

    }
}
                
                    
                    
export default About;
