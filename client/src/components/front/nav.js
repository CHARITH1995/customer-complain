import React,{Component} from 'react';
import {Image} from 'react-bootstrap';
import { withRouter } from "react-router-dom";

class Nav extends Component{
    logout=(e)=>{
        e.preventDefault();
        localStorage.clear();
        sessionStorage.clear();
        this.props.history.push("/");
    }
    render(){
        return(
            <div >
            <nav className="navbar navbar-default navbar-fixed-top">
                <div className="container">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand" href="/home"><Image src="assets/1.jpg" className="Imagedetails" /></a>
                    </div>
                    <div className="collapse navbar-collapse" id="myNavbar">
                        <ul className="nav navbar-nav navbar-right">
                            <li><a href="/Home">HOME</a></li>
                            <li className="custname"><a href="#">{sessionStorage.getItem('fname')}</a></li>
                            <li><a href="#" onClick={this.logout}>LOGOUT</a></li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}
}
export default withRouter(Nav);
    
