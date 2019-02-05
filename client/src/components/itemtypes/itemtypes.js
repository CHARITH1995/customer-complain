import React, { Component } from 'react';
import { SketchPicker } from 'react-color';
import {
    Image, OverlayTrigger, Popover, Panel, FormGroup, FormControl, HelpBlock, ControlLabel, Button
    , Table, Modal
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './itemtypes.css';
import Links from '../front/links'


class Itemtypes extends Component {
    constructor(props) {
        super(props)
        this.state = {
            items: [],
            identifier: '',
            show: true,
            showmodel: false,
            showinsert: false,
            showdelete: false,
            showmsg: false,
            name: '',
            nameerr: '',
            showerrmsg: false,
            msg: '',
            model: true,
            delete: false,
            id: '',
            view:false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChangeComplete = this.handleChangeComplete.bind(this);


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
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>

        );
    }
    handleSubmit(e) {
        var authToken = localStorage.token;
        const item = {
            name: this.state.name,
            identifier: this.state.background
        }
        e.preventDefault();
        if (this.handleValidation()) {
            fetch("http://localhost:4000/items/additemtype", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer' + authToken
                },
                body: JSON.stringify(item)
            })
                .then(res => res.json())
                .then(details => {
                    if (details.success) {
                        this.setState({
                            msg: 'successfully inserted!',
                            showmsg: true
                        })
                    } else {
                        this.setState({
                            showmsg: true,
                            msg: 'cannot insert!',
                        })
                    }
                    window.location.reload();
                })
        }
    }
    handleClose() {          //modals close 
        this.setState({
            view:false,
        });
    }
    removeitem(id) {
        var authToken = localStorage.token;
        this.setState({
            view: false,
        });
        fetch("http://localhost:4000/items/removeitems/" + id, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer' + authToken
            },
        }).then(function (response) {
            return response.json();
        }).then(data => {
            if (data.success) {
                this.setState({
                    showmsg: true,
                    msg: 'delete successfully!'
                })
                window.location.reload();
            } else {
                this.setState({
                    showerrmsg: true,
                    msg: data.msg
                })
            }
        })
    }
    handleValidation() {
        let formvalid = true
        if (!this.state.name) {
            this.setState({
                nameerr: 'field cannot be empty'
            })
            formvalid = false;
        }
        if (this.state.name !== "undefined") {
            if (!this.state.name.match("^[a-zA-Z\\s]*$")) {
                this.setState({
                    nameerr: 'name field not valid'
                })
                formvalid = false;
            }
        }
        return formvalid;
    }
    handleChange(e) {
        let target = e.target;
        let value = target.type === 'checkbox' ? target.checked : target.value
        let name = target.name;
        this.setState({
            [name]: value,
            showmsg: false,
            nameerr: '',
            showerrmsg: false
        });
    }
    handleChangeComplete = (color) => {
        this.setState({ background: color.hex });
    };

    form() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlInput1">Enter the Item Type :</label>
                        <input type="text" className="form-control" id="exampleFormControlInput1" name="name" placeholder="Item Name" value={this.state.name} onChange={this.handleChange} required />
                        <span style={{ color: "#FD6571" }}>{this.state.nameerr}</span>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlInput1">Enter Identify color</label>
                        <SketchPicker
                            color={this.state.background}
                            onChangeComplete={this.handleChangeComplete}
                        />
                    </div>
                    <div className="form-group col-md-2">
                        <div className="additembutton">
                            <input type="submit" name="submit" value="Submit" className="btn btn-info" />
                        </div>
                    </div>
                </form>
            </div>
        )
    }
    componentDidMount() {
        var authToken = localStorage.token;
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
                    items:details.data
                })
            } else {
                this.setState({
                    show: false,
                    msg: details.msg
                })
            }
        });
    }
    render() {
        const popoverHoverFocus = (
            <Popover id="popover-trigger-hover-focus" title="Romove Button">
                <strong>Are you sure ???</strong>
            </Popover>
        );
        if (localStorage.token) {
            return (
                <div>
                    <div className="head">
                        {this.navbar()}
                    </div>
                    <div className="container-fluid">
                        <h2 className="title">Item Types</h2>
                        <div className="col-sm-3">
                            {this.form()}
                        </div>
                        <div className="col-sm-8 contain">
                            {
                                this.state.view ? (
                                    <div>
                                        <Modal.Dialog>
                                            <Modal.Header closeButton>
                                                <Modal.Title>Delete Item Type</Modal.Title>
                                            </Modal.Header>

                                            <Modal.Body>
                                                <p>Do you want to delete this?</p>
                                            </Modal.Body>

                                            <Modal.Footer>
                                                <Button variant="secondary" className="btn btn-info" onClick={this.handleClose}>Close</Button>
                                                <Button variant="primary" className="btn btn-danger" onClick={this.removeitem.bind(this, this.state.id)}>Delete</Button>
                                            </Modal.Footer>
                                        </Modal.Dialog>;
                                             </div>
                                ) : (
                                        <div></div>
                                    )
                            }
                            {
                                this.state.showmsg ? (
                                    <Panel bsStyle="success" className="table">
                                        <Panel.Heading>
                                            <Panel.Title componentClass="h3">{this.state.msg}</Panel.Title>
                                        </Panel.Heading>
                                    </Panel>
                                ) : (
                                        <div></div>
                                    )
                            }
                            {
                                this.state.showerrmsg ? (
                                    <Panel bsStyle="danger" className="table">
                                        <Panel.Heading>
                                            <Panel.Title componentClass="h3">{this.state.msg}</Panel.Title>
                                        </Panel.Heading>
                                    </Panel>
                                ) : (
                                        <div></div>
                                    )
                            }
                            {
                                this.state.show ? (
                                    <Table responsive className="table">
                                        <thead>
                                            <tr>
                                                <th>Item Type</th>
                                                <th>Identify By</th>
                                                <th>Inserted At</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>{
                                            this.state.items.map(item =>
                                                <tr>
                                                    <td>{item.name}</td>
                                                    <td><svg height="100" width="100" className="identifer">
                                                        <circle cx="50" cy="50" r="15" stroke-width="3" fill={item.identifier} />
                                                    </svg></td>
                                                    <td>{item.date}</td>
                                                    <td><OverlayTrigger
                                                        trigger={['hover', 'focus']}
                                                        placement="bottom"
                                                        overlay={popoverHoverFocus}
                                                    >
                                                        <button className="btn btn-danger" onClick={() => {
                                                            this.setState({
                                                                view: true,
                                                                id: item._id
                                                            })
                                                        }}>Remove</button>
                                                    </OverlayTrigger></td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </Table>
                                ) : (
                                        <Panel bsStyle="danger" className="table">
                                            <Panel.Heading>
                                                <Panel.Title componentClass="h3">{this.state.msg}</Panel.Title>
                                            </Panel.Heading>
                                        </Panel>
                                    )
                            }
                        </div>
                        <div className="col-sm-3">
                        </div>
                    </div>
                    <Links />
                </div>
            );
        }
    }
}
export default Itemtypes;