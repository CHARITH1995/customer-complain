import React, { Component } from 'react';
import { Image } from 'react-bootstrap';
import Nav from '../front/nav';
import { Link } from 'react-router-dom';
import { css } from '@emotion/core';
import { HashLoader } from 'react-spinners';
import Links from '../front/links'
import './register.css';


const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

class Register extends Component {
    constructor(props) {
        super(props);
        this.state={
            loading:true
        }
    }
    logout = (e) => {
        e.preventDefault();
        localStorage.clear();
        sessionStorage.clear();
        this.props.history.push("/");
    }
    componentDidMount(){
        this.setState({
            loading:false
        })
    }
    navbar() {
        return (
            <div>
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
    render() {
        if (localStorage.token) {
            return (
                <div>
                    {
                        this.state.loading ? (
                            <div className='sweet-loading'>
                                <HashLoader
                                    css={override}
                                    sizeUnit={"px"}
                                    size={50}
                                    color={'#0073F5'}
                                    loading={this.state.loading} />
                            </div>
                        ) : (
                                <div>
                                    <div className="head">
                                        <Nav />
                                    </div>
                                    <div className="container-fluid">
                                        <h2 className="title">Register Here!</h2>
                                        <div className="row content">
                                            <div className="col-sm-2 sidenav">
                                            </div>
                                            <div class="col-sm-8 text-left">
                                                <div>
                                                    <ul>
                                                        <hr />
                                                        <h4 className="links"><Link to={"/customerids"} className="glyphicon glyphicon-user"> Customer</Link></h4>
                                                        <hr />
                                                        <h4 className="links"><Link to={"/employeeids"} className="glyphicon glyphicon-thumbs-up"> Technician</Link></h4>
                                                        <hr />
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="col-sm-2 sidenav">

                                            </div>
                                        </div>
                                    </div>
                                    <Links />
                                </div>
                            )
                    }
                </div>
            );
        }
    }
}
export default Register;