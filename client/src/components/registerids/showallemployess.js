import React, { Component } from 'react';
import { Image, OverlayTrigger, Popover, Panel } from 'react-bootstrap';
import { Link } from 'react-router-dom';


class ViewEmployees extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ids: [],
            show: true,
            msg:'',
            delmsg:''
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
    removeitem(id){
        var authToken = localStorage.token;
        //console.log(authToken)
        fetch("http://localhost:4000/register/removeemployee/" + id, {
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
    componentDidMount() {
        var authToken = localStorage.token;
        fetch("http://localhost:4000/register/geteiddetails", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer' + authToken
            },
        }).then(function (response) {
            return response.json();
        }).then(details => {
            console.log(details)
            if (details.success) {
                this.setState({
                    ids: details.data
                })
            } else {
                this.setState({
                    show: false,
                    msg:details.msg
                })
            }
        });
    }
    render() {
        const popoverHoverFocus = (
            <Popover id="popover-trigger-hover-focus" title="Romove Button">
                <strong>Are you sure ???</strong>
            </Popover>
        );
        if (localStorage.token) {
            return (
                <div>
                    <div className="head">
                        {this.navbar()}
                    </div>
                    <div className="container-fluid">
                        <h2 className="title">Technician Details</h2>
                        <div className="col-sm-2 sidenav ">
                            <div className="list-group ">
                                <a className="list-group-item active">show all users</a>
                                <a className="list-group-item"><Link to={"/employeeids"}>Technician Register</Link></a>
                                <a className="list-group-item"><Link to={"/showcustomer"}>Customer Details</Link></a>
                            </div>
                        </div>
                            <div class="col-sm-8 text-left">
                                            {
                                                this.state.show ? (
                                                        this.state.ids.map(id =>
                                                            <div className="contain rows">
                                                            <div className="card-show">
                                                                <ul className="list-group list-group-flush">
                                                                    <li key={id._id} className="list-group-item">name : <span className="names">{id.firstname} {id.lastname}</span></li>
                                                                    <li className="list-group-item">Subarea : <span className="names">{id.subarea}</span></li>
                                                                    <li className="list-group-item">Email : <span className="names">{id.email}</span></li>
                                                                    <li className="list-group-item">NIC : <span className="names">{id.Id}</span></li>
                                                                    <li className="list-group-item">Contact Number : <span className="names">{id.Tp}</span></li>
                                                                    <li className="list-group-item">
                                                                        <div className="storesbutton">
                                                                            <Link to={"/updateemployee/" +id._id} className="btn btn-info">Update</Link>
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
                        <hr />
                    </div>
                </div>
            );
        }
    }
}
export default ViewEmployees;