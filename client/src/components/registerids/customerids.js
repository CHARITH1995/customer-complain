import React, { Component } from 'react';
import Nav from '../front/nav';
import { Link } from 'react-router-dom';
import { Image, Panel } from 'react-bootstrap';
import './employee.css';

class Customerid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fname: '',
            laneone: '',
            lanetwo: '',
            city: '',
            postalcode: 0,
            lname: '',
            accountNumber: '',
            email: '',
            id: '',
            tp: '',
            subarea: '',
            lnameerr: '',
            fnameerr: '',
            emailerr: '',
            tperr: '',
            subareaerr: '',
            accountNumbererr: '',
            Iderr: '',
            addresserr: '',
            postalcodeerr: '',
            showsuc: false,
            authorize_by: '',
            showerr: false,
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
            addresserr: '',
            postalcodeerr: '',
            subareaerr: '',
            Iderr: '',
            accountNumbererr: '',
            showsuc: false,
            showerr: false,
        });
    }

    handleSubmit(e) {
        var authToken = localStorage.token;
        const customer = {
            fname: this.state.fname,
            lname: this.state.lname,
            subarea: this.state.subarea,
            accountNumber: this.state.accountNumber,
            laneone: this.state.laneone,
            lanetwo: this.state.lanetwo,
            city: this.state.city,
            postalcode: parseInt(this.state.postalcode),
            id: this.state.id,
            Tp: this.state.tp,
            email: this.state.email,
            authorize_by: localStorage.id
        }
        e.preventDefault();
        if (this.handleValidation()) {
            fetch("http://localhost:4000/register/Customerreg", {
                method: "POST",
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
                            showsuc: true,
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
        if (this.state.id !== 'undefined') {
            if (!this.state.id.match(/^[1-9]{9}[vVxX]$/i)) {
                this.setState({
                    Iderr: 'NIC invalid!',

                })
                formvalid = false
            }
        }
        if ((this.state.laneone == 'undefined') || (this.state.city == 'undefine')) {
            this.setState({
                addresserr: 'check address field',
            })
            formvalid = false

        }
        if ((this.state.postalcode == 'undefined')) {
            this.setState({
                postalcodeerr: 'insert your postal code',
            })
            formvalid = false

        }
        if ((this.state.accountNumber == 'undefined')) {
            if (!this.state.accountNumbererr.match(/^[CcRr][1-9]{9}$/i)) {
                this.setState({
                    Iderr: 'NIC invalid!',

                })
                formvalid = false
            }

        }
        return formvalid
    }
    resetForm = () => {
        this.setState({
            fname: '',
            lname: '',
            laneone: '',
            lanetwo: '',
            city: '',
            postalcode: '',
            accountNumber: '',
            email: '',
            id: '',
            tp: ''
        })
    }
    formfield() {
        return (
            <div>
                <div className="idform">
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
                            <label htmlFor="exampleFormControlInput1">Sub Area :</label>
                            <select className="form-control" id="exampleFormControlSelect1" name="subarea" value={this.state.subarea} onChange={this.handleChange} required>
                                <span style={{ color: "#FD6571" }}>{this.state.subareaerr}</span>
                                <option value="1" >--Select Sub-Area--</option>
                                <option value="kandy">Kandy</option>
                                <option value="galle">Galle</option>
                                <option value="gampaha">Gampaha</option>
                                <option value="colombo">Colombo</option>
                            </select>
                        </div>
                        <div className="form-group col-md-8">
                            <label htmlFor="exampleFormControlInput1">Account number :</label>
                            <input type="text" className="form-control" id="exampleFormControlInput1" name="accountNumber" placeholder="CR0000000000" value={this.state.accountNumber} onChange={this.handleChange} required />
                            <span style={{ color: "#FD6571" }}>{this.state.accountNumbererr}</span>
                        </div>
                        <div className="form-group col-md-8">
                            <label htmlFor="exampleFormControlInput1">NIC number :</label>
                            <input type="text" className="form-control" id="exampleFormControlInput1" name="id" placeholder="0000000000V" value={this.state.id} onChange={this.handleChange} />
                            <span style={{ color: "#FD6571" }}>{this.state.Iderr}</span>
                        </div>
                        <div className="form-group col-md-8">
                            <label htmlFor="exampleFormControlInput1">Telephone number :</label>
                            <input type="number" className="form-control" id="exampleFormControlInput1" name="tp" placeholder="name@example.com" value={this.state.tp} onChange={this.handleChange} />
                            <span style={{ color: "#FD6571" }}>{this.state.tperr}</span>
                        </div>
                        <div className="form-group col-md-8">
                            <label htmlFor="exampleFormControlInput1">Address :</label>
                            <input type="text" className="form-control" id="exampleFormControlInput1" name="laneone" placeholder="1st lane" value={this.state.laneone} onChange={this.handleChange} required />
                            <input type="text" className="form-control" id="exampleFormControlInput1" name="lanetwo" placeholder="2nd lane" value={this.state.lanetwo} onChange={this.handleChange} />
                            <input type="text" className="form-control" id="exampleFormControlInput1" name="city" placeholder="city" value={this.state.city} onChange={this.handleChange} required />
                            <span style={{ color: "#FD6571" }}>{this.state.addresserr}</span>
                            <input type="number" className="form-control" id="exampleFormControlInput1" name="postalcode" placeholder="postal code" value={this.state.postalcode} onChange={this.handleChange} required />
                            <span style={{ color: "#FD6571" }}>{this.state.postalcodeerr}</span>
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
                    <h2 className="custitle">New Customer Register</h2>
                    <div className="col-sm-2 sidebar">
                        <div className="list-group ">
                            <a className="list-group-item active">show all users</a>
                            <a className="list-group-item"><Link to={"/showcustomer"}>Customers</Link></a>
                            <a className="list-group-item"><Link to={"/showemployees"}>Technician</Link></a>
                        </div>
                    </div>
                            <div className="col-md-8 contain">
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
                                            this.state.showsuc ? (
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
export default Customerid;