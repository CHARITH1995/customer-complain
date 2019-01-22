import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Image ,Panel } from 'react-bootstrap';
import './employee.css';

class Updatecustomer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fname: '',
            laneone:'',
            lanetwo:'',
            city:'',
            postalcode:0,
            lname: '',
            accountNumber: '',
            email: '',
            id: '',
            tp:'',
            subarea: '',
            lnameerr:'',
            fnameerr:'',
            emailerr:'',
            tperr:'',
            subareaerr:'',
            accountNumbererr:'',
            Iderr:'',
            addresserr:'',
            postalcodeerr:'',
            showsuc:false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        let target = e.target;
        let value = target.type === 'checkbox' ? target.checked : target.value
        let name = target.name;
        this.setState({
            [name]: value,
            lnameerr: '',
            fnameerr: '',
            emailerr: '',
            tperr: '',
            addresserr: '',
            postalcodeerr: '',
            subareaerr: '',
            Iderr: '',
            accountNumbererr: '',
            showsuc: false,
            showerr: false,
        });
    }
    handleValidation(){
        let formvalid=true
        if(this.state.fname !== 'undefined'){
            if(!this.state.fname.match(/^[a-zA-Z]{3,}$/i)){
                this.setState({
                    fnameerr:'first name invalid!',  
                })
                console.log("f")
                formvalid=false
            }
        }
        if(this.state.lname !== 'undefined'){
            if(!this.state.lname.match(/^[a-zA-Z]{3,}$/i)){
                this.setState({
                    lnameerr:'first name invalid!',
                })
                console.log("l")
                formvalid=false
            }
        }
        if(this.state.email !== 'undefined'){
            if(!this.state.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)){
                this.setState({
                    emailerr:'email invalid!',  
                })
                console.log("e")
                formvalid=false
            }
        }
        if(this.state.tp !== 'undefined'){
            if(!this.state.tp.match(/^[0-9\-\+]{10}$/i)){
                this.setState({
                    tperr:'telephone invalid!',
                  
                })
                console.log("tp")
                formvalid=false
            }
        }
        if(this.state.subarea =='undefined'){
                this.setState({
                    subareaerr:'please select the subarea',
                   
                })
                console.log("sub")
                formvalid=false
            
        }
        if(this.state.id !== 'undefined'){
            if(!this.state.id.match(/^[0-9]{9}[vVxX]$/i)){
                this.setState({
                    Iderr:'NIC invalid!',
                 
                })
                console.log("nic")
                formvalid=false
            }
        }
        if((this.state.laneone == 'undefined')||(this.state.city == 'undefine')){
                this.setState({
                    addresserr:'check address field',
                })
                console.log("add")
                formvalid=false
            
        }
        if((this.state.postalcode == 'undefined')){
            this.setState({
                postalcodeerr:'insert your postal code',
            })
            console.log("pc")
            formvalid=false
        
    }
    if((this.state.accountNumber === 'undefined')){
        if(!this.state.accountNumber.match(/^[CcRr][1-9]{9}$/i)){
            this.setState({
                accountNumbererr:'Accountnumber Invalid!',
             
            })
            console.log("ac")
            formvalid=false
        }
    
}
        return formvalid
    }
    componentDidMount() {
        var authToken = localStorage.token;
        fetch("http://localhost:4000/register/editcustomer/"+this.props.match.params.id, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer' + authToken
            },
        }).then(function (response) {
            return response.json();
        }).then(data => {
            console.log(data)
            this.setState({
                fname:data.firstname,
                lname: data.lastname,
                subarea: data.subarea,
                accountNumber: data.accountNumber,
                tp:data.Tp,
                laneone:data.address.laneone,
                lanetwo:data.address.lanetwo,
                city:data.address.city,
                postalcode:parseInt(data.address.postalcode),
                id:data.Id,
                email:data.email,
            });
        });
    }
    handleSubmit(e) {
        var authToken = localStorage.token;
        this.setState({
            ...this.state,
            default:true
          })
        const customer = {
            id:this.props.match.params.id,
            firstname: this.state.fname,
            lastname: this.state.lname,
            subarea: this.state.subarea,
            accountNumber: this.state.accountNumber,
            laneone:this.state.laneone,
            lanetwo:this.state.lanetwo,
            Tp:this.state.tp,
            city:this.state.city,
            postalcode:parseInt(this.state.postalcode),
            Id: this.state.id,
            email: this.state.email,
        }
        e.preventDefault();
        console.log("here")
        if(this.handleValidation()){
        fetch("http://localhost:4000/register/updatecustomer/"+this.props.match.params.id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer' + authToken
            },
            body: JSON.stringify(customer)
        })
            .then(res => res.json())
            .then(json => {
                if(json.success){
                    this.setState({
                        showsuc:true,
                        msg:json.msg
                    })
                    this.resetForm()
                }else{
                    this.setState({
                        showerr:true,
                        msg:json.msg
                    }) 
                }
            }) 
            }
    }
    resetForm = () => {
        this.setState({
            fname: '',
            lname: '',
            laneone:'',
            lanetwo:'',
            city:'',
            postalcode:'',
            accountNumber: '',
            email: '',
            id: '',
            tp:''
        })
    }
   
    formfield() {
        return (
            <div className="idform">
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group col-md-8">
                            <label htmlFor="exampleFormControlInput1"> First Name :</label>
                            <input type="text" className="form-control" id="exampleFormControlInput1" name="fname" placeholder=" first name" value={this.state.fname} onChange={this.handleChange} required />
                            <span style={{ color: "#FD6571" }}>{this.state.fnameerr}</span>
                        </div>
                        <div className="form-group col-md-8">
                            <label htmlFor="exampleFormControlInput1">Last Name :</label>
                            <input type="text" className="form-control" id="exampleFormControlInput1" name="lname" placeholder=" last name" value={this.state.lname} onChange={this.handleChange} required />
                            <span style={{ color: "#FD6571" }}>{this.state.lnameerr}</span>
                        </div>
                        <div className="form-group col-md-8">
                            <label htmlFor="exampleFormControlInput1">Email :</label>
                            <input type="email" className="form-control" id="exampleFormControlInput1" name="email" placeholder="name@example.com" value={this.state.email} onChange={this.handleChange} required />
                            <span style={{ color: "#FD6571" }}>{this.state.emailerr}</span>
                        </div>
                        <div className="form-group col-md-8">
                            <label htmlFor="exampleFormControlInput1">Account number :</label>
                            <input type="text" className="form-control" id="exampleFormControlInput1" name="accountNumber" placeholder="CR0000000000" value={this.state.accountNumber} onChange={this.handleChange} required />
                            <span style={{ color: "#FD6571" }}>{this.state.accountNumbererr}</span>
                        </div>
                        <div className="form-group col-md-8">
                            <label htmlFor="exampleFormControlInput1">NIC number :</label>
                            <input type="text" className="form-control" id="exampleFormControlInput1" name="id" placeholder="0000000000V" value={this.state.id} onChange={this.handleChange} />
                            <span style={{ color: "#FD6571" }}>{this.state.Iderr}</span>
                        </div>
                        <div className="form-group col-md-8">
                            <label htmlFor="exampleFormControlInput1">Telephone Number :</label>
                            <input type="number" className="form-control" id="exampleFormControlInput1" name="tp" placeholder="enter the customer phone number" value={this.state.tp} onChange={this.handleChange} />
                            <span style={{ color: "#FD6571" }}>{this.state.Iderr}</span>
                        </div>
                        <div className="form-group col-md-8">
                            <label htmlFor="exampleFormControlInput1">Address :</label>
                            <input type="text" className="form-control" id="exampleFormControlInput1" name="laneone" placeholder="1st lane" value={this.state.laneone} onChange={this.handleChange} required />
                            <input type="text" className="form-control" id="exampleFormControlInput1" name="lanetwo" placeholder="2nd lane" value={this.state.lanetwo} onChange={this.handleChange} />
                            <input type="text" className="form-control" id="exampleFormControlInput1" name="city" placeholder="city" value={this.state.city} onChange={this.handleChange} required />
                            <input type="number" className="form-control" id="exampleFormControlInput1" name="postalcode" placeholder="postal code" value={this.state.postalcode} onChange={this.handleChange} required />
                            <span style={{ color: "#FD6571" }}>{this.state.addresserr}</span>
                        </div>
                        <div className="form-group col-md-8">
                            <label htmlFor="exampleFormControlInput1">Sub Area :</label>
                            <select className="form-control" id="exampleFormControlSelect1" name="subarea" value={this.state.subarea} onChange={this.handleChange} required>
                                <option value="1" >--Select Sub-Area--</option>
                                <option value="kandy">Kandy</option>
                                <option value="galle">Galle</option>
                                <option value="gampaha">Gampaha</option>
                                <option value="colombo">Colombo</option>
                            </select>
                            <span style={{ color: "#FD6571" }}>{this.state.subareaerr}</span>
                        </div>
                        <div className="form-group col-md-8">
                            <input type="submit" name="submit" value="Submit" className="btn btn-info" />
                        </div>
                    </form>
                </div>
            </div>
        )
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
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>

        );
    }
    render() {
        if(localStorage.token){
        return (
            <div>
                <div className="head">
                    {this.navbar()}
                </div>
                    <h2 className="custitle">Update - Customer Details</h2>
                <hr />
                    <div className="col-sm-2 sidebar">
                            <div className="list-group ">
                                <a className="list-group-item active">show all users</a>
                                <a className="list-group-item"><Link to={"/showcustomer"}>Cutomers</Link></a>
                                <a className="list-group-item"><Link to={"/showemployees"}>Employees</Link></a>
                            </div>
                        </div>
                        <div className="col-md-8 contain">
                        <div className="message">
                        <div>
                                    {
                                        this.state.showerr ?(
                                            <div className="message">
                                                <Panel bsStyle="danger" className="text-center">
                                            <Panel.Heading>
                                                <Panel.Title componentClass="h3">{this.state.msg}</Panel.Title>
                                            </Panel.Heading>
                                        </Panel>
                                            </div>
                                        ):(
                                            <div>

                                            </div>
                                        )
                                    }
                                     {
                                        this.state.showsuc ?(
                                            <div className="message">
                                                <Panel bsStyle="success" className="text-center">
                                            <Panel.Heading>
                                                <Panel.Title componentClass="h3">{this.state.msg}</Panel.Title>
                                            </Panel.Heading>
                                        </Panel>
                                            </div>
                                        ):(
                                            <div>

                                            </div>
                                        )
                                    }
                                </div>  
                                </div>    
                            <div>
                                {this.formfield()}
                            </div>
                        </div>
            </div>
        );
    }
}
}
export default Updatecustomer;