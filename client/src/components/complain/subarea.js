import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Image } from 'react-bootstrap';



class Subarea extends Component {
    constructor(props) {
        super(props)
        this.state = {
            complains: []
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
        fetch("http://localhost:4000/complain/Subarea/" + this.props.match.params.subarea, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer' + authToken
            },
        })
            .then(function (response) {
                return response.json();
            })
            .then(data => {
                console.log(data)
                this.setState({
                    complains: data
                })
            })

    }

    render() {
        if (localStorage.token) {
            return (
                <div>
                    <div className="head">
                        {this.navbar()}
                    </div>
                    <div className="container-fluid">
                        <h2 className="title">Complains from - ( {this.props.match.params.subarea} )</h2>
                        <div className="col-sm-2 sidenav">
                            <div className="list-group ">
                                    <a className="list-group-item active">SUB-AREAS</a>
                                    {/* {this.props.match.params.subarea != 'kandy' ? (<a className="list-group-item"><Link to={"/Subarea/" + "kandy"}>Kandy</Link></a>) : (<div></div>)}
                                    {this.props.match.params.subarea != 'galle' ? (<a className="list-group-item"><Link to={"/Subarea/" + "galle"}>Galle</Link></a>) : (<div></div>)}
                                    {this.props.match.params.subarea != 'gampaha' ? (<a className="list-group-item"><Link to={"/Subarea/" + "gampaha"}>Gampaha</Link></a>) : (<div></div>)}
                                    {this.props.match.params.subarea != 'colombo' ? (<a className="list-group-item"><Link to={"/Subarea/" + "colombo"}>Colombo</Link></a>) : (<div></div>)} */}
                                    <a className="list-group-item"><Link to={"/Complain"}>Complains page</Link></a>
                                </div>
                            </div>
                            <div class="col-sm-8 text-left">
                                {this.state.complains.map(complain =>
                                    <div className="contain rows">
                                        <div className="card-show">
                                            <div >
                                            <ul className="list-group list-group-flush">
                                                     <li className="list-group-item">Description : <span className="names">{complain.description}</span></li>
                                                     <li className="list-group-item">Customer Name : <span className="names">{complain.name}</span></li>
                                                     <li className="list-group-item">Email : <span className="names">{complain.email}</span></li>
                                                     <li className="list-group-item">Subarea : <span className="names">{complain.subarea}</span></li>
                                                     <li className="list-group-item">
                                                        <div className="storesbutton">
                                                        <Link to={"/Complainview/" + complain._id} className="btn btn-info">View</Link>
                                                        </div>
                                                    </li>
                                                        </ul>
                                                <hr />
                                            </div>
                                        </div>
                                    </div>
                                )
                                }
                            </div>
                            <div className="col-sm-2 sidenav">
                                <div class="list-group">
                                    <a class="list-group-item active">JOB-STATUS</a>
                                    <a class="list-group-item"><Link to={"/Status/" + "notdone" + "/" + this.props.match.params.subarea}>Not-Done</Link></a>
                                    <a class="list-group-item"><Link to={"/Status/" + "done" + "/" + this.props.match.params.subarea}>Done</Link></a>
                                </div>
                            </div>
                    </div>
                </div>
            );

        }
    }
}




export default withRouter(Subarea);
