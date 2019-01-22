import React, { Component } from 'react';
import { CirclePicker } from 'react-color';
import { Panel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Nav from '../front/nav';
import '../stores/stores.css';

class Stock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            Brand: '',
            Color: '',
            type: '',
            warrenty:'',
            authorize_by: '',
            show: true,
            imagepath: [],
            showsuc: false,
            msg: '',
            showerr: false,
            serialnumber:'',
            background: '#fff'
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeComplete = this.handleChangeComplete.bind(this);
    }
    handleChangeComplete = (color, event) => {
        this.setState({ background: color.hex });
    }

    handleChange(e) {
        let target = e.target;
        let value = target.type === 'checkbox' ? target.checked : target.value
        let name = target.name;
        this.setState({
            [name]: value,
            showsuc: false,
            msg: '',
            showerr: false,
        });
    }
    handleSubmit(e) {
        var authToken = localStorage.token;
        const stock = {
            serialnumber:this.state.serialnumber,
            brand: this.state.Brand,
            color: this.state.background,
            item: this.state.type,
            warrenty:this.state.warrenty,
            price: this.state.Price,
            authorize_by:localStorage.id,
        }
        e.preventDefault();
        fetch("http://localhost:4000/stock/newstock", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer' + authToken
            },
            body: JSON.stringify(stock)
        })
            .then(res => res.json())
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
    componentDidMount() {
        var authToken = localStorage.token;
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

    resetForm = () => {
        this.setState({
            ...this.state,
            Brand: '',
            serialnumber:'',
            Color: '',
            type: '',
            warrenty:'',
            Price: '',
            imagepath: '',
            Description: '',
        })
    }
    formfield() {
        return (
            <div>
                <div className="idform">
                    <div>
                        <form onSubmit={this.handleSubmit} name="inventry">
                        <div className="form-group col-md-8">
                                <label htmlFor="exampleFormControlInput1">Serial Number :</label>
                                <input type="number" className="form-control" id="exampleFormControlInput1" name="serialnumber" placeholder="enter the serial number" value={this.state.serialnumber} onChange={this.handleChange} required />
                            </div>
                            <div className="form-group col-md-8">
                                <label htmlFor="exampleFormControlInput1">Item :</label>
                                <select className="form-control" id="Select1" name="type" value={this.state.type} onChange={this.handleChange} required>
                                    <option value="1">select type</option>
                                    {
                                        this.state.show ? (
                                            this.state.items.map(item =>
                                                <option value={item.name}>{item.name}</option>
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
                                <input type="number" className="form-control" id="exampleFormControlInput1" name="warrenty" placeholder="available stock" value={this.state.warrenty} onChange={this.handleChange} required />
                            </div>
                            <br /><br />
                            <div className="form-group col-md-8">
                                <input type="submit" name="submit" value="Submit" className="btn btn-info" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
    render() {
        if (localStorage.token) {
            return (
                <div>
                    <div className="head">
                        <Nav />
                    </div>
                    <div className="container-fluid">
                        <h2 className="title">E-Stock maintain</h2>
                        <div className="col-sm-2 sidebar">
                        <div className="list-group ">
                            <a className="list-group-item active">Quick Links</a>
                            <a className="list-group-item"><Link to={"/stockview"}>E-stock</Link></a>
                        </div>
                    </div>
                            <div className="col-md-8 contain">
                                <hr />
                                <div className="adminmsg">
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

                                </div>
                                <div>
                                    {this.formfield()}
                                </div>
                                <div >
                                </div>
                            </div>
                    </div>
                </div>
            );
        }
    }
}

export default Stock;