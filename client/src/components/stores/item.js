import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Image, OverlayTrigger, Popover ,Panel } from 'react-bootstrap';
import Searchitems from './searchitems';


class Viewbyitems extends Component {
    constructor(props) {
        super(props)
        this.state = {
            items: [],
            msg: '',
            show: true
        };
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
    componentDidMount() {
        var authToken = localStorage.token;
        fetch("http://localhost:4000/stores/getitems/"+this.props.match.params.item, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer' + authToken
            },
        })
            .then(function (response) {
                return response.json();
            })
            .then(data => {
                console.log(data)
                if (data.success) {
                    this.setState({
                        items: data.data,
                    })
                } else {
                    this.setState({
                        msg: data.msg,
                        show: false
                    })
                }

            })

    }
    removeitem(serialnumber){
        var authToken = localStorage.token;
        //console.log(authToken)
        fetch("http://localhost:4000/stores/removeitem/" + serialnumber, {
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
                    msg:data.msg,
                })
                alert(this.state.msg)
                window.location.reload();
            } else {
                this.setState({
                    msg: data.msg
                })
            }
        })
    }
    render() {
        const popoverHoverFocus = (
            <Popover id="popover-trigger-hover-focus" title="Romove Button">
                <strong>Are you sure ???</strong> Press view button first
            </Popover>
        );
        if (localStorage.token) {
            return (
                <div>
                    <div className="head">
                       {this.navbar()}
                    </div>
                    <div className="container-fluid">
                        <h3 className="title">Online Store Items Page</h3>
                        <div className="col-sm-2 sidenav ">
                            <div className="list-group ">
                            <div className="list-group ">
                                <a className="list-group-item active">QUICK LINKS</a>
                                <a className="list-group-item"><Link to={"/onlinestore"}>Back to Store</Link></a>
                            </div>
                            </div>
                        </div>
                        <div class="col-sm-8">
                            <Searchitems />
                            {   this.state.show ?( this.state.items.map(item =>
                                <div className="row">
                                    <div className="card-show">
                                        <Image src={"../../stores/" + item.imagepath} className="storeimage" rounded />
                                        <ul className="list-group list-group-flush">
                                        <li className="list-group-item">Description :{item.description}</li>
                                            <li key={item.id} className="list-group-item">Status :{item.status}</li>
                                            <li className="list-group-item">Price: Rs {item.price}</li>
                                            <li className="list-group-item">Serial Number: {item.serialnumber}</li>
                                            <li className="list-group-item">
                                                <div className="storesbutton">
                                                    <Link to={"/viewitem/" + item._id} className="btn btn-info">View</Link>
                                                    <OverlayTrigger
                                                        trigger={['hover', 'focus']}
                                                        placement="bottom"
                                                        overlay={popoverHoverFocus}
                                                    >
                                                        <button className="btn btn-danger" onClick={this.removeitem.bind(this, item.serialnumber)}>Remove</button>
                                                    </OverlayTrigger>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            )
                            ):(
                                <div>
                                <Panel bsStyle="danger">
                                <Panel.Heading>
                                    <Panel.Title componentClass="h3">{this.state.msg}</Panel.Title>
                                </Panel.Heading>
                            </Panel>
                                </div>
                            )
                        }
                        </div>      
                    </div>
                </div>
            );
        }
    }
        }
            
            
            
            
            export default withRouter(Viewbyitems);
