import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Image } from 'react-bootstrap';



class Subarea extends Component {
    constructor(props) {
        super(props)
        this.state = {
           complains:[]
        };
    }
    logout=(e)=>{
        e.preventDefault();
        localStorage.clear();
        sessionStorage.clear();
        this.props.history.push("/");
    }
    navbar(){
        return(
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
        fetch("http://localhost:4000/complain/Subarea/"+this.props.match.params.subarea, {
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
                this.setState({
                    complains:data
                })
            })
           
    }

    render() {
        if(localStorage.token){
        return (
            <div>
                <div className="head">
                    {this.navbar()}
                </div>
                <div className="container-fluid">
                <h3 className="title">COMPLAINS -{this.props.match.params.subarea}</h3>
                    <div className="row content">
                        <div className="col-sm-2 sidenav"> 
                        </div>
                        <div class="col-sm-8 text-left">
                            {this.state.complains.map(complain =>
                                <div >
                                    <ul>
                                        <li><span className="attribute">NAME : </span>"{complain.name}"</li>
                                        <li><span className="attribute">EMAIL: </span>{complain.email}</li>
                                        <li><span className="attribute">DESCRIPTION : </span>{complain.description}</li>
                                        <li><span className="attribute">DATE : </span>"{complain.date}"</li>
                                        <li><span className="attribute">STATUS: </span>{complain.status}</li> 
                                    </ul>
                                    <hr />
                                </div>
                            )
                            }
                        </div>
                        <div className="col-sm-2 sidenav well">
                            <div class="list-group">
                                <a class="list-group-item active">JOB-STATUS</a>
                                <a  class="list-group-item"><Link to={"/Status/"+"notdone"+"/"+this.props.match.params.subarea}>Not-Done</Link></a>
                                <a  class="list-group-item"><Link to={"/Status/"+"done"+"/"+this.props.match.params.subarea}>Done</Link></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );

    }
}
}




export default withRouter(Subarea);
