import React, { Component } from 'react';
import { Image } from 'react-bootstrap';
import { withRouter } from "react-router-dom";

class Complainview extends Component {
    constructor(props) {
        super(props)
        this.state = {
            complain: []
        }

    }
    logout = (e) => {
        e.preventDefault();
        localStorage.clear();
        sessionStorage.clear();
        this.props.history.push("/");
    }
    navbar() {
        return (
            <div >
                <nav className="navbar navbar-default navbar-fixed-top">
                    <div className="container">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                            <a className="navbar-brand" href="/home"><Image src="../assets/1.jpg" className="Imagedetails" /></a>
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
    componentDidMount() {
        var authToken = localStorage.token;
        fetch("http://localhost:4000/complain/Complainview/" + this.props.match.params.id, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer' + authToken
            },
        }).then(function (response) {
            return response.json();
        })
            .then(data => {
                this.setState({
                    complain: data
                });
            });
    }
    render() {
        if (localStorage.token) {
            return (
                <div>
                    <div className="head">
                        {this.navbar()}
                    </div>
                    <div className="container-fluid">
                        <h2 className="title">Complain details</h2>
                        <div className="contain row content">
                            <div className="col-sm-8 ">
                            <div class="col-sm-2 sidenav"> 
                            <span className="glyphicon glyphicon-file logo-small"></span>
                            </div>
                            <div class="col-sm-8 text-left">
                                <div className="viewcard-body">
                                    <div>
                                        <ul className="list-group list-group-flush">
                                            <li className="list-group-item">Description :  <span className="names"> {this.state.complain.description} </span></li>
                                            <li className="list-group-item">Email :  <span className="names"> {this.state.complain.email} </span></li>
                                            <li className="list-group-item">Complain Date :  <span className="names"> {this.state.complain.date} </span></li>
                                            <li className="list-group-item">Subarea :  <span className="names"> {this.state.complain.subarea} </span></li>
                                            <li className="list-group-item">Status :  <span className="names"> {this.state.complain.status} </span></li>
                                            <div className="viewbuttongroup">
                                                <div className="viewbutton">
                                                    <a href="/Complain" className="glyphicon glyphicon-circle-arrow-left">complains</a>
                                                </div>
                                            </div>
                                        </ul>
                                        <hr />
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
}
export default withRouter(Complainview);