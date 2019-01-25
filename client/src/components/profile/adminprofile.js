import React, { Component } from 'react';
import { Image, Panel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Nav from '../front/nav';
import './adminprofile.css';

class Adminprofile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fname: '',
            lname: '',
            email: '',
            password:'',
            tp: '',
            id: '',
            imagepath: '',
            id: '',
            lnameerr: '',
            fnameerr: '',
            emailerr: '',
            tperr: '',
            showsuc: false,
            showerr: false,
            msg: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        let target = e.target;
        let value = target.type === 'checkbox' ? target.checked : target.value
        let name = target.name;
        this.setState({
            [name]: value,
            lnameerr: '',
            fnameerr: '',
            emailerr: '',
            tperr: '',
            showsuc: false,
            showerr: false,
            msg: '',
        });
    }
    handleValidation() {
        let formvalid = true
        if (this.state.fname !== 'undefined') {
            if (!this.state.fname.match(/^[a-zA-Z]{3,}$/i)) {
                this.setState({
                    fnameerr: 'first name invalid!',
                })
                formvalid = false
            }
        }
        if (this.state.lname !== 'undefined') {
            if (!this.state.lname.match(/^[a-zA-Z]{3,}$/i)) {
                this.setState({
                    lnameerr: 'first name invalid!',
                })
                formvalid = false
            }
        }
        if (this.state.email !== 'undefined') {
            if (!this.state.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
                this.setState({
                    emailerr: 'email invalid!',
                })
                formvalid = false
            }
        }
        if (this.state.tp !== 'undefined') {
            if (!this.state.tp.match(/^[0-9\-\+]{10}$/i)) {
                this.setState({
                    tperr: 'telephone number invalid!',

                })
                formvalid = false
            }
        }

        return formvalid
    }
    resetForm = () => {
        this.setState({
            ...this.state,
            fname: '',
            lname: '',
            email: '',
            tp: '',
            id: '',
            default: true,
            showalert: false,
            success: false

        })
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
    handleSubmit(e) {
        var authToken = localStorage.token;
        this.setState({
            ...this.state,
            default: true
        })
        e.preventDefault();
        if (this.handleValidation()) {
            const user = {
                fname: this.state.fname,
                lname: this.state.lname,
                email: this.state.email,
                Tp: this.state.tp,
                Id: this.state.id,
                dbid: this.state.dbid
            }
            fetch("http://localhost:4000/register/newid", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer' + authToken
                },
                body: JSON.stringify(user)
            })
                .then(res => res.json())
                .then(json => {
                    if (json.success) {
                        this.setState({
                            showsuc:true,
                            msg: json.msg
                        })
                        this.resetForm()
                    } else {
                        this.setState({
                            showerr: true,
                            msg: json.msg
                        })
                    }
                })
        }
    }

    componentDidMount() {
        var authToken = localStorage.token;
        const token = {
            token: authToken
        }
        fetch("/reg/editprofile", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer' + authToken
            },
            body: JSON.stringify(token)
        }).then(function (response) {
            return response.json();
        }).then(detail => {
            this.setState({
                fname: detail.data.fname,
                lname: detail.data.lname,
                email: detail.data.email,
                id: detail.data.Id,
                dbid: detail.data._id,
                tp: detail.data.Tp,
                password:detail.data.password
            });
        });
    }
    formfield() {
        return (
            <div className="idform">
                <div>
                    <form onSubmit={this.handleSubmit} name="inventry">
                        <div className="form-group col-md-8">
                            <label htmlFor="exampleFormControlInput1">First Name :</label>
                            <input type="text" className="form-control" id="exampleFormControlInput1" name="fname" placeholder="change first name" value={this.state.fname} onChange={this.handleChange} required />
                            <span style={{ color: "#FD6571" }}>{this.state.fnameerr}</span>
                        </div>
                        <div className="form-group col-md-8">
                            <label htmlFor="exampleFormControlInput2">Last Name :</label>
                            <input type="text" className="form-control" id="exampleFormControlInput2" name="lname" placeholder="change last name" value={this.state.lname} onChange={this.handleChange} required />
                            <span style={{ color: "#FD6571" }}>{this.state.lnameerr}</span>
                        </div>
                        <div className="form-group col-md-8">
                            <label htmlFor="exampleFormControlInput2">Email :</label>
                            <input type="text" className="form-control" id="exampleFormControlInput2" name="email" placeholder="change the email" value={this.state.email} onChange={this.handleChange} required />
                            <span style={{ color: "#FD6571" }}>{this.state.emailerr}</span>
                        </div>
                        <div className="form-group col-md-8">
                            <label htmlFor="exampleFormControlInput2">Employee Id :</label>
                            <input type="text" className="form-control" id="exampleFormControlInput2" name="id" value={this.state.id} onChange={this.handleChange} disabled />
                        </div>
                        <div className="form-group col-md-8">
                            <label htmlFor="exampleFormControlInput2">Telephone :</label>
                            <input type="text" className="form-control" id="exampleFormControlInput2" name="tp" placeholder="change the telephone" value={this.state.tp} onChange={this.handleChange} required />
                            <span style={{ color: "#FD6571" }}>{this.state.tperr}</span>
                        </div>
                        <br /><br />
                        <div className="form-group col-md-8">
                            <input type="submit" name="update" value="Submit" className="btn btn-info" />
                        </div>
                    </form>
                </div>
            </div>
        )
    }
    render() {
        if (localStorage.token) {
            return (
                <div>
                    <div className="head">
                        {this.navbar()}
                    </div>
                    <div className="container-fluid">
                        <h2 className="title">Change Profile</h2>
                        <div className="col-sm-2 sidebar">
                            <div className="list-group ">
                                <a className="list-group-item active">Quick Links</a>
                                <a className="list-group-item"><Link to={"/editpassword/" + this.state.dbid + "/" + this.state.password}>Edit Password</Link></a>
                            </div>
                        </div>
                        <div className="col-md-8 contain">
                            <div>
                                <div className="adminmsg">
                                    {
                                        this.state.showerr ? (
                                            <div >
                                                <Panel bsStyle="danger" className="text-center">
                                                    <Panel.Heading>
                                                        <Panel.Title componentClass="h3">{this.state.msg}</Panel.Title>
                                                    </Panel.Heading>
                                                </Panel>
                                            </div>
                                        ) : (
                                                <div>

                                                </div>
                                            )
                                    }
                                    {
                                        this.state.showsuc ? (
                                            <div className="adminmsg">
                                                <Panel bsStyle="success" className="text-center">
                                                    <Panel.Heading>
                                                        <Panel.Title componentClass="h3">{this.state.msg}</Panel.Title>
                                                    </Panel.Heading>
                                                </Panel>
                                            </div>
                                        ) : (
                                                <div>

                                                </div>
                                            )
                                    }

                                </div>
                                {this.formfield()}
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
}
export default Adminprofile;