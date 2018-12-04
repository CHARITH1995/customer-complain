import React, { Component } from 'react';
import { Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './viewitem.css';

class Viewitem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            item: []
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
        fetch("http://localhost:4000/stores/getitemdetails/" + this.props.match.params.id, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer' + authToken
            },
        }).then(function (response) {
            return response.json();
        }).then(data => {
            this.setState({
                item: data
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
                        <h3 className="title">ITEM DETAILS</h3>
                        <div className="row content">
                            <div class="col-sm-8 text-left">
                                <div className="row">
                                    <div className="col-sm-2" >
                                        <div >
                                            <Image src={"../../stores/" + this.state.item.imagepath} className="storeimage" />
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="viewcard-body">
                                            <div >
                                                <ul>
                                                    <li><span className="attribute">Description : </span>{this.state.item.description}</li>
                                                    <li><span className="attribute">Price: </span>Rs :{this.state.item.price}</li>
                                                    <li><span className="attribute">SerialNumber : </span>{this.state.item.serialnumber}</li>
                                                    <li><span className="attribute">Insertdate : </span>{this.state.item.insertdate}</li>
                                                    <li><span className="attribute">Item Type : </span>{this.state.item.item}</li>
                                                    <li><span className="attribute">Status : </span>{this.state.item.status}</li>
                                                    <div className="viewbuttongroup">
                                                        <div className="viewbutton">
                                                            <a href="/onlinestore" className="glyphicon glyphicon-circle-arrow-left">Stores</a>
                                                        </div>
                                                        <div className="viewbutton">
                                                            <Link to={"/edititem/" + this.state.item._id} className="btn btn-success">Update</Link>
                                                        </div>
                                                    </div>
                                                </ul>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr />
                    </div>
                </div>
            );
        }
    }
}
export default Viewitem;