import React, { Component } from 'react';
import { Image, OverlayTrigger, Popover, Panel } from 'react-bootstrap';
import { Link } from 'react-router-dom';


class Viewcustomers extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ids: [],
            show: true,
            msg: ''
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
        fetch("http://localhost:4000/register/getiddetails", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer' + authToken
            },
        }).then(function (response) {
            return response.json();
        }).then(data => {
            console.log(data)
            if (data.success) {
                this.setState({
                    ids: data.data
                })
            } else {
                this.setState({
                    show: false,
                    msg: data.msg
                })
            }
        });
    }
    removeitem(id) {
        var authToken = localStorage.token;
        //console.log(authToken)
        fetch("http://localhost:4000/register/removecustomer/" + id, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer' + authToken
            },
        }).then(function (response) {
            return response.json();
        }).then(data => {
            if (data.success) {
                this.setState({
                    delmsg: data.msg,
                })
                alert(this.state.msg)
                window.location.reload();
            } else {
                this.setState({
                    delmsg: data.msg
                })
            }
        })
    }
    render() {
        const popoverHoverFocus = (
            <Popover id="popover-trigger-hover-focus" title="Romove Button">
                <strong>Are you sure ???</strong> Press view button first
            </Popover>
        );
        if (localStorage.token) {
            return (
                <div>
                    <div className="head">
                        {this.navbar()}
                    </div>
                    <div className="container-fluid">
                        <h2 className="title">Registered Customer Details</h2>
                        <div className="col-sm-2 sidenav">
                            <div className="list-group ">
                                <a className="list-group-item active">show all users</a>
                                <a className="list-group-item"><Link to={"/customerids"}>Customer register</Link></a>
                                <a className="list-group-item"><Link to={"/showemployees"}>Technicians</Link></a>
                            </div>
                        </div>
                        <div className="col-sm-8">
                            {
                                this.state.show ? (
                                    this.state.ids.map(id =>
                                        <div className="contain rows">
                                            <div className="card-show">
                                                <ul className="list-group list-group-flush">
                                                    <li key={id._id} className="list-group-item">Full Name : {id.firstname} {id.lastname}</li>
                                                    <li className="list-group-item">Subarea : {id.subarea}</li>
                                                    <li className="list-group-item">Email : {id.email}</li>
                                                    <li className="list-group-item">Address : {id.address.laneone},{id.address.lanetwo},{id.address.city}</li>
                                                    <li className="list-group-item">Postal Code : {id.address.postalcode}</li>
                                                    <li className="list-group-item">Account Number : {id.accountNumber}</li>
                                                    <li className="list-group-item">NIC : {id.Id}</li>
                                                    <li className="list-group-item">Contact Number : {id.Tp}</li>
                                                    <li className="list-group-item">
                                                        <div className="storesbutton">
                                                            <Link to={"/updatecustomer/" + id._id} className="btn btn-info">Update</Link>
                                                            <OverlayTrigger
                                                                trigger={['hover', 'focus']}
                                                                placement="bottom"
                                                                overlay={popoverHoverFocus}
                                                            >
                                                                <button className="btn btn-danger" onClick={this.removeitem.bind(this, id._id)}>Remove</button>
                                                            </OverlayTrigger>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    )
                                ) : (
                                        <Panel bsStyle="danger">
                                            <Panel.Heading>
                                                <Panel.Title componentClass="h3">{this.state.msg}</Panel.Title>
                                            </Panel.Heading>
                                        </Panel>
                                    )
                            }
                        </div>
                    </div>
                </div>
            );
        }
    }
}
export default Viewcustomers;