import React, { Component } from 'react';
import { Image, OverlayTrigger, Popover, Panel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../stores/viewitem.css';

class View extends Component {
    constructor(props) {
        super(props)
        this.state = {
            item: [],
            newstatus: '',
            showsuc: false,
            purchshow:false,
            purchmsg:'',
            purchdata:[],
            showerr: false,
            purchid: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.sold = this.sold.bind(this);
    }
    handleChange(e) {
        let target = e.target;
        let value = target.type === 'checkbox' ? target.checked : target.value
        let name = target.name;
        this.setState({
            [name]: value,
        });
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
                                <li className="custname"><a href="#">{sessionStorage.getItem('fname')}</a></li>
                                <li><a href="#" onClick={this.logout}>LOGOUT</a></li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>

        );
    }
    sold(e) {
        var authToken = localStorage.token;
        e.preventDefault();
        const stocks = {
            status: this.state.newstatus,
            purchid: this.state.purchid,
            item: this.state.item.item,
            solddate: Date.now()
        }
        if ((this.state.newstatus === 'sold') && (this.state.purchid != '')) {
            fetch("http://localhost:4000/stock/sold/" + this.props.match.params.id, {
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
    componentDidMount() {
        var authToken = localStorage.token;
        this.setState({
            showsuc: false,
            showerr: false
        })
        fetch("http://localhost:4000/stores/getitem/"+this.props.match.params.id, {
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
            if(data.purchid === null){
                fetch("http://localhost:4000/purch/getpurchase/"+data.item, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': 'Bearer' + authToken
                    },
                }).then(function (response) {
                    return response.json();
                }).then(doc => {
                    if(doc.success){             
                    this.setState({
                        purchdata:doc.data,
                        purchid:doc.data._id
                    });
                    }else{
                        this.setState({
                            purchshow:true,
                            purchmsg:doc.msg
                        })
                    }
                });
            }else{
                fetch("http://localhost:4000/purch/getpurch/" + data.purchid, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': 'Bearer' + authToken
                    },
                }).then(function (response) {
                    return response.json();
                }).then(data => {
                    this.setState({
                        purchdata:data
                    });
                }); 
            }
        });
        
    }
    render() {
        const popoverHoverFocus = (
            <Popover id="popover-trigger-hover-focus" title="Update button">
                <strong>You can update item here!</strong>
            </Popover>
        );
        const popoverHover = (
            <Popover id="popover-trigger-hover-focus" title="sold">
                <strong>Are you sure?</strong>
            </Popover>
        );
        if (localStorage.token) {
            return (
                <div>
                    <div className="head">
                        {this.navbar()}
                    </div>
                    <div className="container-fluid">
                        <h2 className="title">Item Details</h2>
                        <div className="contains row content">
                            <div className="col-sm-8 ">
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
                                <div className="row">
                                        {
                                    this.state.purchshow ? (
                                        <div className= "col-sm-4" > 
                                            <Panel bsStyle="success" className="text-center">
                                                <Panel.Heading>
                                                    <Panel.Title componentClass="h3">{this.state.purchmsg}</Panel.Title>
                                                </Panel.Heading>
                                            </Panel>
                                        </div>
                                    ) : (
                                            <div className= "col-sm-4" >          
                                                 <a className="list-group-item active">Suggest Purchase</a>
                                                 <li className="list-group-item d-flex justify-content-between align-items-center">
                                                Name : <span className="badge badge-primary badge-pill">{this.state.purchdata.name}</span>
                                                <br />
                                                P id :<span className="badge badge-primary badge-pill">{this.state.purchdata._id}</span>
                                                <br />
                                                Item : <span className="badge badge-primary badge-pill">{this.state.purchdata.item}</span>
                                                <br />
                                                Purchase quantity : <span className="badge badge-primary badge-pill">{this.state.purchdata.purchqty + this.state.purchdata.updateqty}</span>
                                                <br /> 
                                            </li>
                                            </div>
                                        )
                                }
                                    <div className="col-sm-8">
                                        <div className="viewcard-body">
                                            <div >
                                                <ul className="list-group list-group-flush">
                                                    <li className="list-group-item">Insertdate :   <span className="names"> {this.state.item.inserteddate} </span> </li>
                                                    <li className="list-group-item">Item :   <span className="names"> {this.state.item.item} </span> </li>
                                                    <li className="list-group-item">Serial Number :    <span className="names"> {this.state.item.serialnumber}       </span></li>
                                                    <li className="list-group-item">Inserted By :  <span className="names"> {this.state.item.authorizedby}</span></li>
                                                    <li className="list-group-item">Device color :<svg height="100" width="100" className="identifies">
                                                        <circle cx="50" cy="50" r="15" stroke-width="3" fill={this.state.item.color} />
                                                    </svg></li>
                                                    {
                                                        this.state.item.status === 'unsold' ? (
                                                            <li className="list-group-item">
                                                                <form onSubmit={this.sold} name="inventry">
                                                                    <div className="form-group col-md-8">
                                                                        <select className="form-control" id="Select1" name="newstatus" value={this.state.newstatus} onChange={this.handleChange} required>
                                                                            <option value="1">{this.state.item.status}</option>
                                                                            <option value="sold">sold</option>
                                                                        </select>
                                                                    </div>
                                                                    <div className="form-group col-md-8">
                                                                        <input type="text" className="form-control" id="exampleFormControlInput1" name="purchid" placeholder="enter the purchase id" value={this.state.purchid} onChange={this.handleChange} required />
                                                                    </div>
                                                                    <div className="upbtns">
                                                                        <OverlayTrigger
                                                                            trigger={['hover', 'focus']}
                                                                            placement="bottom"
                                                                            overlay={popoverHover}
                                                                        >
                                                                            <input type="submit" name="submit" value="update" className="btn btn-info" />
                                                                        </OverlayTrigger>
                                                                    </div>
                                                                </form>
                                                            </li>
                                                        ) : (
                                                                <div>
                                                                    <li className="list-group-item">Status :  <span className="names"> sold </span> </li>
                                                                    <li className="list-group-item">Purchase Id : <span className="names"> {this.state.item.purchid} </span></li>
                                                                </div>
                                                            )
                                                    }
                                                    <div className="viewbuttongroups">
                                                        <div className="viewbutton">
                                                            <a href="/stockview" className="glyphicon glyphicon-circle-arrow-left">Stock</a>
                                                        </div>
                                                        <div className="viewbutton">
                                                            {
                                                                (((localStorage.admin == 'yes') || ((localStorage.id) === this.state.item.authorizedby)) && (this.state.item.status == 'unsold')) ? (
                                                                    <OverlayTrigger
                                                                        trigger={['hover', 'focus']}
                                                                        placement="bottom"
                                                                        overlay={popoverHoverFocus}
                                                                    >
                                                                        <Link to={"/editstockitem/" + this.state.item._id} className="btn btn-success">Update</Link>
                                                                    </OverlayTrigger>
                                                                ) : (
                                                                        <div></div>
                                                                    )}
                                                        </div>
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
export default View;