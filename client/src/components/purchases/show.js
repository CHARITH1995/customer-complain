import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Nav from '../front/nav';
import '../stores/onlinestore.css';
import { OverlayTrigger, Popover, Panel ,Modal,Button } from 'react-bootstrap';

function searching(searchfield) {
    return function (x) {
        var search = []
        search = x._id.includes(searchfield) || x.item.toLowerCase().includes(searchfield.toLowerCase()) || !searchfield;
        if (search.length === 0) {
            this.setState({
                isempty: true
            })
        } else {
            return search
        }
    }
}

class Purchases extends Component {
    constructor(props) {
        super(props)
        this.state = {
            msg: '',
            searchfield: '',
            results: [],
            shownopurch: false,
            showdel: false,
            purch: [],
            purchmsg: '',
            id: '',
            view: false
        };
        this.handleClose = this.handleClose.bind(this);
        this.onSearch = this.onSearch.bind(this);
    }

    onSearch(e) {
        this.setState({
            searchfield: e.target.value
        })
    }
    handleClose() {
        this.setState({
            view: false,
        });
    }
    removepurch(id) {
        var authToken = localStorage.token;
        this.setState({
            view: false,
        });
        fetch("http://localhost:4000/purch/removepurch/" + id, {
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
                    showdel: true,
                    msg: data.msg,
                })
                window.location.reload();
            } else {
                this.setState({
                    showdel: true,
                    msg: data.msg
                })
            }
        })

    }
    componentDidMount() {
        var authToken = localStorage.token;
        fetch("http://localhost:4000/purch/show", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer' + authToken
            },
        }).then(function (response) {
            return response.json();
        }).then(data => {
            if (data.success) {
                this.setState({
                    purch: data.data
                })
            } else {
                this.setState({
                    shownopurch: true,
                    purchmsg: data.msg
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
                        <h2 className="title">Purchases views</h2>
                        <div className="col-sm-2 sidenav ">
                            <div className="list-group ">
                                <a className="list-group-item active">Quick LInks</a>
                                <a className="list-group-item"><Link to={"/stockview"}>E-Stock</Link></a>
                            </div>
                        </div>
                        <div className="col-sm-8">
                            <div className="searchbar">
                                <h2>Filterable List</h2>
                                <input className="form-control" id="myInput" type="text" placeholder="Search.." name="searchfield" value={this.state.searchfield} onChange={this.onSearch} />
                            </div>
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
                                                <Button variant="primary" className="btn btn-danger" onClick={this.removepurch.bind(this, this.state.id)}>Delete</Button>
                                            </Modal.Footer>
                                        </Modal.Dialog>;
                                             </div>
                                ) : (
                                        <div></div>
                                    )
                            }
                            {
                                this.state.showdel ? (
                                    <div className="message">
                                        <Panel bsStyle="success" className="text-center">
                                            <Panel.Heading>
                                                <Panel.Title componentClass="h3">{this.state.msg}</Panel.Title>
                                            </Panel.Heading>
                                        </Panel>
                                    </div>
                                ) : (
                                        <div className="message">

                                        </div>
                                    )
                            }
                            {
                                !this.state.shownopurch ? (
                                    this.state.purch.filter(searching(this.state.searchfield)).map(data =>
                                        <div className="contain rows">
                                            <div className="card-show">
                                                <ul className="list-group list-group-flush">
                                                    <li key={data._id} className="list-group-item">Purchase date : <span className="names"> {data.date} </span> </li>
                                                    <li className="list-group-item">Customer Name : <span className="names">{data.name}</span></li>
                                                    <li className="list-group-item">Purchase Id   : <span className="names">{data._id}</span></li>
                                                    <li className="list-group-item">Is Delivered : <span className="names">{data.is_delivered}</span></li>
                                                    {
                                                        data.text !== null ?(
                                                            <li className="list-group-item">note : <span className="names">{data.text}</span></li>
                                                        ):(
                                                            <div></div>
                                                        )
                                                    }
                                                    {
                                                        data.is_delivered === 'yes' ? (
                                                            <div>
                                                                <li className="list-group-item">Delivered Date :    <span className="names"> {data.deliverd_date}  </span></li>
                                                            </div>
                                                        ) : (
                                                                <div>
                                                                </div>
                                                            )
                                                    }
                                                    {
                                                        data.deliverd_by === null ? (
                                                            <div>

                                                            </div>
                                                        ) : (
                                                                <div>
                                                                    <li className="list-group-item">Delivered by : <span className="names"> {data.deliverd_by} </span></li>
                                                                </div>
                                                            )
                                                    }
                                                    <li className="list-group-item">
                                                        <div className="storesbutton">
                                                            <Link to={"/purchview/" + data._id} className="btn btn-info">View</Link>
                                                            {
                                                                data.is_delivered === "no" ? (
                                                                    <OverlayTrigger
                                                                        trigger={['hover', 'focus']}
                                                                        placement="bottom"
                                                                        overlay={popoverHoverFocus}
                                                                    >

                                                                        <button className="btn btn-danger" onClick={() => {
                                                                            this.setState({
                                                                                view: true,
                                                                                id: data._id
                                                                            })
                                                                        }}>Remove</button>
                                                                    </OverlayTrigger>
                                                                ) : (
                                                                        <div>
                                                                        </div>
                                                                    )
                                                            }
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    )
                                ) : (
                                        <div className="message">
                                            <Panel bsStyle="danger" className="text-center">
                                                <Panel.Heading>
                                                    <Panel.Title componentClass="h3">{this.state.purchmsg}</Panel.Title>
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

export default Purchases;
