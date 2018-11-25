import React,{Component} from 'react';
import { Image } from 'react-bootstrap';
import { withRouter } from "react-router-dom";

class Complainview extends Component{
    constructor(props){
        super(props)
            this.state={
                complain:[]
            }
        
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
        fetch("http://localhost:4000/complain/Complainview/" + this.props.match.params.id, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer' + authToken
            },
        }).then(function (response) {
            return response.json();
        })
        .then(data => {
            this.setState({
                complain: data
            });
        });
        }
    render(){
        if(localStorage.token){
        return(
            <div>
            <div className="head">
               {this.navbar()}
            </div>
            <div className="container-fluid">
                <h3 className="title">COMPLAIN DETAILS</h3>
                <div className="row content">
                    <div class="col-sm-2 sidenav">
                    </div>
                    <div class="col-sm-8 text-left">
                        <div>
                            <hr />
                            <span className="glyphicon glyphicon-file logo-small"></span>
                            <ul>
                                <li><span className="attribute">NAME : </span>{this.state.complain.name}</li>
                                <li><span className="attribute">Email: </span>{this.state.complain.email}</li>
                                <li><span className="attribute">DESCRIPTION : </span>{this.state.complain.description}</li>
                                <li><span className="attribute">DATE : </span>{this.state.complain.date}</li>
                                <li><span className="attribute">SUBAREA : </span>{this.state.complain.subarea}</li>
                                <li><span className="attribute">STATUS : </span>{this.state.complain.status}</li>                               
                            </ul>
                            <hr />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        );
    }
}
}
export default withRouter(Complainview);