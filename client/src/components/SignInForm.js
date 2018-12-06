import React, { Component } from 'react';
import { Image } from 'react-bootstrap';
import './SignInForm.css';
import { Link , withRouter} from "react-router-dom";

class SignInForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            data: '',
            token: '',
            showalert: false,
            default: true,
            signInError: []
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
            showalert: false
        });
    }

    handleSubmit(e) {
        const user = {
            email: this.state.email,
            password: this.state.password
        }
        e.preventDefault();
        fetch("http://localhost:4000/reg/log", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(json => {
                if (json.success) {
                    sessionStorage.setItem('fname', json.fname);
                    localStorage.setItem('token',json.token,'lname',json.lname,'fname');
                    sessionStorage.setItem('lname', json.lname);
                    this.setState({
                        signInError: json.success,
                        token: json.token
                    })
                    this.props.history.push('/Home');
                } else {
                    this.setState({
                        signInError: json.msg,
                        default: false,
                        showalert: true
                    })
                    if (json.token) {
                        this.resetForm1();
                        console.log(json.flag);
                    } else {
                        this.resetForm();
                    }   
                }
            })

    }
    alert() {
        if (this.state.showalert) {
            return (
                <div className="alert" role="alert">
                    <span>{this.state.signInError}</span>
                </div>
            )
        }
    }
    resetForm1 = () => {
        this.setState({
            ...this.state,
            password: '',
        })
    }

    resetForm = () => {
        this.setState({
            ...this.state,
            email: '',
            password: '',
        })
    }

    render() {
        return (
            <div className="back">
                <div id="about" className="container-fluid">
                    <div className="row">
                        <div className="col-md-1">
                        </div>
                        <div className="col-md-8 slideanim">
                            <div className="modal-dialog modal-login">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <div className="avata">
                                            <Image src="./assets/1.jpg" className="avatar" />
                                        </div>
                                        <h4 className="modal-title">Login</h4>
                                        <div className="box">
                                            {this.alert()}
                                        </div>
                                    </div>
                                    <div className="modal-body">
                                        <form onSubmit={this.handleSubmit}>
                                            <div className="form-group">
                                            <i className="fa fa-user"></i>
                                                <input type="email" className="form-control" name="email" placeholder="email" value={this.state.email} onChange={this.handleChange} required="required" />
                                            </div>
                                            <div className="form-group">
                                                <i className="fa fa-lock"></i>
                                                <input type="password" className="form-control" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} required="required" />
                                            </div>
                                            <div className="form-group">
                                                <input type="submit" name="login" className="btn btn-primary btn-lg btn-block login-btn" value="Login" />
                                            </div>
                                            <Link to ="/passwordreset">forget password?</Link>
                                        </form>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-2">
                    </div>
                </div>
            </div>
        );

    }

}


export default withRouter(SignInForm);
