import React, { Component } from 'react';
import { Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Nav from '../front/nav';
import './editpassword.css';

class Editpassword extends Component {
    constructor(props) {
        super(props)
        this.state = {
            password: '',
            cmfpassword: '',
            cmfValidate: false,
            formValid: false,
            passwordValid: false,
            passerr: true,
            cmfpasserr: true,
            errname: '',
            succname: '',
            default:true,
            err: true,
            showalert:false,
            successmsg: false,
            res:false,
            backmsg:''
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
    resetForm = () => {
        this.setState({
            ...this.state,
            password:'',
            cmfpassword:'',
            default:true,
            showalert:false,
            success:false
      
        })
      }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let passwordValid = this.state.passwordValid;
        let cmfValidate=this.state.cmfValidate
        switch (fieldName) {
            case 'password':
                passwordValid = value.length >= 6;
                if (!passwordValid) {
                    this.setState({
                        errname: "your password too short",
                        err: true,
                        passerr: true,
                        cmfpasserr: true
                    })
                } else {
                    this.setState({
                        ...this.state,
                        succname: "your password can be accepted",
                        err: false,
                        passerr: false,
                        cmfpasserr: true
                    })
                }
                break;
            case 'cmfpassword':
                if (this.state.cmfpassword !== this.state.password) {
                    this.setState({
                        ...this.state,
                        errname: "confirmation can't be accepted",
                        err: true,
                        cmfpasserr: true
                    })
                } else {
                    this.setState({
                        ...this.state,
                        succname: "password confirmed",
                        err: false,
                        cmfpasserr: false
                    })
                }
                break;
            default:
                break;
        }
    }
    alert() {
        if(this.state.showalert){
        if(this.state.passerr){
            return(
              <div className="alert alert-danger" role="alert">
              <h2 className="msg">check your password field once again</h2>
            </div>
             )
           }
           else if(this.state.cmfpasserr){
            return(
              <div className="alert alert-danger" role="alert">
              <h2 className="msg">password comfirmation not valid</h2>
            </div>
             )
           }
        }else{
            if(this.state.res){
                return(
                    <div className="alert alert-danger" role="alert">
                    <h2 className="msg">{this.state.backmsg}</h2>
                  </div>
                   ) 

            }
        }
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
                            <a className="navbar-brand" href="/home"><Image src="../../assets/1.jpg" className="Imagedetails" /></a>
                        </div>
                        <div className="collapse navbar-collapse" id="myNavbar">
                            <ul className="nav navbar-nav navbar-right">
                                <li><a href="/Home">HOME</a></li>
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
        if (!this.state.passerr && !this.state.cmfpasserr) {
            const user = {
                password:this.state.password    
            }
            fetch("http://localhost:4000/reg/resetpwd/"+this.props.match.params.id+"/"+this.props.match.params.password, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user)
            })
                .then(res => res.json())
                .then(json => {
                    if (json.success) {
                        this.setState({
                            successmsg: true,
                        })
                        this.success();
                        this.resetForm();
                    } else {
                        if (!json.success) {
                            this.alert();
                            this.setState({
                                backmsg:json.msg,
                                res:true
                            })
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
    formfield() {
        return (
            <div>
                <div className="container">
                    <form onSubmit={this.handleSubmit} name="inventry">
                        <div className="form-group col-md-8">
                            <label htmlFor="exampleFormControlInput1">new password :</label>
                            <input type="password" className="form-control" id="exampleFormControlInput1" name="password" placeholder="Enter your new password" value={this.state.password} onChange={this.handleChange} required />
                        </div>
                        <div className="form-group col-md-8">
                            <label htmlFor="exampleFormControlInput1">Comfirm Password :</label>
                            <input type="password" className="form-control" id="exampleFormControlInput1" name="cmfpassword" placeholder="comfirm your new password" value={this.state.cmfpassword} onChange={this.handleChange} required />
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
                        <h3 className="title">Change Profile Password</h3>
                        <div className="row content">
                        <div className="middle">
                            <div className="col-md-8">
                                <hr />
                                    {this.err()}
                                    {this.alert()}
                                    {this.success()}
                                <div>
                                    {this.formfield()}
                                </div>
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
export default Editpassword;