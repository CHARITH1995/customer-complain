import React, { Component } from 'react';
import { Image, OverlayTrigger, Popover, Panel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import FileBase64 from 'react-file-base64';
import './viewitem.css';

class Viewitem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            item: [],
            imagename: '',
            file: null,
            showsuc: false,
            showerr: false,
            new:null
        };
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
    getFiles(files) {
        this.setState({new:files[0].base64})
    }

    imageupload(e) {
        var authToken = localStorage.token;
        if (this.state.new !== null) {
            const fd = new FormData();
            fd.append('imagepath',this.state.new);
            this.state.image = this.state.imagename
            e.preventDefault();
            fetch("http://localhost:4000/stores/imageupload/" + this.props.match.params.id, {
                method: "PUT",
                headers: {
                    'Authorization': 'Bearer' + authToken
                },
                body:fd
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
                        <h2 className="title">Item Details</h2>
                        <div className="contain row content">
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
                                    <div className="col-sm-2" >
                                        <div >
                                            <Image src={this.state.item.imagepath} className="storeimages" rounded />
                                            {((localStorage.admin == 'yes') || ((localStorage.id) === this.state.item.authorizedby)) ? (
                                                <form onSubmit={this.imageupload} name="inventry">
                                                    <div className="form-group col-md-8">
                                                        <FileBase64
                                                            multiple={true}
                                                            onDone={this.getFiles.bind(this)} />
                                                    </div>
                                                    <div className="upbtn">
                                                        <input type="submit" name="submit" value="upload" className="btn btn-info" />
                                                    </div>
                                                </form>
                                            ) : (
                                                    <div></div>
                                                )}
                                        </div>
                                    </div>
                                    <div className="col-sm-8">
                                        <div className="viewcard-body">
                                            <div >
                                                <ul className="list-group list-group-flush">
                                                    <li className="list-group-item">Description :  <span className="names"> {this.state.item.description} </span></li>
                                                    <li className="list-group-item">Price:         <span className="names"> Rs :{this.state.item.price} /= </span> </li>
                                                    <li className="list-group-item">Insertdate :   <span className="names"> {this.state.item.insertdate} </span> </li>
                                                    <li className="list-group-item">Item Type :    <span className="names"> {this.state.item.item}       </span></li>
                                                    <li className="list-group-item">Inserted By :  <span className="names"> {this.state.item.authorizedby}</span></li>
                                                    <li className="list-group-item">Available Stock :<span className="names"> {this.state.item.authorizedby}</span></li>
                                                    <li className="list-group-item">Device color :<svg height="100" width="100" className="identifies">
                                                        <circle cx="50" cy="50" r="15" stroke-width="3" fill={this.state.item.color} />
                                                    </svg></li>
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