import React, { Component } from 'react';
import { Image, Panel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './employee.css';

class updateemployee extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fname: '',
            lname: '',
            email: '',
            id: '',
            tp: '',
            subarea: '',
            msg: '',
            show: false,
            showerr: false,
            lnameerr: '',
            fnameerr: '',
            emailerr: '',
            tperr: '',
            subareaerr: '',
            Iderr: '',
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
            subareaerr: '',
            Iderr: '',
            show: false,
            showerr: false,
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
        if (this.state.id !== 'undefined') {
            if (!this.state.id.match(/^[1-9]{9}[vVxX]$/i)) {
                this.setState({
                    Iderr: 'NIC invalid!',
                })
                formvalid = false
            }
        }
        if (this.state.tp !== 'undefined') {
            if (!this.state.tp.match(/^[0-9\-\+]{10}$/i)) {
                this.setState({
                    tperr: 'telephone invalid!',

                })
                formvalid = false
            }
        }
        if (this.state.subarea === 'undefined') {
            this.setState({
                subareaerr: 'please select the subarea',

            })
            formvalid = false

        }
        return formvalid
    }
    resetForm = () => {
        this.setState({
            ...this.state,
            fname: '',
            lname: '',
            id: '',
            email: '',
            subarea: '',
            tp: ''
        })
    }
    componentDidMount() {
        var authToken = localStorage.token;
        fetch("http://localhost:4000/register/editemployee/" + this.props.match.params.id, {
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
                fname: data.firstname,
                lname: data.lastname,
                subarea: data.subarea,
                accountNumber: data.accountNumber,
                id: data.Id,
                tp: data.Tp,
                email: data.email,
            });
            // console.log(this.state.Description)
        });

        //console.log(this.state.Description)
    }
    handleSubmit(e) {
        var authToken = localStorage.token;
        this.setState({
            ...this.state,
            default: true
        })
        const employee = {
            firstname: this.state.fname,
            lastname: this.state.lname,
            subarea: this.state.subarea,
            Id: this.state.id,
            Tp: this.state.tp,
            email: this.state.email,
        }
        //console.log(employee)
        e.preventDefault();
        if (this.handleValidation()) {
            fetch("http://localhost:4000/register/updateemployee/" + this.props.match.params.id, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer' + authToken
                },
                body: JSON.stringify(employee)
            })
                .then(res => res.json())
                .then(json => {
                    if (json.success) {
                        this.setState({
                            show: true,
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
    formfield() {
        return (
            <div className="idform">
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group col-md-8">
                            <label htmlFor="exampleFormControlInput1"> First Name :</label>
                            <input type="text" className="form-control" id="exampleFormControlInput1" name="fname" placeholder=" first name" value={this.state.fname} onChange={this.handleChange} required />
                            <span style={{ color: "#FD6571" }}>{this.state.fnameerr}</span>
                        </div>
                        <div className="form-group col-md-8">
                            <label htmlFor="exampleFormControlInput1">Last Name :</label>
                            <input type="text" className="form-control" id="exampleFormControlInput1" name="lname" placeholder=" last name" value={this.state.lname} onChange={this.handleChange} required />
                            <span style={{ color: "#FD6571" }}>{this.state.lnameerr}</span>
                        </div>
                        <div className="form-group col-md-8">
                            <label htmlFor="exampleFormControlInput1">Email :</label>
                            <input type="email" className="form-control" id="exampleFormControlInput1" name="email" placeholder="name@example.com" value={this.state.email} onChange={this.handleChange} required />
                            <span style={{ color: "#FD6571" }}>{this.state.emailerr}</span>
                        </div>
                        <div className="form-group col-md-8">
                            <label htmlFor="exampleFormControlInput1">Telephone number :</label>
                            <input type="number" className="form-control" id="exampleFormControlInput1" name="tp" placeholder="0777123456" value={this.state.tp} onChange={this.handleChange} required />
                            <span style={{ color: "#FD6571" }}>{this.state.tperr}</span>
                        </div>
                        <div className="form-group col-md-8">
                            <label htmlFor="exampleFormControlInput1">Sub Area :</label>
                            <select className="form-control" id="exampleFormControlSelect1" name="subarea" value={this.state.subarea} onChange={this.handleChange} required>
                                <span style={{ color: "#FD6571" }}>{this.state.subareaerr}</span>
                                <option >--Select Sub-Area--</option>
                                <option value="kandy">Kandy</option>
                                <option value="galle">Galle</option>
                                <option value="gampaha">Gampaha</option>
                                <option value="colombo">Colombo</option>
                            </select>
                        </div>
                        <div className="form-group col-md-8">
                            <label htmlFor="exampleFormControlInput1">NIC number :</label>
                            <input type="text" className="form-control" id="exampleFormControlInput1" name="id" placeholder="0000000000V" value={this.state.id} onChange={this.handleChange} />
                            <span style={{ color: "#FD6571" }}>{this.state.Iderr}</span>
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
        if (localStorage.token) {
            return (
                <div>
                    <div className="head">
                        {this.navbar()}
                    </div>
                    <h2 className="custitle">Technician Details Update</h2>
                    <div className="col-sm-2 sidebar">
                        <div className="list-group ">
                            <a className="list-group-item active">show all users</a>
                            <a className="list-group-item"><Link to={"/showcustomer"}>Customers Details</Link></a>
                            <a className="list-group-item"><Link to={"/showemployees"}>Technicians Details</Link></a>
                        </div>
                    </div>
                    <div className="col-sm-8 contain">
                        <hr />
                        <div>
                            {
                                this.state.showerr ? (
                                    <div className="message">
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
                                this.state.show ? (
                                    <div className="message">
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
                        <div>
                            {this.formfield()}
                        </div>
                    </div>
                </div>
            );
        }
    }
}
export default updateemployee;