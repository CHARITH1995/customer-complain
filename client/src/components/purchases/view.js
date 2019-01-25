import React, { Component } from 'react';
import { Image, OverlayTrigger, Popover, Panel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../stores/viewitem.css';

class Purchview extends Component {
    constructor(props) {
        super(props)
        this.state = {
            item: [],
            text: '',
            newstatus: '',
            showsuc: false,
            showerr: false,
        };
    this.handleChange = this.handleChange.bind(this);
    this.deliver = this.deliver.bind(this);
}
handleChange(e) {
    let target = e.target;
    let value = target.type === 'checkbox' ? target.checked : target.value
    let name = target.name;
    this.setState({
        [name]: value,
        showsuc: false,
        showerr: false
    });
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

    componentDidMount() {
        var authToken = localStorage.token;
        this.setState({
            showsuc: false,
            showerr: false
        })
        fetch("http://localhost:4000/purch/getpurch/" + this.props.match.params.id, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer' + authToken
            },
        }).then(function (response) {
            return response.json();
        }).then(data => {
            this.setState({
                item: data
            });
        });
    }
    deliver(e) {
        var authToken = localStorage.token;
        e.preventDefault();
        const stocks = {
            is_delivered: this.state.newstatus,
            text: this.state.text,
            deliverd_date: Date.now()
        }
        if ((this.state.newstatus === 'yes')) {
            fetch("http://localhost:4000/stock/deliver/" + this.props.match.params.id, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer' + authToken
                },
                body: JSON.stringify(stocks)
            }).then(res => res.json())
                .then(json => {
                    if (json.success) {
                        this.setState({
                            showsuc: true,
                            msg: json.msg
                        })
                        window.location.reload();
                    } else {
                        this.setState({
                            showerr: true,
                            msg: json.msg
                        })
                    }
                })
        } else {
            this.setState({
                showerr: true,
                msg: 'invalid update !'
            })
        }
    }
    render() {
        const popoverHoverFocus = (
            <Popover id="popover-trigger-hover-focus" title="Update button">
                <strong>is it delivered</strong>
            </Popover>
        );
        if (localStorage.token) {
            return (
                <div>
                    <div className="head">
                        {this.navbar()}
                    </div>
                    <div className="container-fluid">
                        <h2 className="title">Purchase Details</h2>
                        <div className="contains row content">
                            <div className="col-sm-8 ">
                                <div className="row">
                                    <div className="col-sm-2" >
                                    </div>
                                    <div className="col-sm-8">
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
                                        <div className="viewcard-body">
                                            <div >
                                                <ul className="list-group list-group-flush">
                                                    <li className="list-group-item">Purchase date :   <span className="names"> {this.state.item.date} </span> </li>
                                                    <li className="list-group-item">Purchase Id :   <span className="names"> {this.state.item._id} </span> </li>
                                                    <li className="list-group-item">Item :   <span className="names"> {this.state.item.item} </span> </li>
                                                    <li className="list-group-item">Purchased Quantity :    <span className="names">{this.state.item.updateqty + this.state.item.purchqty}</span></li>
                                                    <li className="list-group-item">Email :    <span className="names"> {this.state.item.email} </span></li>
                                                    <li className="list-group-item">Name :    <span className="names"> {this.state.item.name}  </span></li>
                                                    {
                                                        ((this.state.item.purchqty===0)&&(this.state.item.is_delivered === 'no')) ? (
                                                            <li className="list-group-item">
                                                                <form onSubmit={this.deliver} name="inventry">
                                                                    <div className="form-group col-md-8">
                                                                        <select className="form-control" id="Select1" name="newstatus" value={this.state.newstatus} onChange={this.handleChange} required>
                                                                            <option value="1">{this.state.item.is_delivered}</option>
                                                                            <option value="yes">yes</option>
                                                                        </select>
                                                                    </div>
                                                                    <div className="form-group col-md-8">
                                                                        <textarea class="form-control" aria-label="With textarea" className="form-control" id="exampleFormControlInput1" name="text" placeholder="special note here" value={this.state.text} onChange={this.handleChange} required></textarea>
                                                                    </div>
                                                                    <div className="upbtns">
                                                                        <OverlayTrigger
                                                                            trigger={['hover', 'focus']}
                                                                            placement="bottom"
                                                                            overlay={popoverHoverFocus}
                                                                        >
                                                                            <input type="submit" name="submit" value="update" className="btn btn-info" />
                                                                        </OverlayTrigger>
                                                                    </div>
                                                                </form>
                                                            </li>
                                                        ) : (
                                                                <div>
                                                                </div>
                                                            )
                                                    }
                                                     {
                                                        ((this.state.item.text != null)) ? (
                                                            <li className="list-group-item">Note : <span className="names"> {this.state.item.text}  </span></li>
                                                        ) : (
                                                                <div>
                                                                </div>
                                                            )
                                                    }
                                                    <div className="viewbuttongroup">
                                                        <a href="/purchaseview" className="glyphicon glyphicon-circle-arrow-left">Purchases</a>
                                                        <br />
                                                        <a href="/stockview" className="glyphicon glyphicon-circle-arrow-left">Stock</a>
                                                    </div>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
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
export default Purchview;