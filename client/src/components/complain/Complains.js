import React, { Component } from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';
import Nav from '../front/nav';
import './Complains.css';
import { Image } from 'react-bootstrap';
import Pagination from "react-js-pagination";


class Complains extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            complains: [],
            activePage:1,
            total: 0,
            value:1
        };
    }
    handlePageChange(pageNumber) {
        this.setState({ activePage: pageNumber });
    }

    componentDidMount() {
        var authToken = localStorage.token;
        fetch("http://localhost:4000/complain/comp", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer' + authToken
            },
        })
            .then(function (response) {
                return response.json();
            })
            .then(data => {
                this.setState({
                    complains:data.complains,
                    total: data.count
                })
            })
    }

    render() {
        if (localStorage.token) {
            return (
                <div>
                    <div className="head">
                        <Nav />
                    </div>
                    <div className="container-fluid">
                        <h3 className="title">COMPLAINS HOME PAGE</h3>
                        <div className="row content">
                            <div className="col-sm-2 sidenav">
                                <div className="list-group ">
                                    <a className="list-group-item active">SUB-AREAS</a>
                                    <a className="list-group-item"><Link to={"/Subarea/" + "kandy"}>Kandy</Link></a>
                                    <a className="list-group-item"><Link to={"/Subarea/" + "galle"}>Galle</Link></a>
                                    <a className="list-group-item"><Link to={"/Subarea/" + "gampaha"}>Gampaha</Link></a>
                                    <a className="list-group-item"><Link to={"/Subarea/" + "colombo"}>Colombo</Link></a>
                                </div>
                            </div>
                            <div class="col-sm-8">
                                {this.state.complains.map(complain =>
                                    <div className="row">
                                        <div className="card">
                                            <div className="card-body">
                                                <div >
                                                    <ul>
                                                        <li><span className="attribute">NAME : </span>"{complain.name}"</li>
                                                        <li><span className="attribute">EMAIL: </span>{complain.email}</li>
                                                        <li><span className="attribute">DESCRIPTION : </span>{complain.description}</li>
                                                        <div className="buttonlist">
                                                            <Link to={"/Complainview/" + complain._id} className="btn btn-info">View</Link>
                                                        </div>
                                                    </ul>
                                                    <hr />
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                )
                                }
                            </div>
                        </div>
                        <div className="text-center">
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default withRouter(Complains);
