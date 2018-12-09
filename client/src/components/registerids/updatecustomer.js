import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import './employee.css';

class Updatecustomer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fname: '',
            laneone:'',
            lanetwo:'',
            city:'',
            postalcode:null,
            backmsg:'',
            lname: '',
            accountNumber: '',
            email: '',
            id: '',
            deviceOne: '',
            deviceTwo: '',
            deviceThird: '',
            subarea: '',
            default: true,
            err: false,
            fnameerr: false,
            lnameerr: false,
            emailerr: false,
            accountnumerr:false,
            iderr:false,
            errname: '',
            showalert: false,
            succname: '',
            successmsg: false,
            mail: false,
            accountNUmValidate:'',
            emailValid: true,
            nameValid: true,
            formValid: true,
            addressvalid:true,
            addressvaliderr:'',
            postalvaliderr:'',
            postalvalid:true
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
            mail:false,
            successmsg:false
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
        let postalvalid = this.state.postalvalid;
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
                        err:true,
                        emailerr:true,
                    })
                } else {
                    this.setState({
                        succname: "your email can be accepted",
                        err: false,
                        emailerr: false
                    })
                }
                break;
            case 'id':
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
                        succname: "your NIC can be accepted",
                        err: false,
                        iderr: false
                    })
                }
                    break;
                    case 'accountNumber':
                    accountNUmValidate = value.match(/^[vVxX][1-9]{10}$/i);
                    if (!accountNUmValidate) {
                        this.setState({
                            errname: "Account number is not in correct format",
                            err: true,
                            accountnumerr: true
                        })
                    } else {
                        this.setState({
                            ...this.state,
                            succname: "Account number can be accepted",
                            err: false,
                            accountnumerr: false
                        })
                    }
                        break;
                  default:
                break;
        }
    }
    componentDidMount() {
        var authToken = localStorage.token;
        fetch("http://localhost:4000/register/editcustomer/"+this.props.match.params.id, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer' + authToken
            },
        }).then(function (response) {
            return response.json();
        }).then(data => {
            console.log(data)
            this.setState({
                fname:data.firstname,
                lname: data.lastname,
                subarea: data.subarea,
                accountNumber: data.accountNumber,
                laneone:data.address.laneone,
                lanetwo:data.address.lanetwo,
                city:data.address.city,
                postalcode:parseInt(data.address.postalcode),
                id: data.Id,
                deviceOne: data.deviceOne,
                deviceTwo: data.deviceTwo,
                deviceThird: data.deviceThird,
                email:data.email,
            });
            // console.log(this.state.Description)
        });

        //console.log(this.state.Description)
    }
    handleSubmit(e) {
        var authToken = localStorage.token;
        this.setState({
            ...this.state,
            default:true
          })
        const customer = {
            fname: this.state.fname,
            lname: this.state.lname,
            subarea: this.state.subarea,
            accountNumber: this.state.accountNumber,
            laneone:this.state.laneone,
            lanetwo:this.state.lanetwo,
            city:this.state.city,
            postalcode:parseInt(this.state.postalcode),
            id: this.state.id,
            deviceOne: this.state.deviceOne,
            deviceTwo: this.state.deviceTwo,
            deviceThird: this.state.deviceThird,
            email: this.state.email,
        }
        e.preventDefault();
        if(!this.state.lnameerr &&!this.state.fnameerr && !this.state.emailerr && !this.state.iderr&& !this.state.accountnumerr){
        fetch("http://localhost:4000/register/updatecustomer/"+this.props.match.params.id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer' + authToken
            },
            body: JSON.stringify(customer)
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
                        this.setState({
                          mail:true,
                          backmsg:json.msg
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
            lname: '',
            laneone:'',
            lanetwo:'',
            city:'',
            postalcode:'',
            accountNumber: '',
            email: '',
            id: '',
            deviceOne:1,
            deviceTwo: 1,
            deviceThird:1,
            subarea: 1
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
            }else if (this.state.postalvaliderr) {
                return (
                    <div className="alert alert-danger" role="alert">
                        <h2 className="msg">check your address fields once again</h2>
                    </div>
                )
            }
        }
    }
    success() {
        if (this.state.successmsg) {
            return (
                <div className="alert alert-info" role="alert">
                    <h2 className="msg">!!!updated successfully!!!</h2>
                </div>
            )

        }
    }
    mailvalid() {
        if (this.state.mail) {
            return (
                <div className="container alert alert-danger" role="alert">
                    <h2 className="msg">{this.state.backmsg}</h2>
                </div>
            )
        }
    }
   
    formfield() {
        return (
            <div>
                <div className="container slideanim">
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group col-md-4">
                            <label htmlFor="exampleFormControlInput1"> First Name :</label>
                            <input type="text" className="form-control" id="exampleFormControlInput1" name="fname" placeholder=" first name" value={this.state.fname} onChange={this.handleChange} required />
                        </div>
                        <div className="form-group col-md-4">
                            <label htmlFor="exampleFormControlInput1">Last Name :</label>
                            <input type="text" className="form-control" id="exampleFormControlInput1" name="lname" placeholder=" last name" value={this.state.lname} onChange={this.handleChange} required />
                        </div>
                        <div className="form-group col-md-8">
                            <label htmlFor="exampleFormControlInput1">Email :</label>
                            <input type="email" className="form-control" id="exampleFormControlInput1" name="email" placeholder="name@example.com" value={this.state.email} onChange={this.handleChange} required />
                        </div>
                        <div className="form-group col-md-8">
                            <label htmlFor="exampleFormControlInput1">Account number :</label>
                            <input type="text" className="form-control" id="exampleFormControlInput1" name="accountNumber" placeholder="CR0000000000" value={this.state.accountNumber} onChange={this.handleChange} required />
                        </div>
                        <div className="form-group col-md-8">
                            <label htmlFor="exampleFormControlInput1">NIC number :</label>
                            <input type="text" className="form-control" id="exampleFormControlInput1" name="id" placeholder="0000000000V" value={this.state.id} onChange={this.handleChange} />
                        </div>
                        <div className="form-group col-md-8">
                            <label htmlFor="exampleFormControlInput1">Address :</label>
                            <input type="text" className="form-control" id="exampleFormControlInput1" name="laneone" placeholder="1st lane" value={this.state.laneone} onChange={this.handleChange} required />
                            <input type="text" className="form-control" id="exampleFormControlInput1" name="lanetwo" placeholder="2nd lane" value={this.state.lanetwo} onChange={this.handleChange} />
                            <input type="text" className="form-control" id="exampleFormControlInput1" name="city" placeholder="city" value={this.state.city} onChange={this.handleChange} required />
                            <input type="number" className="form-control" id="exampleFormControlInput1" name="postalcode" placeholder="postal code" value={this.state.postalcode} onChange={this.handleChange} required />
                        </div>
                        <div className="form-group col-md-8">
                            <label htmlFor="exampleFormControlInput1">Sub Area :</label>
                            <select className="form-control" id="exampleFormControlSelect1" name="subarea" value={this.state.subarea} onChange={this.handleChange} required>
                                <option value="1" >--Select Sub-Area--</option>
                                <option value="kandy">Kandy</option>
                                <option value="galle">Galle</option>
                                <option value="gampaha">Gampaha</option>
                                <option value="colombo">Colombo</option>
                            </select>
                        </div>
                        <div className="form-group col-md-8">
                            <label htmlFor="exampleFormControlInput1">Device #1 :</label>
                            <select className="form-control" id="exampleFormControlSelect1" name="deviceOne" value={this.state.deviceOne} onChange={this.handleChange} required>
                                <option value="1" >--Select device #1--</option>
                                <option value="ADSL">ADSL</option>
                                <option value="VOICE">VOICE</option>
                                <option value="ROUTER">ROUTER</option>
                            </select>
                        </div>
                        <div className="form-group col-md-8">
                            <label htmlFor="exampleFormControlInput1">Device #2 :</label>
                            <select className="form-control" id="exampleFormControlSelect1" name="deviceTwo" value={this.state.deviceTwo} onChange={this.handleChange} >
                                <option >--Select device #2--</option>
                                <option value="1 ">NO-2nd-DEVICE</option>
                                <option value="ADSL">ADSL</option>
                                <option value="VOICE">VOICE</option>
                                <option value="ROUTER">ROUTER</option>
                            </select>
                        </div>
                        <div class="form-group col-md-8">
                            <label htmlFor="exampleFormControlInput1">Device #3 :</label>
                            <select className="form-control" id="exampleFormControlSelect1" name="deviceThird" value={this.state.deviceThird} onChange={this.handleChange} >
                                <option>--Select device #3--</option>
                                <option value="1">NO-3rd-DEVICE</option>
                                <option value="ADSL">ADSL</option>
                                <option value="VOICE">VOICE</option>
                                <option value="ROUTER">ROUTER</option>
                            </select>
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
    render() {
        if(localStorage.token){
        return (
            <div>
                <div className="head">
                    {this.navbar()}
                </div>
                    <h3 className="custitle">UPDATE-CUSTOMER</h3>
                <hr />
                    <div className="col-sm-2 sidebar">
                            <div className="list-group ">
                                <a className="list-group-item active">show all users</a>
                                <a className="list-group-item"><Link to={"/showcustomer"}>Cutomers</Link></a>
                                <a className="list-group-item"><Link to={"/showemployees"}>Employees</Link></a>
                            </div>
                        </div>
                <div className="container">
                    <div className="row content">
                        <div className="col-md-8">
                        <div className="message">
                                {this.err()}
                                {this.alert()}
                                {this.mailvalid()}
                                {this.success()}
                                </div>    
                            <div>
                                {this.formfield()}
                            </div>
                        </div>
                    </div>
                    
                    <hr />
                </div>
            </div>
        );
    }
}
}
export default Updatecustomer;