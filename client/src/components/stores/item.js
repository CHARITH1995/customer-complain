import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Image, OverlayTrigger, Popover ,Panel , ProgressBar } from 'react-bootstrap';
import Searchitems from './searchitems';


class Viewbyitems extends Component {
    constructor(props) {
        super(props)
        this.state = {
            storeitems: [],
            searchfield: '',
            items: [],
            msg: '',
            show: true
        };
        this.onSearch =this.onSearch.bind(this)
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
                        storeitems:data.data,
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
    searching(searchfield){
        return function(x){
            var search=[]
            search = x.description.toLowerCase().includes(searchfield.toLowerCase())||x.item.toLowerCase().includes(searchfield.toLowerCase())||!searchfield;
            console.log(search)
            if(search.length === 0){
                this.setState({
                    isempty:true
                })
            }else{
                return search
            }
        }
    }
    onSearch(e){
        this.setState({
            searchfield:e.target.value
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
                        <h2 className="title">Online Store Items Page</h2>
                        <div className="col-sm-2 sidenav ">
                            <div className="list-group ">
                            <div className="list-group ">
                                <a className="list-group-item active">QUICK LINKS</a>
                                <a className="list-group-item"><Link to={"/onlinestore"}>Back to Store</Link></a>
                            </div>
                            </div>
                        </div>
                        <div class="col-sm-8">
                        <div className="searchbar">
                                <h2>Filterable List</h2>
                                <input className="form-control" id="myInput" type="text" placeholder="Search.." name="searchfield" value={this.state.searchfield} onChange={this.onSearch} required />
                            </div>
                            {   this.state.show ?( this.state.storeitems.filter(this.searching(this.state.searchfield)).map(item =>
                                <div className=" contain rows">
                                    <div className="card-show">
                                        <Image src={item.imagepath} className="storeimage" rounded />
                                        <ul className="list-group list-group-flush">
                                        <li className="list-group-item">Description :{item.description}</li>
                                            <li key={item.id} className="list-group-item">Status :{item.status}</li>
                                            <li className="list-group-item">Price: Rs: {item.price}</li>
                                            <li className="list-group-item">Available Stock: <ProgressBar striped bsStyle="success" now={item.qty} label={`${item.qty}`} /></li>
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
