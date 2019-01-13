import React, { Component } from 'react';
import Nav from '../../front/nav';
import {Image , ProgressBar , Label} from 'react-bootstrap';
import Searchreport from "../searchreport";
import PieChart from "react-svg-piechart";
import { Link } from 'react-router-dom';

class Areawise extends Component {
    constructor(props) {
        super(props);
        this.state = {
            complains: [],
            done:0,
            notdone:0,
            details: []
        }
    }
    logout=(e)=>{
        e.preventDefault();
        localStorage.clear();
        sessionStorage.clear();
        this.props.history.push("/");
    }
    nav(){
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
        )
    }
    componentDidMount() {
        var authToken = localStorage.token;
        fetch("http://localhost:4000/reports/manualreports/"+this.props.match.params.subarea, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer' + authToken
            },
        }).then(function (response) {
            return response.json();
        }).then(data => {
            this.setState({
                complains: data
            })
            for (var i = 1; i <= this.state.complains.length; i++) {
                if(this.state.complains[i-1]._id.status === 'done'){
                    this.setState({
                        done:parseInt(this.state.complains[i - 1].total)
                    })
                }
                if(this.state.complains[i-1]._id.status === 'notdone'){
                    this.setState({
                        notdone:parseInt(this.state.complains[i - 1].total)
                    })
                }
                this.state.details.push(this.state.data);
            }
        })
    }
    render() {
        if (localStorage.token) {
            return (
                <div>
                    <div id="services" className="container-fluid text-center">
                        {this.nav()}
                        <h2 className="text-center">Total Reports Of Subarea - {this.props.match.params.subarea}</h2>
                        <br />
                        <div className="col-md-2">
                        <div className="list-group ">
                            <a className="list-group-item active">Quick Links</a>
                            <a className="list-group-item"><Link to={"/reports"} >Reports</Link></a>
                        </div>
                        </div>
                        <div className="col-md-10">
                            <div className="lablename">
                            <Label bsStyle="success">Finished jobs</Label>{' '}
                            </div>
                            <ProgressBar striped bsStyle="success" now={this.state.done} label={`${this.state.done}`} />
                            
                            <div className="lablename">
                            <Label bsStyle="danger">Not Finished jobs</Label>
                            </div>
                            <ProgressBar striped bsStyle="danger" now={this.state.notdone} label={`${this.state.notdone}`}/>
                            
                        <br /><br />
                    </div>
                    </div>
                </div>
            )
        }
    }
}
export default Areawise;