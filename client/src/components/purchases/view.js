import React, { Component } from 'react';
import { Image, OverlayTrigger, Popover, Panel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../stores/viewitem.css';

class Purchview extends Component {
    constructor(props) {
        super(props)
        this.state = {
            item: [],
            newstatus: '',
            showsuc: false,
            showerr: false,
        };
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
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>

        );
    }

    componentDidMount() {
        var authToken = localStorage.token;
        this.setState({
            showsuc: false,
            showerr: false
        })
        fetch("http://localhost:4000/purch/getpurch/" + this.props.match.params.id, {
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
                        <h2 className="title">Purchase Details</h2>
                        <div className="contains row content">
                            <div className="col-sm-8 ">
                                <div className="row">
                                    <div className="col-sm-2" >

                                    </div>
                                    <div className="col-sm-8">
                                        <div className="viewcard-body">
                                            <div >
                                                <ul className="list-group list-group-flush">
                                                    <li className="list-group-item">Purchase date :   <span className="names"> {this.state.item.date} </span> </li>
                                                    <li className="list-group-item">Purchase Id :   <span className="names"> {this.state.item._id} </span> </li>
                                                    <li className="list-group-item">Item :   <span className="names"> {this.state.item.item} </span> </li>
                                                    <li className="list-group-item">Purchased Quantity :    <span className="names">{this.state.item.updateqty + this.state.item.purchqty}</span></li>
                                                    <li className="list-group-item">Email :    <span className="names"> {this.state.item.email} </span></li>
                                                    <li className="list-group-item">Name :    <span className="names"> {this.state.item.name}  </span></li>
                                                    <div className="viewbuttongroup">
                                                        <div className="viewbutton">
                                                            <a href="/stockview" className="glyphicon glyphicon-circle-arrow-left">Stock</a>
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
export default Purchview;