import React, { Component } from 'react';
import { Image, OverlayTrigger, Popover, Panel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './viewitem.css';

class Viewitem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            item: [],
            imagename: '',
            file: null,
            showsuc: false,
            showerr: false
        };
        this.fileChange = this.fileChange.bind(this);
        this.imageupload = this.imageupload.bind(this);
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
    fileChange = (e) => {
        const name = e.target.files[0];
        this.setState({
            file: e.target.files[0],
            imagename: name.name,
            showerr: false,
            showsuc: false
        })
    }
    imageupload(e) {
        console.log(this.state.file)
        var authToken = localStorage.token;
        if (this.state.file !== null) {
            const fd = new FormData();
            fd.append('file', this.state.file);
            this.state.image = this.state.imagename
            const stores = {
                imagepath: this.state.imagename,
            }
            e.preventDefault();
            fetch("http://localhost:4000/stores/newitem", {
                method: "POST",
                headers: {
                    'Authorization': 'Bearer' + authToken
                },
                body: fd
            });
            fetch("http://localhost:4000/stores/imageupload/" + this.props.match.params.id, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer' + authToken
                },
                body: JSON.stringify(stores)
            }).then(res => res.json())
                .then(json => {
                    console.log(json)
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
                msg: 'cannot done'
            })
        }
    }
    componentDidMount() {
        var authToken = localStorage.token;
        this.setState({
            showsuc: false,
            showerr: false
        })
        fetch("http://localhost:4000/stores/getitemdetails/" + this.props.match.params.id, {
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
    render() {
        const popoverHoverFocus = (
            <Popover id="popover-trigger-hover-focus" title="Update button">
                <strong>You can update stock here!</strong>
            </Popover>
        );
        if (localStorage.token) {
            return (
                <div>
                    <div className="head">
                        {this.navbar()}
                    </div>
                    <div className="container-fluid">
                        <h2 className="title">ITEM DETAILS</h2>
                        <div className="contain row content">
                            <div className="col-sm-8 text-left">
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
                                    <div className="col-sm-2" >
                                        <div >
                                            <Image src={"../../stores/" + this.state.item.imagepath} className="storeimages" rounded />
                                            {((localStorage.admin == 'yes') || ((localStorage.id) === this.state.item.authorizedby)) ? (
                                                    <form onSubmit={this.imageupload} name="inventry">
                                                    <input type="file" name="Image" onChange={this.fileChange} />
                                                    <div className="upbtn">
                                                        <input type="submit" name="submit" value="upload" className="btn btn-info" />
                                                    </div>
                                                </form>
                                            ) : (
                                                    <div></div>
                                                )}
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="viewcard-body">
                                            <div >
                                                <ul>
                                                    <li><span className="attribute">Description : </span>{this.state.item.description}</li>
                                                    <li><span className="attribute">Price: </span>Rs :{this.state.item.price}</li>
                                                    <li><span className="attribute">Insertdate : </span>{this.state.item.insertdate}</li>
                                                    <li><span className="attribute">Item Type : </span>{this.state.item.item}</li>
                                                    <li><span className="attribute">Status : </span>{this.state.item.status}</li>
                                                    <li><span className="attribute">Inserted By : </span>{this.state.item.authorizedby}</li>
                                                    <li><span className="attribute">Available Stock : </span>{this.state.item.authorizedby}</li>
                                                    <div className="viewbuttongroup">
                                                        <div className="viewbutton">
                                                            <a href="/onlinestore" className="glyphicon glyphicon-circle-arrow-left">Stores</a>
                                                        </div>
                                                        <div className="viewbutton">
                                                            {((localStorage.admin == 'yes') || ((localStorage.id) === this.state.item.authorizedby)) ? (
                                                                <OverlayTrigger
                                                                    trigger={['hover', 'focus']}
                                                                    placement="bottom"
                                                                    overlay={popoverHoverFocus}
                                                                >
                                                                    <Link to={"/edititem/" + this.state.item._id} className="btn btn-success">Update</Link>
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
export default Viewitem;