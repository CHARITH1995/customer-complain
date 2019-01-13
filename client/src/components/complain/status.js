import React,{Component} from 'react';
import {Image} from 'react-bootstrap';
import { withRouter } from "react-router-dom";
import { Link } from 'react-router-dom';

class Status extends Component{
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
    componentDidMount() {
        var authToken = localStorage.token;
        fetch("http://localhost:4000/complain/Status/"+this.props.match.params.status+"/"+this.props.match.params.subarea, {
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
                            <a className="navbar-brand" href="/home"><Image src="../../assets/1.jpg" className="Imagedetails" /></a>
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

    render(){
        if(localStorage.token){
        return(
            <div>
                <div className="head">
                    {this.navbar()}
                </div>
                <div className="container-fluid">
                <h2 className="title"><Link to={"/Complain"}> COMPLAINS </Link> -{this.props.match.params.subarea} - ( {this.props.match.params.status} )</h2>
                    <div className="col-sm-2 sidenav">
                                <div className="list-group ">
                                    <a className="list-group-item active">SUB-AREAS</a>
                                    <a className="list-group-item"><Link to={"/Subarea/" + "kandy"}>Kandy</Link></a>
                                    <a className="list-group-item"><Link to={"/Subarea/" + "galle"}>Galle</Link></a>
                                    <a className="list-group-item"><Link to={"/Subarea/" + "gampaha"}>Gampaha</Link></a>
                                    <a className="list-group-item"><Link to={"/Subarea/" + "colombo"}>Colombo</Link></a>
                                </div>
                            </div>
                        <div class="col-sm-8 text-left">
                        <div className="row content">
                        {this.state.complains.map(complain =>
                                <div >
                                    <ul>
                                        <li><span className="attribute">NAME : </span>"{complain.name}"</li>
                                        <li><span className="attribute">EMAIL: </span>{complain.email}</li>
                                        <li><span className="attribute">DESCRIPTION : </span>{complain.description}</li>
                                        <li><span className="attribute">DATE : </span>"{complain.date}"</li>
                                        <li><span className="attribute">SUBAREA: </span>{complain.subarea}</li> 
                                    </ul>
                                    <hr />
                                </div>
                            )
                            }
                        </div>
                        <div className="col-sm-2 sidenav">
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
}
export default Status;