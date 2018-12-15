import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Nav from '../front/nav';
import './onlinestore.css';
import { Image, OverlayTrigger, Popover , Panel } from 'react-bootstrap';
import Searchitems from './searchitems';


class Onlinestore extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            items: [],
            storeitems:[],
            showitems:true,
            msg:'',
            showerr:false,
            activePage: 1,
            total: 0,
            value: 1,
            path: '',
            msg: '',
            show:true,
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
            if(data.success){
                this.setState({
                    storeitems: data.data,
                })
            }else{
                this.setState({
                    showitems:false,
                    showerr:true,
                    msg:data.msg
                })
            }
            
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
            console.log(details)
            if (details.success) {
                this.setState({
                    items: details.data
                })
            } 
        });
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
                //alert(this.state.msg)
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
                                {
                                    this.state.show ? (
                                        this.state.items.map(item=>
                                            <a className="list-group-item"><Link to={"/show/" +item.name}>{item.name}</Link></a>
                                        )
                                    ):(
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
                        <div class="col-sm-8">
                            <Searchitems />
                            {   
                                this.state.showitems ?(
                                    this.state.storeitems.map(item =>
                                        <div className="row">
                                            <div className="card-show">
                                                <Image src={"../../stores/"+item.imagepath} className="storeimage" rounded />
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
                                    <div className="msg">
                                    <Panel bsStyle="danger" className="text-center">
                                        <Panel.Heading>
                                            <Panel.Title componentClass="h3">{this.state.msg}</Panel.Title>
                                        </Panel.Heading>
                                    </Panel>
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
