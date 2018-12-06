import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Nav from '../front/nav';
import './onlinestore.css';
import { Image, OverlayTrigger, Popover } from 'react-bootstrap';
import Searchitems from './searchitems';


class Onlinestore extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            items: [],
            activePage: 1,
            total: 0,
            value: 1,
            path: '',
            msg: '',
            showPopup: false
        };
    }
    handlePageChange(pageNumber) {
        this.setState({ activePage: pageNumber });
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
            this.setState({
                items: data,
            })
        })
        //console.log(this.state.items)
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
                        <Nav />
                    </div>
                    <div className="container-fluid">
                        <h3 className="title">Online Store Items Page</h3>
                        <div className="col-sm-2 sidenav ">
                            <div className="list-group ">
                                <a className="list-group-item active">Item Types</a>
                                <a className="list-group-item"><Link to={"/stores/" + "voice"}>Voice</Link></a>
                                <a className="list-group-item"><Link to={"/stores/" + "router"}>Routers</Link></a>
                                <a className="list-group-item"><Link to={"/stores/" + "peo-tv"}>Peo-tv</Link></a>
                            </div>
                        </div>
                        <div class="col-sm-8">
                            <Searchitems />
                            {this.state.items.map(item =>
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
                            }
                        </div>
                        <div className="col-sm-2 sidenav ">
                            <div className="list-group ">
                                <a className="list-group-item active">Quick LInks</a>
                                <a className="list-group-item"><Link to={"/reports"}>Monthly Reports</Link></a>
                                <a className="list-group-item"><Link to={"/addstores"}>Add Item</Link></a>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default Onlinestore;
