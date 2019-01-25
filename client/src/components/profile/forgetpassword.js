import React, { Component } from 'react';
import  './forgetpassword.css';
import { Panel, Image } from 'react-bootstrap';

class Forgetpwd extends Component {
    constructor(props) {
        super(props);
        this.state = {
          email: '',
          msg:'',
          show:false,
          err:false,
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
        })
      }   
      handleSubmit(e) {
        const pwd ={
            email:this.state.email
        }
        e.preventDefault();
        fetch("http://localhost:4000/reg/forgetpwd",{
          method:"POST",
          headers: {
            "Content-Type": "application/json",
          },
          body:JSON.stringify(pwd)
        })
        .then(res => res.json())
        .then(json => {
            if(json.success){
                this.setState({
                    msg:json.msg,
                    err:true,
                    show:true
                })
            }else{
                this.setState({
                    msg:json.msg,
                    show:true
                })
            }
        })
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
                            <li><a href="/">SIGN IN</a></li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>

        );
    }
     alert() {
         if(this.state.show){
            if(this.state.err){
                return (
                    <div className="alert text-center bg-success" role="alert">
                        <span>{this.state.msg}</span>
                    </div>
                )
             }else{
                return (
                    <div className="alert text-center bg-danger" role="alert">
                        <span>{this.state.msg}</span>
                    </div>
                )
             }
         }       
    }
    formfield() {
        return (
            <div>
                <div className="idform">
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group col-md-8">
                            <label htmlFor="exampleFormControlInput1"> Email :</label>
                            <input type="text" className="form-control" id="exampleFormControlInput1" name="email" placeholder=" enter your email here!!" value={this.state.email} onChange={this.handleChange} required/>
                        </div>
                        <br /><br />
                        <div className="form-group col-md-8">
                            <input type="submit" name="submit" value="Submit" className="btn btn-info" />
                        </div>
                    </form>
                </div>
            </div>
        )
    }
    render() {
        return (
                <div>
                    <div className="head">
                    {this.navbar()}
                    </div>
                    <div className="container">
                    <h2 className="cusstitle">Enter your E-mail</h2>
                    <div className="col-sm-2">
                    </div>
                            <div className="col-sm-8 contain">
                            <div className="message">
                                {this.alert()}
                            </div>
                                {this.formfield()}
                            </div>
                    </div>
                </div>
        );
    }
}

export default Forgetpwd;