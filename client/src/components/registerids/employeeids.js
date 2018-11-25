import React, { Component } from 'react';
import Nav from '../front/nav';
import { Image } from 'react-bootstrap';

class Employeeid extends Component {
    constructor(props) {
        super(props);
        this.state = {
          fname: '',
          lname:'',
          email: '',
          Id:'',
          subarea:'',
          default: true,
          err: true,
          fnameerr: true,
          lnameerr: true,
          emailerr: true,
          iderr:true,
          errname: '',
          showalert: false,
          succname: '',
          successmsg: false,
          mail: false,
          emailValid: false,
          nameValid: false,
          formValid: false
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
            mail: false,
            successmsg: false
        },
            () => {
                this.validateField(name, value)
            });
      }
      validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let emailValid = this.state.emailValid;
        let idValid = this.state.idValid;
        let fnameValid = this.state.fnameValid;
        let lnameValid = this.state.lnameValid;
        let accountNUmValidate = this.state.accountNUmValidate;
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
                        succname: "your first name field correct",
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
                        succname: "your last name field correct",
                        err: false,
                        lnameerr: false
                    })
                }
                break;
            case 'email':
                emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                if (!emailValid) {
                    this.setState({
                        errname: "your email is not in correct format",
                        err: true,
                        emailerr: true,
                    })
                } else {
                    this.setState({
                        succname: "your email can be accepted",
                        err: false,
                        emailerr: false
                    })
                }
                break;
            case 'Id':
                idValid = value.match(/^[1-9]{9}[vVxX]$/i);
                if (!idValid) {
                    this.setState({
                        errname: "NIC is not in correct format",
                        err: true,
                        iderr: true
                    })
                } else {
                    this.setState({
                        ...this.state,
                        succname: "your id can be accepted",
                        err: false,
                        iderr: false
                    })
                }
                break;
            default:
                break;
        }
    }
    
      handleSubmit(e) {
        var authToken = localStorage.token;
        this.setState({
            ...this.state,
            default:true
          })
        const employee ={
          firstname:this.state.fname,
          lastname:this.state.lname,
          subarea:this.state.subarea,
          Id:this.state.Id,
          email:this.state.email, 
        }
        //console.log(employee)
        e.preventDefault();
        if(!this.state.lnameerr &&!this.state.fnameerr && !this.state.emailerr && !this.state.iderr){
        fetch("http://localhost:4000/register/Employeereg",{
          method:"POST",
          headers: {
            "Content-Type": "application/json",
            'Authorization': 'Bearer' + authToken
          },
          body:JSON.stringify(employee)
        })
        .then(res => res.json())
        .then(json => {
            if (json.success) {
                this.setState({
                    successmsg:true
                  })
                  this.success();
                  this.resetForm();
            } else {
                    console.log(json.msg)
                    this.setState({
                      mail:true,
                    })
                    this.alert();
            }
        })
        }else{
            this.setState({
              showalert:true
            })
            this.alert();
            }
     }
     resetForm = () => {
      this.setState({
          ...this.state,
          fname: '',
          lname:'',
          Id:'',
          email:'',
          subarea:''
      })
    }
    resetForm = () => {
        this.setState({
            ...this.state,
            fname: '',
            lname: '',
            email: '',
            Id: '',
            subarea: ''
        })
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
    alert() {
        if (this.state.showalert) {
            if (this.state.iderr) {
                return (
                    <div className="alert alert-danger" role="alert">
                        <h2 className="msg">check your ID field once again</h2>
                    </div>
                )
            }
            else if (this.state.accountnumerr) {
                return (
                    <div className="alert alert-danger" role="alert">
                        <h2 className="msg">account number is error</h2>
                    </div>
                )
            }
            else if (this.state.fnameerr) {
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
    success() {
        if (this.state.successmsg) {
            return (
                <div className="alert alert-info" role="alert">
                    <h2 className="msg">!!!Registered successfully!!!</h2>
                </div>
            )

        }
    }
    mailvalid() {
        if (this.state.mail) {
            console.log("err")
            return (
                <div className="alert alert-danger" role="alert">
                    <h2 className="msg">email is already taken!!</h2>
                </div>
            )
        }
    }
    formfield() {
        return (
            <div>
                <div className="container">
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group col-md-4">
                            <label htmlFor="exampleFormControlInput1"> First Name :</label>
                            <input type="text" className="form-control" id="exampleFormControlInput1" name="fname" placeholder=" first name" value={this.state.fname} onChange={this.handleChange} required/>
                        </div>
                        <div className="form-group col-md-4">
                            <label htmlFor="exampleFormControlInput1">Last Name :</label>
                            <input type="text" className="form-control" id="exampleFormControlInput1" name="lname" placeholder=" last name" value={this.state.lname} onChange={this.handleChange} required/>
                        </div>
                        <div className="form-group col-md-8">
                            <label htmlFor="exampleFormControlInput1">Email :</label>
                            <input type="email" className="form-control" id="exampleFormControlInput1" name="email" placeholder="name@example.com" value={this.state.email} onChange={this.handleChange} required/>
                        </div>
                        <div className="form-group col-md-8">
                            <label htmlFor="exampleFormControlInput1">Sub Area :</label>
                            <select className="form-control" id="exampleFormControlSelect1" name="subarea" value={this.state.subarea} onChange={this.handleChange} required>
                                <option >--Select Sub-Area--</option>
                                <option value="kandy">Kandy</option>
                                <option value="galle">Galle</option>
                                <option value="gampaha">Gampaha</option>
                                <option value="colombo">Colombo</option>
                            </select>
                        </div>
                        <div className="form-group col-md-8">
                            <label htmlFor="exampleFormControlInput1">NIC number :</label>
                            <input type="text" className="form-control" id="exampleFormControlInput1" name="Id" placeholder="0000000000V" value={this.state.Id} onChange={this.handleChange}/>
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
        if(localStorage.token){
        return (
                <div>
                    <div className="head">
                        <Nav />
                    </div>
                    <div className="container-fluid">
                    <h3 className="title">NEW-EMPLOYEE</h3>
                        <div className="row content">
                            <div className="col-sm-2 sidenav">
                            </div>
                            <div className="col-sm-8 text-left">
                            <div>
                                {this.err()}
                                {this.alert()}
                                {this.mailvalid()}
                                {this.success()}
                            </div>
                                <div>
                                    <hr />
                                    {this.formfield()}
                                    <hr />
                                </div>
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
export default Employeeid;