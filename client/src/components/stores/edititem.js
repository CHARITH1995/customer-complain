import React, { Component } from 'react';
import { CirclePicker } from 'react-color';
import { Image } from 'react-bootstrap';
import './stores.css';

class Edititem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: [],
            imagename: '',
            path: "../../stores/",
            Serialnumber: '',
            Brand: '',
            Item: '',
            Price: '',
            Description: '',
            image: '',
            successmsg: '',
            showalert: false,
            showsuccess: false,
            addError: '',
            file: null,
            background: ''
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
            imagename: name.name
        })
        console.log(name.name)

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
                                <li><a href="#" onClick={this.logout}>LOGOUT</a></li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
    componentDidMount() {
        var authToken = localStorage.token;
        fetch("http://localhost:4000/stores/edititemdetails/" + this.props.match.params.id, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer' + authToken
            },
        }).then(function (response) {
            return response.json();
        }).then(data => {
            this.setState({
                Serialnumber: data.serialnumber,
                Brand: data.brand,
                background: data.color,
                Item: data.item,
                Price: data.price,
                Description: data.description,
                image: data.imagepath
            });
            // console.log(this.state.Description)
        });

        //console.log(this.state.Description)
    }
    handleChange(e) {
        let target = e.target;
        let value = target.type === 'checkbox' ? target.checked : target.value
        let name = target.name;
        this.setState({
            [name]: value,
            showalert:false,
            showsuccess:false
        });
    }
    handleSubmit(e) {
        var authToken = localStorage.token;
        e.preventDefault();
        if (this.state.file !== null) {
            this.state.image = this.state.path + this.state.imagename
            const fd = new FormData();
            fd.append('file', this.state.file);
            fetch("http://localhost:4000/stores/newitem", {
                method: "POST",
                headers: {
                    'Authorization': 'Bearer' + authToken
                },
                body: fd
            });
        }
        const stores = {
            id: this.props.match.params.id,
            serialnumber: this.state.Serialnumber,
            brand: this.state.Brand,
            color: this.state.background,
            description: this.state.Description,
            Item: this.state.Item,
            price: this.state.Price,
            imagepath: this.state.image
        }
        fetch("http://localhost:4000/stores/edititem/" + this.props.match.params.id, {
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
                    console.log(json.msg)
                    this.setState({
                        showsuccess: true,
                        addError: json.msg
                    })
                    this.resetForm();
                } else {
                    //console.log(json.msg)
                    this.setState({
                        showalert: true,
                        addError: json.msg
                    })
                }
            })


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
            Serialnumber: '',
            Brand: '',
            Color: '',
            Item: '',
            Price: '',
            Image: '',
            Description: '',
        })
    }
    formfield() {
        return (
            <div>
                <div className="container">
                    <form onSubmit={this.handleSubmit} name="inventry">
                        <div className="form-group col-md-8">
                            <label htmlFor="exampleFormControlInput1"> Serial Number :</label>
                            <input type="number" className="form-control" id="exampleFormControlInput1" name="Serialnumber" placeholder=" Serial Number" value={this.state.Serialnumber} onChange={this.handleChange} required />
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
                            <select className="form-control" id="exampleFormControlSelect1" name="Item" value={this.state.Item} onChange={this.handleChange} required>
                                <option >--Select Item--</option>
                                <option value="voice">voice</option>
                                <option value="router">Router</option>
                                <option value="peo-tv">peo-tv</option>
                            </select>
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
                        <h3 className="title">NEW-ITEM</h3>
                        <div className="row content">
                            <div className="col-md-8">
                                <hr />
                                <div>
                                    {this.alert()}
                                </div>
                                <div class="container">
                                    {this.formfield()}
                                </div>
                                <div className="storesbutton ">
                                    <a href="/onlinestore" className="glyphicon glyphicon-circle-arrow-left">Store</a>
                                </div>
                                <hr />
                            </div>
                            <div className="col-md-2">
                                <div>
                                    <Image src={"../../stores/"+this.state.image} className="storeimage" />
                                    <label htmlFor="exampleFormControlInput1">Image :</label>
                                    <input type="file" className="form-control" id="exampleFormControlInput1" name="Image" onChange={this.fileChange} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default Edititem;