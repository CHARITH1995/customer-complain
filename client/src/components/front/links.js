import React, { Component } from 'react';
import './container.css';


class Links extends Component {

  render() {
    return (
      <div>
        <footer class="footer">
          <div className="container bottom_border">
            <div className="row">
              <div className=" col-sm-3">
                <h3 className="headin5_amrc col_white_amrc pt2">Quick links</h3>
                <ul className="footer_ul_amrc">
                <li><a href="http://www.slt.lk/en/personal/telephone/new-connection-charges/megaline">Megaline</a></li>
                  <li><a href="http://www.slt.lk/en/personal/telephone/new-connection/voice-over-lte">4G/LTE</a></li>
                  <li><a href="http://www.slt.lk/en/personal/telephone/new-connection-charges/smartline">Fibre</a></li>
            
                  
                </ul>
              </div>
              <div className=" col-sm-3">
                <h3 className="headin5_amrc col_white_amrc pt2">Broadband</h3>
                <ul className="footer_ul_amrc">
                  <li><a href="http://www.slt.lk/en/personal/internet">ADSL</a></li>
                  <li><a href="http://www.slt.lk/en/personal/internet/lte/packages">4G/LTE</a></li>
                  <li><a href="http://www.slt.lk/en/personal/broadband/ftth/packages">Fibre</a></li>
                  <li><a href="http://www.slt.lk/en/personal/internet/hosting-services/services-and-pricing">Hosting services</a></li>
                 
                </ul>
              </div>  
              <div className=" col-sm-3">
                <h3 className="headin5_amrc col_white_amrc pt2">PeoTV</h3>
                <ul className="footer_ul_amrc">
                  <li><a href="http://www.slt.lk/en/personal/peo-tv/packages-and-charges">packages</a></li>
                  <li><a href="http://www.slt.lk/en/personal/peo-tv/channels">Channels</a></li>
                  <li><a href="http://www.slt.lk/en/personal/peo-tv/vod">Video on Demand</a></li>
                 
                </ul>
              </div>
              <div className=" col-sm-3">
                <h3 className="headin5_amrc col_white_amrc pt2">About Us</h3>
                <ul className="footer_ul_amrc">
                  <li><a href="http://www.slt.lk/en/about-us/investors">Investors</a></li>
                  <li><a href="http://www.slt.lk/en/about-us/media-center/media-kit">Media Center</a></li>
                  <li><a href="http://www.slt.lk/en/about-us/corporate-responsibility">Corporate Responsibilities</a></li>
                  <li><a href="http://www.slt.lk/en/about-us/careers/job-opportunities">Careers</a></li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
      </div>
    )
  }

}



export default Links;
