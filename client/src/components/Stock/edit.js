import React, { Component } from 'react';
import { CirclePicker } from 'react-color';
import { Image, Panel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../stores/stores.css';

class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            Brand: '',
            type: '',
            warrenty:'',
            msg: '',
            showsuc: false,
            showerr: false,
            show: true,
            addError: '',
            background: '',
            serialnumber:''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeComplete = this.handleChangeComplete.bind(this);
    }
    handleChangeComplete = (color, event) => {
        this.setState({ background: color.hex });
    }
    nav() {
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
                            <a className="navbar-brand" href="/home"><Image src="../../assets/1.jpg" className="Imagedetails" /></a>
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
        )
    }
    componentDidMount() {
        var authToken = localStorage.token;
        fetch("http://localhost:4000/stores/editstockitem/" + this.props.match.params.id, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer' + authToken
            },
        }).then(function (response) {
            return response.json();
        }).then(data => {
            this.setState({
                Brand:data.brand,
                background:data.color,
                type: data.item,
                warrenty:data.warrenty,
                serialnumber:data.serialnumber
            });
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
            if (details.success) {
                this.setState({
                    items: details.data,
                    show: true
                })
            }
        });
    }
    handleChange(e) {
        let target = e.target;
        let value = target.type === 'checkbox' ? target.checked : target.value
        let name = target.name;
        this.setState({
            [name]: value,
            msg: '',
            showsuc: false,
            showerr: false,
        });
    }
    handleSubmit(e) {
        var authToken = localStorage.token;
        e.preventDefault();
        const stores = {
            brand: this.state.Brand,
            color: this.state.background,
            warrenty:this.state.warrenty,
            item: this.state.type,
            serialnumber:this.state.serialnumber
        }
        fetch("http://localhost:4000/stores/updateitem/" + this.props.match.params.id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer' + authToken
            },
            body: JSON.stringify(stores)
        }).then(res => res.json())
            .then(json => {
                if (json.success) {
                    this.setState({
                        showsuc: true,
                        msg: json.msg
                    })
                    this.resetForm();
                } else {
                    this.setState({
                        showerr: true,
                        msg: json.msg
                    })
                }
            })
    }

    resetForm = () => {
        this.setState({
            Brand: '',
            Color: '',
            type: '',
            Price: '',
            warrenty:'',
            serialnumber:'',
        })
    }
    formfield() {
        return (
            <div>
                <div  className="idform">
                    <form onSubmit={this.handleSubmit} name="inventry">
                         <div className="form-group col-md-8">
                                <label htmlFor="exampleFormControlInput1">Serial Number :</label>
                                <input type="number" className="form-control" id="exampleFormControlInput1" name="serialnumber" placeholder="enter the serial number" value={this.state.serialnumber} onChange={this.handleChange} required />
                         </div>
                        <div className="form-group col-md-8">
                            <label htmlFor="exampleFormControlInput1">Item :</label>
                            <select className="form-control" id="Select1" name="type" value={this.state.type} onChange={this.handleChange}>
                                <option value="1">select type</option>
                                {
                                    this.state.items.map(item =>
                                        <option value={item.name}>{item.name}</option>
                                    )
                                }
                            </select>
                        </div>
                        <div className="form-group col-md-8">
                            <label htmlFor="exampleFormControlInput1">Pick device color :</label>
                            <CirclePicker onChangeComplete={this.handleChangeComplete} />
                        </div>
                        <div className="form-group col-md-8">
                            <label htmlFor="exampleFormControlInput1">Brand :</label>
                            <input type="text" className="form-control" id="exampleFormControlInput1" name="Brand" placeholder="Brand" value={this.state.Brand} onChange={this.handleChange} required />
                        </div>
                        <div className="form-group col-md-8">
                                <label htmlFor="exampleFormControlInput1">warrenty period :</label>
                                <input type="number" className="form-control" id="exampleFormControlInput1" name="warrenty" placeholder="warrenty period" value={this.state.warrenty} onChange={this.handleChange} required />
                        </div>
                        <br /><br />
                        <div className="form-group col-md-8">
                            <input type="submit" name="update" value="Submit" className="btn btn-info" />
                        </div>
                    </form>
                </div>
            </div>
        )
    }
    render() {
        if (localStorage.token) {
            return (
                <div>
                    <div className="head">
                        {this.nav()}
                    </div>
                    <div className="container-fluid">
                        <h2 className="title">Update Item Details</h2>
                            <div className="col-md-2 sidenav ">
                            <div className="list-group ">
                            <a className="list-group-item active">Quick Links</a>
                            <a className="list-group-item"><Link to={"/stockview"}>E-stock</Link></a>
                        </div></div>
                            <div className="col-md-8 contain">
                                <hr />
                                {
                                    this.state.showerr ? (
                                        <div className="message">
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
                                        <div className="message">
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
                                <div>
                                    {this.formfield()}
                                </div>
                            </div>
                    </div>
                </div>
            );
        }
    }
}

export default Edit;