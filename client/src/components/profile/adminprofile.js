import React, { Component } from 'react';
import { Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Nav from '../front/nav';
import './adminprofile.css';

class Adminprofile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fname: '',
            lname: '',
            imagepath: '',
            errname: '',
            succname: '',
            id:'',
            default: true,
            err: true,
            fnameerr: true,
            lnameerr: true,
            showalert: false,
            successmsg: false,
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
            default: false,
            showalert: false,
            successmsg: false,
        },
            () => {
                this.validateField(name, value)
            });
    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let fnameValid = this.state.fnameValid;
        let lnameValid = this.state.lnameValid;

        switch (fieldName) {
            case 'fname':
                fnameValid = value.match(/^[a-zA-Z]{3,}$/i);
                if (!fnameValid) {
                    this.setState({
                        errname: "your first name field incorrect",
                        err: true,
                        fnameerr: true
                    })
                } else {
                    this.setState({
                        succname: "your first name field in correct format",
                        err: false,
                        fnameerr: false
                    })
                }
                break;
            case 'lname':
                lnameValid = value.match(/^[a-zA-Z]{3,}$/i);
                if (!lnameValid) {
                    this.setState({
                        errname: "your last name field incorrect",
                        err: true,
                        lnameerr: true
                    })
                } else {
                    this.setState({
                        succname: "your last name field in correct format",
                        err: false,
                        lnameerr: false
                    })
                }
                break;
            default:
                break;
        }
    }
    alert() {
        if (this.state.showalert) {
            if (this.state.fnameerr) {
                return (
                    <div className="alert alert-danger" role="alert">
                        <h2 className="msg">check your first name field once again</h2>
                    </div>
                )
            } else if (this.state.lnameerr) {
                return (
                    <div className="alert alert-danger" role="alert">
                        <h2 className="msg">check your last name field once again</h2>
                    </div>
                )
            }
        }
    }
    resetForm = () => {
        this.setState({
            ...this.state,
            fname: '',
            lname:'',
            default:true,
            showalert:false,
            success:false
      
        })
      }
    success() {
        if (this.state.successmsg) {
            return (
                <div className="alert alert-info" role="alert">
                    <h2 className="msg">!!!Update successfully!!!</h2>
                </div>
            )
        }
    }
    err = () => {
        if (this.state.default) {
            return (
                <div></div>
            )
        }
        else if (this.state.err) {
            return (
                <div className="alert alert-danger" role="alert">
                    <h2 className="msg">{this.state.errname}</h2>
                </div>
            )
        }
        else {
            return (
                <div className="alert alert-success" role="alert">
                    <h2 className="msg">{this.state.succname}</h2>
                </div>
            )

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
    handleSubmit(e) {
        var authToken = localStorage.token;
        this.setState({
            ...this.state,
            default: true
        })
        e.preventDefault();
        if (!this.state.lnameerr && !this.state.fnameerr) {
            const user = {
                fname: this.state.fname,
                lname: this.state.lname,
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
                            successmsg: true
                        })
                        this.success();
                        this.resetForm();
                    } else {
                        if (json.msg) {
                            this.alert();
                        }
                    }
                })
        } else {
            this.setState({
                showalert: true
            })
            this.alert();
        }

    }

    componentDidMount() {
        var authToken = localStorage.token;
        fetch("/reg/editprofile/" + localStorage.token, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer' + authToken
            },
        }).then(function (response) {
            return response.json();
        }).then(detail => {
            console.log(detail.data)
            this.setState({
                fname: detail.data.fname,
                lname: detail.data.lname,
                email: detail.data.email,
                id: detail.data._id,
                password:detail.data.password,
                imagepath: detail.data.imagepath
            });
        });
        console.log(this.state.fname)
    }
    formfield() {
        return (
            <div>
                <div className="container">
                    <form onSubmit={this.handleSubmit} name="inventry">
                        <div className="form-group col-md-8">
                            <label htmlFor="exampleFormControlInput1">First Name :</label>
                            <input type="text" className="form-control" id="exampleFormControlInput1" name="fname" placeholder="change first name" value={this.state.fname} onChange={this.handleChange} required />
                        </div>
                        <div className="form-group col-md-8">
                            <label htmlFor="exampleFormControlInput2">Last Name :</label>
                            <input type="text" className="form-control" id="exampleFormControlInput2" name="lname" placeholder="change last name" value={this.state.lname} onChange={this.handleChange} required />
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
                        <h3 className="title">Change Profile</h3>
                        <div className="row content">
                            <div className="col-md-8">
                                <hr />
                                <div>
                                    {this.err()}
                                    {this.alert()}
                                    {this.success()}
                                </div>
                                <div>
                                    {this.formfield()}
                                </div>
                                <div className="editbuttongroup">
                                    <div className="viewbutton">
                                        <Link to={"/editpassword/"+ this.state.id+"/"+this.state.password  } className="glyphicon glyphicon-circle-arrow-right">EditPassword</Link>
                                    </div>
                                </div>
                                <hr />
                            </div>
                            <div className="col-md-2">
                                <div>
                                    <Image src={"../../public/images/2.jpg"} className="storeimage" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
}
export default Adminprofile;