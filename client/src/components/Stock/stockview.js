import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Nav from '../front/nav';
import '../stores/onlinestore.css';
import { OverlayTrigger, Popover, Panel} from 'react-bootstrap';



class Stockview extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            items: [],
            isempty: false,
            storeitems: [],
            showitems: true,
            msg: '',
            showerr: false,
            activePage: 1,
            total: 0,
            value: 1,
            path: '',
            show: true,
            showdel:false,
            showPopup: false,
            searchfield: '',
            results: [],
            isempty: false
        };
        this.onSearch = this.onSearch.bind(this);
    }
    searching(searchfield) {
        return function (x) {
            var search = []
            search = x.serialnumber.includes(searchfield.toLowerCase()) || !searchfield;
            if (search.length === 0) {
                this.setState({
                    isempty: true
                })
            } else {
                return search
            }
        }
    }
    onSearch(e) {
        this.setState({
            searchfield: e.target.value
        })
    }
    handlePageChange(pageNumber) {
        this.setState({ activePage: pageNumber });
    }
    componentDidMount() {
        var authToken = localStorage.token;
        this.setState({
            showdel:false
        })
        fetch("http://localhost:4000/stock/estock", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer' + authToken
            },
        }).then(function (response) {
            return response.json();
        }).then(details => {
            console.log(details.data)
            if (details.success) {
                this.setState({
                    storeitems:details.data,
                }) 
            } else {
                this.setState({
                    showitems: false,
                    showerr: true,
                    msg: details.msg
                })
            }
        });
        console.log(this.state.storeitems)
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
    onChange = e => {
        this.setState({
            searchfield: e.target.value
        })
    }
    removeitem(id) {
        console.log(id)
        var authToken = localStorage.token;
        fetch("http://localhost:4000/stock/removestock/"+id, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer' + authToken
            },
        }).then(function (response) {
            return response.json();
        }).then(data =>{
            if (data.success) {
                this.setState({
                    showdel:true,
                    msg: data.msg,
                })
                window.location.reload();
            } else {
                this.setState({
                    showdel:true,
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
                        <h2 className="title">E-Shop </h2>
                        <div className="col-sm-2 sidenav ">
                            <div className="list-group ">
                                <a className="list-group-item active">Item Types</a>
                                {
                                    this.state.show ? (
                                        this.state.items.map(item =>
                                            <a className="list-group-item"><Link to={"/show/" + item.name}>{item.name}</Link></a>
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
                            </div>
                        </div>
                        <div className="col-sm-8">
                            <div className="searchbar">
                                <h2>Filterable List</h2>
                                <input className="form-control" id="myInput" type="text" placeholder="Search from serial number" name="searchfield" value={this.state.searchfield} onChange={this.onSearch} required />
                            </div>
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
                                this.state.showitems ? (
                                    this.state.storeitems.map(item =>
                                        <div className="contain rows">
                                            <div className="card-show">
                                                <ul className="list-group list-group-flush">
                                                    <li className="list-group-item">Brand : <span className="names">{item.brand}</span></li>
                                                    <li key={item.id} className="list-group-item">Warrenty Period : <span className="names">{item.warrenty} years </span></li>
                                                    <li className="list-group-item">Device color :<svg height="100" width="100"className="identify">
                                                        <circle cx="50" cy="50" r="15"  stroke-width="3" fill={item.color} />
                                                    </svg></li>
                                                    <li className="list-group-item">
                                                        <div className="storesbutton">
                                                            <Link to={"/view/" + item._id} className="btn btn-info">View</Link>
                                                            {(localStorage.admin == 'yes') || ((localStorage.id) === item.authorizedby) ? (
                                                                <OverlayTrigger
                                                                    trigger={['hover', 'focus']}
                                                                    placement="bottom"
                                                                    overlay={popoverHoverFocus}
                                                                >
                                                                    <button className="btn btn-danger" onClick={this.removeitem.bind(this, item._id)}>Remove</button>
                                                                </OverlayTrigger>
                                                            ) : (
                                                                    <div></div>
                                                                )}
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    )
                                ) : (
                                        <div className="msg">
                                            <Panel bsStyle="danger" className="text-center">
                                                <Panel.Heading>
                                                    <Panel.Title componentClass="h3">{this.state.msg}</Panel.Title>
                                                </Panel.Heading>
                                            </Panel>
                                        </div>
                                    )

                            }
                            {
                                this.state.isempty ? (<div className="msg">
                                    <Panel bsStyle="danger" className="text-center">
                                        <Panel.Heading>
                                            <Panel.Title componentClass="h3">No Result Found</Panel.Title>
                                        </Panel.Heading>
                                    </Panel>
                                </div>) :
                                    (
                                        <div></div>
                                    )
                            }
                        </div>
                        <div className="col-sm-2 sidenav ">
                            <div className="list-group ">
                                <a className="list-group-item active">Quick LInks</a>
                                <a className="list-group-item"><Link to={"/stock"}>Add E-Stock</Link></a>
                                <a className="list-group-item"><Link to={"/addstores"}>Add E-shop</Link></a>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default Stockview;
