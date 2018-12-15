import React, { Component } from 'react';
import { CirclePicker } from 'react-color';
import { Panel } from 'react-bootstrap';
import Nav from '../front/nav';
import './stores.css';

class Stores extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            SerialNumber: '',
            imagename: '',
            Brand: '',
            Color: '',
            type: '',
            Price: '',
            show:true,
            Description: '',
            successmsg: '',
            showalert: false,
            showsuccess: false,
            addError: '',
            imagepath: [],
            file: null,
            background: '#fff'
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fileChange = this.fileChange.bind(this);
        this.handleChangeComplete = this.handleChangeComplete.bind(this);
    }
    handleChangeComplete = (color, event) => {
        this.setState({ background: color.hex });
    }
    fileChange = (e) => {
        const name = e.target.files[0];
        console.log(e.target.files[0]);
        this.setState({
            file: e.target.files[0],
            imagename: name.name,
            showalert: false,
            showsuccess: false
        })
        console.log(name.name)
    }
    handleChange(e) {
        let target = e.target;
        let value = target.type === 'checkbox' ? target.checked : target.value
        let name = target.name;
        this.setState({
            [name]: value,
            showalert: false,
            showsuccess: false
        });
    }
    handleSubmit(e) {
        var authToken = localStorage.token;
      
        const fd = new FormData();
        fd.append('file', this.state.file);
        this.state.image = this.state.path + this.state.imagename
        console.log(this.state.image);
        const stores = {
            serialnumber: this.state.SerialNumber,
            brand: this.state.Brand,
            color: this.state.background,
            description: this.state.Description,
            Item: this.state.type,
            price: this.state.Price,
            imagepath: this.state.image,
            enterby:this.state.adminname
        }
        console.log(stores)
        e.preventDefault();
        fetch("http://localhost:4000/stores/newitem", {
            method: "POST",
            headers: {
                'Authorization': 'Bearer' + authToken
            },
            body: fd
        });
        fetch("http://localhost:4000/stores/newdetails", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer' + authToken
            },
            body: JSON.stringify(stores)
        })
            .then(res => res.json())
            .then(json => {
                if (json.success) {
                    console.log(json.msg)
                    this.setState({
                        showsuccess: true,
                        addError: json.msg
                    })
                    this.resetForm();
                } else {
                    console.log(json.msg)
                    this.setState({
                        showalert: true,
                        addError: json.msg
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
            console.log(details)
            if (details.success) {
                this.setState({
                    items: details.data
                })
            } 
        });
    }
    alert() {
        if (this.state.showalert) {
            return (
                <div className="alert text-center bg-danger" role="alert">
                    <span>{this.state.addError}</span>
                </div>
            )
        }
        if (this.state.showsuccess) {
            return (
                <div className="success text-center bg-success" role="alert">
                    <span>{this.state.addError}</span>
                </div>
            )
        }
    }
    resetForm = () => {
        this.setState({
            ...this.state,
            SerialNumber: '',
            Brand: '',
            Color: '',
            type: '',
            Price: '',
            imagepath: '',
            Description: '',
        })
    }
    formfield() {
        return (
            <div>
                <div className="container">
                <div>
                    <form onSubmit={this.handleSubmit} name="inventry">
                        <div className="form-group col-md-8">
                            <label htmlFor="exampleFormControlInput1"> Serial Number :</label>
                            <input type="number" className="form-control" id="exampleFormControlInput1" name="SerialNumber" placeholder=" Serial Number" value={this.state.SerialNumber} onChange={this.handleChange} required />
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
                            <label htmlFor="exampleFormControlInput1">Item :</label>
                            <select className="form-control" id="Select1" name="type" value={this.state.type} onChange={this.handleChange}>
                            <option value="1">select type</option>
                                {
                                    this.state.show ? (
                                        this.state.items.map(item=>
                                            <option value={item.name}>{item.name}</option>
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
                            </select>
                        </div>
                        <div className="form-group col-md-8">
                            <label htmlFor="exampleFormControlInput1">Image :</label>
                            <input type="file" className="form-control" id="exampleFormControlInput1" name="Image" onChange={this.fileChange} />
                        </div>
                        <div className="form-group col-md-8">
                            <label htmlFor="exampleFormControlInput1">Price :</label>
                            <input type="number" className="form-control" id="exampleFormControlInput1" name="Price" placeholder="Price in Rupees" value={this.state.Price} onChange={this.handleChange} />
                        </div>
                        <div className="form-group col-md-8">
                            <label htmlFor="exampleFormControlInput1">Description :</label>
                            <div class="input-group-prepend">
                            </div>
                            <textarea class="form-control" aria-label="With textarea"className="form-control" id="exampleFormControlInput1" name="Description" placeholder="Description" value={this.state.Description} onChange={this.handleChange}></textarea>
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
                        <h3 className="title">NEW-ITEM</h3>
                        <div className="row content">
                        <div className="col-md-1">
                            </div>
                            <div className="col-md-8">
                                <hr />
                                <div>
                                    {this.alert()}
                                </div>
                                <div>
                                    {this.formfield()}
                                </div>
                                <div >
                                    <div className="storesbutton ">
                                        <a href="/onlinestore" className="glyphicon glyphicon-circle-arrow-left">Store</a>
                                    </div>
                                </div>
                                <hr />
                            </div>
                            
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default Stores;