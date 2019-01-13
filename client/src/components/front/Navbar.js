import React, { Component } from 'react';
import { Image } from 'react-bootstrap';
import { withRouter , Link } from "react-router-dom";
import './Navbar.css';

class Navbar extends Component {
  logout=(e)=>{
    e.preventDefault();
    localStorage.clear();
    sessionStorage.clear();
    this.props.history.push("/");
}
  render() {
    return (
      <div >
        <nav className="navbar navbar-inverse navbar-fixed-top">
          <div className="container">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand" href="/"><Image src="assets/1.jpg" className="Imagedetails" /></a>
            </div>
            <div className="collapse navbar-collapse" id="myNavbar">
              <ul className="nav navbar-nav navbar-right">
                <li><a href="#about">ABOUT</a></li>
                <li><a href="#services">SERVICES</a></li>
                <li className="custname"><Link to ={"/editprofile"}>{sessionStorage.getItem('fname')}</Link></li>
                <li><a href="#" onClick={this.logout}>LOGOUT</a></li>
              </ul>
            </div>
          </div>
        </nav>


      </div>

    );
  }
}
export default withRouter(Navbar);