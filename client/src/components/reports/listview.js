import React, { Component } from 'react';
import { SwatchesPicker } from 'react-color';
import {
    Image, OverlayTrigger, Popover, Panel, FormGroup, FormControl, HelpBlock, ControlLabel, Button
    , Table , ProgressBar
} from 'react-bootstrap';
import { Link } from 'react-router-dom';



class Storedata extends Component {
    constructor(props) {
        super(props)
        this.state = {
            items: [],
            identifier: '',
            show: true,
            msg: '',
            delmsg: ''
        }
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
    componentDidMount() {
        var authToken = localStorage.token;
        fetch("http://localhost:4000/stores/onlinestore", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer' + authToken
            },
        }).then(function (response) {
            return response.json();
        }).then(data => {
            if (data.success) {
                this.setState({
                    items: data.data,
                })
                console.log(this.state.items)
            } else {
                this.setState({
                    showitems: false,
                    showerr: true,
                    msg: data.msg
                })
            }

        });
    }
    removeitem(id) {
        var authToken = localStorage.token;
        //console.log(authToken)
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
                    delmsg: data.msg,
                })
                //alert(this.state.msg)
                window.location.reload();
            } else {
                this.setState({
                    delmsg: data.msg
                })
            }
        })
    }
    render() {
        const popoverHoverFocus = (
            <Popover id="popover-trigger-hover-focus" title="Romove Button">
                <strong>Are you sure ???</strong>
            </Popover>
        );
        var count = 1;
        if (localStorage.token) {
            return (
                <div>
                    <div className="head">
                        {this.navbar()}
                    </div>
                    <div className="container-fluid">
                        <h2 className="title">STORE DETAILS IN BRIEF </h2>
                        <div className="col-sm-2">
                        <div className="list-group ">
                            <div className="list-group ">
                                <a className="list-group-item active">QUICK LINKS</a>
                                <a className="list-group-item"><Link to={"/onlinestore"}>Back to Store</Link></a>
                            </div>
                            </div>  
                        </div>
                        <div className="col-sm-8">
                            {
                                this.state.show ? (
                                    <Table responsive className="table">
                                        <thead>
                                            <tr>
                                                <th>Stocket Id:</th>
                                                <th>Equipment Name:</th>
                                                <th>Available Amount:</th>
                                                <th>Sold Amount:</th>
                                                <th>Inserted At</th>
                                                <th>Reordering Level:</th>
                                                <th>Do you want to remove Stock?:</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>{
                                            this.state.items.map(item =>
                                                <tr>
                                                    <td>{item._id}</td>
                                                    <td>{item.item}</td>
                                                    <td>{item.qty}<ProgressBar striped bsStyle="infor" now={item.qty} label={`${item.qty}`} /></td>
                                                    <td>{item.soldqty}<ProgressBar striped bsStyle="success" now={item.soldqty} label={`${item.soldqty}`} /></td>
                                                    <td>{item.insertdate}</td>
                                                    <td><ProgressBar striped bsStyle="danger" now={20} label={`${20}`} /></td>
                                                    <td><OverlayTrigger
                                                        trigger={['hover', 'focus']}
                                                        placement="bottom"
                                                        overlay={popoverHoverFocus}
                                                    >
                                                        <button className="btn btn-danger" onClick={this.removeitem.bind(this, item._id)}>Remove</button>
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
                </div>
            );
        }
    }
}
export default Storedata;