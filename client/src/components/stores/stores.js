import React, { Component } from 'react';
import { SketchPicker} from 'react-color';
import { Panel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import FileBase64 from 'react-file-base64';
import Nav from '../front/nav';
import './stores.css';

class Stores extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            imagename: '',
            Brand: '',
            Color: '',
            type: '',
            warrenty: '',
            authorize_by: '',
            Price: '',
            show: true,
            Description: '',
            imagepath: [],
            showsuc: false,
            msg: '',
            qty: 1,
            showerr: false,
            file: null,
            background: '#fff',
            warrantyeerr:'',
            qtyerr:'',
            priceerr:'',
            new:null,
            stockitems:[]
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeComplete = this.handleChangeComplete.bind(this);
    }
    getFiles(files) {
        this.setState({new:files[0].base64})
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
            warrantyeerr:'',
            qtyerr:'',
            priceerr:'',
        });
    }
    handleSubmit(e) {
        e.preventDefault();
        this.setState({
            showsuc: false,
            msg: '',
            showerr: false,
        })
        var authToken = localStorage.token;
        const data = new FormData();
        data.append('imagepath',this.state.new);
        data.append('enterby',this.state.adminname);
        data.append('authorize_by',localStorage.id);
        data.append('qty',this.state.qty);
        data.append('price',this.state.Price);
        data.append('description',this.state.Description);
        data.append('color',this.state.background);
        data.append('Item',this.state.type);
        data.append('warrenty',this.state.warrenty);
        data.append('brand',this.state.Brand);
        if(this.handleValidation()){
            fetch("http://localhost:4000/stores/newdetails", {
            method: "POST",
            headers: {
                'Authorization': 'Bearer' + authToken
            },
            body:data
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
            //console.log(details)
            if (details.success) {
                this.setState({
                    items: details.data
                })
            }
        });
        fetch("http://localhost:4000/stock/items", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer' + authToken
            },
        }).then(function (response) {
            return response.json();
        }).then(details => {
            this.setState({
                stockitems: details
            })
        });
    }
    handleValidation() {
        let formvalid =true
        if(this.state.warrenty<0){
            this.setState({
                warrantyeerr: 'warrenty period invalid!',
            })
            formvalid = false
        }
        if(this.state.qty<0){
            this.setState({
               qtyerr: 'quantity invalid!',
            })
            formvalid = false
        }
        if(this.state.Price<0){
            this.setState({
               priceerr: 'price invalid!',
            })
            formvalid = false
        }
        return formvalid
    }
    resetForm = () => {
        this.setState({
            ...this.state,
            Brand: '',
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
                                <SketchPicker
                                 color={ this.state.background }
                                 onChangeComplete={ this.handleChangeComplete }
                         />
                            </div>
                            <div className="form-group col-md-8">
                                <label htmlFor="exampleFormControlInput1">Brand :</label>
                                <input type="text" className="form-control" id="exampleFormControlInput1" name="Brand" placeholder="Brand" value={this.state.Brand} onChange={this.handleChange} required />
                            </div>
                            <div className="form-group col-md-8">
                                <label htmlFor="exampleFormControlInput1">Available Stock :</label>
                                <input type="number" className="form-control" id="exampleFormControlInput1" name="qty" placeholder="available stock" value={this.state.qty} onChange={this.handleChange} required />
                                <span style={{ color: "#FD6571" }}>{this.state.qtyerr}</span>
                            </div>
                            <div className="form-group col-md-8">
                                <label htmlFor="exampleFormControlInput1">warrenty period :</label>
                                <input type="number" className="form-control" id="exampleFormControlInput1" name="warrenty" placeholder="available stock" value={this.state.warrenty} onChange={this.handleChange} required />
                                <span style={{ color: "#FD6571" }}>{this.state.warrantyeerr}</span>
                            </div>
                             <div className="form-group col-md-8">
                                <label htmlFor="exampleFormControlInput1">Image :</label>  
                            <FileBase64
                                multiple={true}
                                onDone={this.getFiles.bind(this)} />
                            </div>
                            <div className="form-group col-md-8">
                                <label htmlFor="exampleFormControlInput1">Price :</label>
                                <input type="number" className="form-control" id="exampleFormControlInput1" name="Price" placeholder="Price in Rupees" value={this.state.Price} onChange={this.handleChange} required />
                                <span style={{ color: "#FD6571" }}>{this.state.priceerr}</span>
                            </div>
                            <div className="form-group col-md-8">
                                <label htmlFor="exampleFormControlInput1">Description :</label>
                                <div class="input-group-prepend">
                                </div>
                                <textarea class="form-control" aria-label="With textarea" className="form-control" id="exampleFormControlInput1" name="Description" placeholder="Description" value={this.state.Description} onChange={this.handleChange} required></textarea>
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
                        <h2 className="title">Add New Items to E-Shop</h2>
                        <div className="col-sm-2 sidenav">
                            <div className="list-group ">
                                <a className="list-group-item active">Quick LInks</a>
                                <a className="list-group-item"><Link to={"/stock"}>Add E-Stock</Link></a>
                                <a className="list-group-item"><Link to={"/onlinestore"}>E-shop</Link></a>
                                <a className="list-group-item"><Link to={"/stockview"}>E-Stock</Link></a>
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
                        </div>
                        <div className="col-sm-2 sidenav ">
                            <div className="list-group ">
                                <a className="list-group-item active">Item Types</a>
                               
                                {
                                    this.state.show ? (
                                        this.state.stockitems.map(data =>
                                            <li class="list-group-item d-flex justify-content-between align-items-center">
                                                {data._id.item}
                                                <span class="badge badge-primary badge-pill">unsold :{data.total}</span>
                                            </li>
                                        )
                                    ) : (
                                            <div >
                                               
                                            </div>
                                        )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default Stores;