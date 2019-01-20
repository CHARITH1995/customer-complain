import React, { Component } from 'react';
import {Image, OverlayTrigger, Popover, Panel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../stores/viewitem.css';

class View extends Component {
    constructor(props) {
        super(props)
        this.state = {
            item: [],
            showsuc: false,
            showerr: false
        };
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
        this.setState({
            showsuc: false,
            showerr: false
        })
        fetch("http://localhost:4000/stores/getitem/" + this.props.match.params.id, {
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
        const popoverHoverFocus = (
            <Popover id="popover-trigger-hover-focus" title="Update button">
                <strong>You can update item here!</strong>
            </Popover>
        );
        if (localStorage.token) {
            return (
                <div>
                    <div className="head">
                        {this.navbar()}
                    </div>
                    <div className="container-fluid">
                        <h2 className="title">Item Details</h2>
                        <div className="contain row content">
                            <div className="col-sm-8 ">
                                {
                                    this.state.showerr ? (
                                        <div >
                                            <Panel bsStyle="danger" className="text-center">
                                                <Panel.Heading>
                                                    <Panel.Title componentClass="h3">{this.state.msg}</Panel.Title>
                                                </Panel.Heading>
                                            </Panel>
                                        </div>
                                    ) : (
                                            <div>

                                            </div>
                                        )
                                }
                                {
                                    this.state.showsuc ? (
                                        <div className="adminmsg">
                                            <Panel bsStyle="success" className="text-center">
                                                <Panel.Heading>
                                                    <Panel.Title componentClass="h3">{this.state.msg}</Panel.Title>
                                                </Panel.Heading>
                                            </Panel>
                                        </div>
                                    ) : (
                                            <div>

                                            </div>
                                        )
                                }
                                <div className="row">
                                    <div className="col-sm-2" >
                                        
                                    </div>
                                    <div className="col-sm-8">
                                        <div className="viewcard-body">
                                            <div >
                                                <ul className="list-group list-group-flush">
                                                    <li className="list-group-item">Insertdate :   <span className="names"> {this.state.item.insertdate} </span> </li>
                                                    <li className="list-group-item">Item Type :    <span className="names"> {this.state.item.item}       </span></li>
                                                    <li className="list-group-item">Inserted By :  <span className="names"> {this.state.item.authorizedby}</span></li>
                                                    <li className="list-group-item">Device color :<svg height="100" width="100" className="identifies">
                                                        <circle cx="50" cy="50" r="15"  stroke-width="3" fill={this.state.item.color} />
                                                    </svg></li>
                                                    <div className="viewbuttongroup">
                                                        <div className="viewbutton">
                                                            <a href="/stockview" className="glyphicon glyphicon-circle-arrow-left">Stock</a>
                                                        </div>
                                                        <div className="viewbutton">
                                                            {((localStorage.admin == 'yes') || ((localStorage.id) === this.state.item.authorizedby)) ? (
                                                                <OverlayTrigger
                                                                    trigger={['hover', 'focus']}
                                                                    placement="bottom"
                                                                    overlay={popoverHoverFocus}
                                                                >
                                                                    <Link to={"/editstockitem/" + this.state.item._id} className="btn btn-success">Update</Link>
                                                                </OverlayTrigger>
                                                            ) : (
                                                                    <div></div>
                                                                )}
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
export default View;