import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';
import './container.css';


class Container extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fname: '',
      lname: '',
      email: '',
      msg:'',
      password: '',
      cmfpassword: '',
      passworderr: '',
      lnameerr: '',
      fnameerr: '',
      emailerr: '',
      cmfpassworderr: '',
      showsuc: false,
      showerr: false,
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
      passworderr: '',
      lnameerr: '',
      fnameerr: '',
      emailerr: '',
      cmfpassworderr: '',
      showsuc: false,
      showerr: false,
    });
  }

  handleSubmit(e) {
    var authToken = localStorage.token;
    e.preventDefault();
    if (this.handleValidation()) {
      const user = {
        fname: this.state.fname,
        lname: this.state.lname,
        email: this.state.email,
        password: this.state.password
      }
      fetch("http://localhost:4000/register/newid", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': 'Bearer' + authToken
        },
        body: JSON.stringify(user)
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
  handleValidation() {
    let formvalid = true
    if (this.state.fname !== 'undefined') {
      if (!this.state.fname.match(/^[a-zA-Z]{3,}$/i)) {
        this.setState({
          fnameerr: 'first name invalid!',
        })
        formvalid = false
      }
    }
    if (this.state.lname !== 'undefined') {
      if (!this.state.lname.match(/^[a-zA-Z]{3,}$/i)) {
        this.setState({
          lnameerr: 'first name invalid!',
        })
        formvalid = false
      }
    }
    if (this.state.email !== 'undefined') {
      if (!this.state.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
        this.setState({
          emailerr: 'email invalid!',
        })
        formvalid = false
      }
    }
    if (this.state.password.length < 6) {
      this.setState({
        passworderr: 'password cannot accept',
      })
      this.reset();
      formvalid = false
    }
    if (this.state.cmfpassword != this.state.password) {
      this.setState({
        cmfpassworderr: 'password comfirmation fail!',
      })
      this.reset();
      formvalid = false
    }

    return formvalid
  }
  reset=()=>{
    this.setState({
      password: '',
      cmfpassword: '',
    })
  }
  resetForm = () => {
    this.setState({
      fname: '',
      lname: '',
      email: '',
      password: '',
      cmfpassword: '',
    })
  }
  render() {
    return (
      <div id="contact" className="container-fluid">
        <div className="containers col-sm-12">
          <h2 className="text-centers"><div >!!Register new Admin Here!!</div></h2>
          <div className="row">
            <div>
              <div className="col-sm-5">
                <p>Contact us and we'll get back to you within 24 hours.</p>
                <p><span className="glyphicon glyphicon-map-marker"></span> Moratuwa</p>
                <p><span className="glyphicon glyphicon-phone"></span> +00 1515151515</p>
                <p><span className="glyphicon glyphicon-envelope"></span> myemail@something.com</p>
              </div>
            </div>
            <div className="col-sm-7 slideanim " >
              <div className="adminmsg">
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

              </div>

              <form onSubmit={this.handleSubmit} ref="form">
                <div className="form-group col-sm-6">
                  <label htmlFor="name">First name:</label>
                  <p className="formtext">input first name</p>
                  <input type="text" className="form-control" name="fname" id="fname" value={this.state.fname} onChange={this.handleChange} required />
                  <span style={{ color: "#FD6571" }}>{this.state.fnameerr}</span>
                </div>
                <div className="form-group col-sm-6">
                  <label htmlFor="name">Last name:</label>
                  <p className="formtext">input last name</p>
                  <input type="text" className="form-control" name="lname" id="lname" value={this.state.lname} onChange={this.handleChange} required />
                  <span style={{ color: "#FD6571" }}>{this.state.lnameerr}</span>
                </div>
                <div className="form-group col-sm-12">
                  <label htmlFor="email">Email address:</label>
                  <p className="formtext">input correct email</p>
                  <input type="email" className="form-control" name="email" id="email" value={this.state.email} onChange={this.handleChange} required />
                  <span style={{ color: "#FD6571" }}>{this.state.emailerr}</span>
                </div>
                <div className="form-group col-sm-12" >
                  <label htmlFor="pwd">Password:</label>
                  <p className="formtext">use minimum 6 characters</p>
                  <input type="password" className="form-control" name="password" id="pwd" value={this.state.password} onChange={this.handleChange} required />
                  <span style={{ color: "#FD6571" }}>{this.state.passworderr}</span>
                </div>
                <div className="form-group col-sm-12" >
                  <label htmlFor="pwd">Comfirm Password:</label>
                  <p className="formtext">once again enter your password</p>
                  <input type="password" className="form-control" name="cmfpassword" id="pwdcmf" value={this.state.cmfpassword} onChange={this.handleChange} required />
                  <span style={{ color: "#FD6571" }}>{this.state.cmfpassworderr}</span>
                </div>
                <input type="submit" name="submit" value="Submit" className="btn btn-info" />
              </form>
            </div>
          </div>
        </div>
      </div>

    );

  }
}



export default Container;
