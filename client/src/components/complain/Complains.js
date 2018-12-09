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
            activePage: 1,
            total: 0,
            value: 1,
            length:true,
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
                console.log(data.success)
                if (data.success) {
                    this.setState({
                        length:true,
                        complains: data.details,
                    })
                } else {
                    this.setState({
                         length:false
                    })
                }
                console.log(this.state.length)
                console.log(data.details)
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
                        <h3 className="title">Complains of this Month</h3>
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
                             {
                                this.state.length ? (
                                    <div class="col-sm-8">
                                    <div className="col-md-2"></div>
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
                                ):(
                                <div class="col-sm-8 bg-danger">
                                <h2>No complains to show</h2>
                            </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default withRouter(Complains);
