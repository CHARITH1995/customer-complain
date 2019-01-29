import React, { Component } from 'react';
import Nav from '../front/nav';
import { Panel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './employee.css';

class Employeeid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fname: '',
            lname: '',
            email: '',
            Id: '',
            tp: '',
            msg: '',
            show: false,
            showerr: false,
            lnameerr: '',
            fnameerr: '',
            emailerr: '',
            tperr: '',
            subareaerr: '',
            Iderr: '',
            authorize_by:'',
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
    handleSubmit(e) {
        var authToken = localStorage.token;
        //console.log(employee)
        e.preventDefault();
        if (this.handleValidation()) {
            const employee = {
                firstname: this.state.fname,
                lastname: this.state.lname,
                subarea: this.state.subarea,
                Id:this.state.Id,
                Tp:this.state.tp,
                email: this.state.email,
                authorize_by:localStorage.id
            }
            fetch("http://localhost:4000/register/Employeereg", {
                method: "POST",
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
    resetForm = () => {
        this.setState({
            ...this.state,
            fname: '',
            lname: '',
            Id: '',
            email: '',
            subarea: '',
            tp: ''
        })
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
                    tperr: 'telephone invalid!',

                })
                formvalid = false
            }
        }
        if (this.state.subarea == 'undefined') {
            this.setState({
                subareaerr: 'please select the subarea',

            })
            formvalid = false

        }
        if (this.state.Id !== 'undefined') {
            if (!this.state.Id.match(/^[1-9]{9}[vVxX]$/i)) {
                this.setState({
                    Iderr: 'NIC invalid!',

                })
                formvalid = false
            }
        }
        return formvalid
    }
    formfield() {
        return (
            <div>
                <div className="idform">
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group col-md-8">
                            <label htmlFor="exampleFormControlInput1"> First Name :</label>
                            <input type="text" className="form-control" id="exampleFormControlInput1" name="fname" placeholder=" first name" value={this.state.fname} onChange={this.handleChange} />
                            <span style={{ color: "#FD6571" }}>{this.state.fnameerr}</span>
                        </div>
                        <div className="form-group col-md-8">
                            <label htmlFor="exampleFormControlInput1">Last Name :</label>
                            <input type="text" className="form-control" id="exampleFormControlInput1" name="lname" placeholder=" last name" value={this.state.lname} onChange={this.handleChange} />
                            <span style={{ color: "#FD6571" }}>{this.state.lnameerr}</span>
                        </div>
                        <div className="form-group col-md-8">
                            <label htmlFor="exampleFormControlInput1">Email :</label>
                            <input type="email" className="form-control" id="exampleFormControlInput1" name="email" placeholder="name@example.com" value={this.state.email} onChange={this.handleChange} />
                            <span style={{ color: "#FD6571" }}>{this.state.emailerr}</span>
                        </div>
                        <div className="form-group col-md-8">
                            <label htmlFor="exampleFormControlInput1">Telephone number :</label>
                            <input type="number" className="form-control" id="exampleFormControlInput1" name="tp" placeholder="0912258051" value={this.state.tp} onChange={this.handleChange} />
                            <span style={{ color: "#FD6571" }}>{this.state.tperr}</span>
                        </div>
                        <div className="form-group col-md-8">
                            <label htmlFor="exampleFormControlInput1">Sub Area :</label>
                            <select className="form-control" id="exampleFormControlSelect1" name="subarea" value={this.state.subarea} onChange={this.handleChange}>
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
                            <input type="text" className="form-control" id="exampleFormControlInput1" name="Id" placeholder="0000000000V" value={this.state.Id} onChange={this.handleChange} />
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
    render() {
        if (localStorage.token) {
            return (
                <div>
                    <div className="head">
                        <Nav />
                    </div>
                    <h2 className="custitle">New Technician Register</h2>
                    <div className="col-sm-2 sidebar">
                        <div className="list-group ">
                            <a className="list-group-item active">Quick Links</a>
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
export default Employeeid;