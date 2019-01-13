import React, { Component } from 'react';
import { Image, OverlayTrigger, Popover, Panel } from 'react-bootstrap';
import { Link } from 'react-router-dom';


class Viewcustomers extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ids: [],
            show: true,
            msg:''
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
                    msg:data.msg
                })
            }
        });
    }
    removeitem(id){
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
                    delmsg:data.msg,
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
                                <a className="list-group-item"><Link to={"/showemployees"}>Employees</Link></a>
                            </div>
                        </div>
                        <div className="row content">
                            <div class="col-sm-8 text-left">
                                <div className="row">
                                    <div className="col-sm-6">
                                        <div className="viewcard-body">
                                            {
                                                this.state.show ? (
                                                        this.state.ids.map(id =>
                                                          <div className="row">
                                                            <div className="card-show">
                                                                <ul className="list-group list-group-flush">
                                                                    <li  className="list-group-item">name :{id.firstname} {id.lastname}</li>
                                                                    <li className="list-group-item">Status :{id.subarea}</li>
                                                                    <li  className="list-group-item">name :{id.email}</li>
                                                                    <li className="list-group-item">Status :{id.address.laneone}</li>
                                                                    <li  className="list-group-item">name :{id.accountNumber}</li>
                                                                    <li className="list-group-item">Status :{id.deviceOne}</li>
                                                                    <li className="list-group-item">name :{id.deviceTwo}</li>
                                                                    <li className="list-group-item">Status :{id.deviceThird}</li>
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
                            </div>
                        </div>
                        <hr />
                    </div>
                </div>
            );
        }
    }
}
export default Viewcustomers;