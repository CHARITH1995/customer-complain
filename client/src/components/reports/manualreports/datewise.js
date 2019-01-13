import React, { Component } from 'react';
import Nav from '../../front/nav';
import { Image } from 'react-bootstrap';
import Searchreport from "../searchreport";
import PieChart from "react-svg-piechart";
import { Link } from 'react-router-dom';

class Datewise extends Component {
    constructor(props) {
        super(props);
        this.state = {
            is_mount:true,
            complains: [],
            data: [{
                title: '',
                value: 0,
                color: ''
            }],
            details: []
        }
    }
    logout = (e) => {
        e.preventDefault();
        localStorage.clear();
        sessionStorage.clear();
        this.props.history.push("/");
    }
    nav() {
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
                            <a className="navbar-brand" href="/home"><Image src="../../assets/1.jpg" className="Imagedetails" /></a>
                        </div>
                        <div className="collapse navbar-collapse" id="myNavbar">
                            <ul className="nav navbar-nav navbar-right">
                                <li><a href="/Home">HOME</a></li>
                                <li className="custname"><a href="#">{localStorage.getItem('fname')}</a></li>
                                <li><a href="#" onClick={this.logout}>LOGOUT</a></li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
    details(){
        var authToken = localStorage.token;
        fetch("http://localhost:4000/reports/manualreports/"+this.props.match.params.year+"/"+this.props.match.params.month, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer' + authToken
            },
        }).then(function (response) {
            return response.json();
        }).then(data => {
            if(this.state.is_mount){
                this.state.is_mount=false
            this.setState({
                complains: data
            })
        }
            for(var i = 1; i <= this.state.complains.length; i++) {
                this.setState({
                    data: {
                        title: this.state.complains[i - 1]._id.subarea,
                        value: parseInt(this.state.complains[i - 1].total),
                        color: this.state.complains[i - 1]._id.color,
                    }
                })
                this.state.details.push(this.state.data)
            }
        })
    }
    componentDidMount() {
       this.details();
    }
    render() {
        if (localStorage.token) {
            return (
                <div>
                    <div id="services" className="container-fluid text-center">
                        {this.nav()}
                        <h3 className="text-center"><Link to='/reports'>Reports</Link> Of Month -{this.props.match.params.month} Year - {this.props.match.params.year}</h3>
                        <br />
                        <div className="container col-md-12 slideanim ">
                            <div className="col-md-5">
                                <h3 className="text-center"> Complains</h3>
                                <PieChart
                                    data={this.state.details}
                                    expandOnHover
                                    onSectorHover={(d, i, e) => {
                                        if (d) {
                                            console.log("Mouse enter - Index:", i, "Data:", d, "Event:", e)
                                        } else {
                                            console.log("Mouse leave - Index:", i, "Event:", e)
                                        }
                                    }
                                    }
                                />
                            </div>
                            <div className="col-md-5">
                                <div className="area">
                                    {
                                        this.state.complains.map(complain =>
                                            <div className="row">
                                                <div className="card">
                                                    <div className="cards-body" style={{ background: complain._id.color }}>
                                                        <div >
                                                            <ul>
                                                                <li><Link to={"/Subarea/" + complain._id.subarea}><span className="attribute">Subarea : </span>{complain._id.subarea}</Link></li>
                                                                <li><span className="attribute">Total Complains : </span>{complain.total}</li>
                                                            </ul>
                                                            <hr />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                        <br /><br />
                    </div>
                </div>
            )
        }
    }
}
export default Datewise;