import React, { Component } from 'react';
import { Image, Panel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Nav from '../front/nav';
import '../profile/adminprofile.css';

class Purchupdate extends Component {
    constructor(props) {
        super(props)
        this.state = {
            items: [],
            name: '',
            email: '',
            qty: 0,
            type: '',
            nameerr: '',
            itemerr: '',
            showsuc: false,
            showerr: false,
            show: true,
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
            showsuc: false,
            showerr: false,
            msg: '',
            nameerr: '',
            itemerr: ''
        });
    }
    handleValidation() {
        let formvalid = true
        if (this.state.qty <= 0) {
            this.setState({
                nameerr: 'invalid quantiy'
            });
            formvalid = false
        }
        if (this.state.item === "1") {
            this.setState({
                itemerr: 'select the item'
            });
            formvalid = false

        }


        return formvalid
    }
    resetForm = () => {
        this.setState({
            ...this.state,
            qty: '',
            type: '',
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
            showsuc: false,
            showerr: false,
            msg: '',
            nameerr: '',
            itemerr: ''
        })
        e.preventDefault();
        if (this.handleValidation()) {
            const purchase = {
                purchqty: this.state.qty,
                item: this.state.type,
                updateqty:0
            }
            fetch("http://localhost:4000/purch/up/" + this.props.match.params.id, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer' + authToken
                },
                body: JSON.stringify(purchase)
            }).then(function (response) {
                return response.json();
            }).then(detail => {
                if (detail.success) {
                    this.setState({
                        showsuc: true,
                        msg: detail.msg
                    })
                    this.resetForm();
                } else {
                    this.setState({
                        showerr: true,
                        msg: detail.msg
                    })
                }
            })
        }
    }

    componentDidMount() {
        var authToken = localStorage.token;
        fetch("http://localhost:4000/purch/getpurch/" + this.props.match.params.id, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer' + authToken
            },
        }).then(function (response) {
            return response.json();
        }).then(detail => {
            this.setState({
                name: detail.name,
                qty: detail.purchqty,
                email: detail.email,
                type: detail.item,
            });
        });
        fetch("http://localhost:4000/items/showitems", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer' + authToken
            },
        }).then(function (response) {
            return response.json();
        }).then(details => {
            if (details.success) {
                this.setState({
                    items: details.data
                })
            }
        });
    }
    formfield() {
        return (
            <div className="idform">
                <div>
                    <form onSubmit={this.handleSubmit} name="inventry">
                        <div className="form-group col-md-8">
                            <label htmlFor="exampleFormControlInput1">Name :</label>
                            <input type="text" className="form-control" id="exampleFormControlInput1" name="name" placeholder="change first name" value={this.state.name} onChange={this.handleChange} disabled />
                        </div>
                        <div className="form-group col-md-8">
                            <label htmlFor="exampleFormControlInput2">Email :</label>
                            <input type="text" className="form-control" id="exampleFormControlInput2" name="email" placeholder="change the email" value={this.state.email} onChange={this.handleChange} disabled />
                            <span style={{ color: "#FD6571" }}>{this.state.emailerr}</span>
                        </div>
                        <div className="form-group col-md-8">
                            <label htmlFor="exampleFormControlInput1">Item :</label>
                            <select className="form-control" id="Select1" name="type" value={this.state.type} onChange={this.handleChange} required>
                                <span style={{ color: "#FD6571" }}>{this.state.itemerr}</span>
                                <option value="1">select type</option>
                                {
                                    this.state.show ? (
                                        this.state.items.map(item =>
                                            <option value={item.name}>{item.name}</option>
                                        )
                                    ) : (
                                            <div className="message">
                                                <Panel bsStyle="success" className="text-center">
                                                    <Panel.Heading>
                                                        <Panel.Title componentClass="h3">{this.state.msg}</Panel.Title>
                                                    </Panel.Heading>
                                                </Panel>
                                            </div>
                                        )
                                }
                            </select>
                        </div>
                        <div className="form-group col-md-8">
                            <label htmlFor="exampleFormControlInput2">Purch Qty :</label>
                            <input type="text" className="form-control" id="exampleFormControlInput2" name="qty" placeholder="change last name" value={this.state.qty} onChange={this.handleChange} required />
                            <span style={{ color: "#FD6571" }}>{this.state.nameerr}</span>
                        </div>
                        <br /><br />
                        <div className="form-group col-md-8">
                            <input type="submit" name="update" value="Update" className="btn btn-info" />
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
                        <h2 className="titles">Update Purchase Details</h2>
                        <div className="col-sm-2 sidebar">
                            <div className="list-group ">
                                <a className="list-group-item active">Quick Links</a>
                                <a className="list-group-item"><Link to={"/purchview/" + this.props.match.params.id}>Purchase Details</Link></a>
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
export default Purchupdate;