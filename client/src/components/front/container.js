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
      msg: '',
      tp: '',
      id: '',
      is_admin: false,
      password: '',
      passworderr: '',
      lnameerr: '',
      fnameerr: '',
      emailerr: '',
      tperr: '',
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
      tperr: '',
      cmfpassworderr: '',
      showsuc: false,
      showerr: false,
      msg: '',
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
        is_admin: this.state.is_admin,
        password: (Math.floor(Math.random() * 1000000) + 100000).toString(),
        id: this.state.id,
        tp: this.state.tp,
      }
      console.log(user)
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
          if (json.success) {
            this.setState({
              showsuc: true,
              msg: json.msg
            })
            this.resetForm()
          } else {
            this.setState({
              showerr: true,
              msg: json.msg
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
    if (this.state.tp !== 'undefined') {
      if (!this.state.tp.match(/^[0-9\-\+]{10}$/i)) {
        this.setState({
          tperr: 'telephone invalid!',

        })
        formvalid = false
      }
    }

    return formvalid
  }
  resetForm = () => {
    this.setState({
      fname: '',
      lname: '',
      email: '',
      id: '',
      tp: '',
    })
  }
  handleCheck = () => {
    this.setState({ is_admin: !this.state.is_admin });
  }
  render() {
    return (
      <div>
        <footer class="footer">
          <div className="container bottom_border">
            <div className="row">
            <div className="col-sm-6 new slideanim contain" >
            <h3 className="headin5_amrc col_white_amrc pt2">New User Registration for System</h3>
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
                  <p className="formtext">input first name</p>
                  <input type="text" className="form-control" name="fname" id="fname" value={this.state.fname} onChange={this.handleChange} required />
                  <span style={{ color: "#FD6571" }}>{this.state.fnameerr}</span>
                </div>
                <div className="form-group col-sm-6">
                  <p className="formtext">input last name</p>
                  <input type="text" className="form-control" name="lname" id="lname" value={this.state.lname} onChange={this.handleChange} required />
                  <span style={{ color: "#FD6571" }}>{this.state.lnameerr}</span>
                </div>
                <div className="form-group col-sm-12">
                  <p className="formtext">Email address :</p>
                  <input type="email" className="form-control" name="email" id="email" value={this.state.email} onChange={this.handleChange} required />
                  <span style={{ color: "#FD6571" }}>{this.state.emailerr}</span>
                </div>
                <div className="form-group col-md-12">
                  <p className="formtext">Telephone Number :</p>
                  <input type="number" className="form-control" id="exampleFormControlInput1" name="tp" placeholder="" value={this.state.tp} onChange={this.handleChange} />
                  <span style={{ color: "#FD6571" }}>{this.state.tperr}</span>
                </div>
                <div className="form-group col-md-12">
                  <label className="checkbox-inline"><input type="checkbox" defaultChecked={this.state.is_admin} onChange={this.handleCheck} /><p className="formtext">: Admin</p></label>
                </div>
                <div className="form-group col-md-12">
                <p className="formtext">Company ID</p>
                  <input type="text" className="form-control" id="exampleFormControlInput1" name="id" placeholder="********" value={this.state.id} onChange={this.handleChange} />
                  <span style={{ color: "#FD6571" }}>{this.state.Iderr}</span>
                </div>
                <input type="submit" name="submit" value="Submit" className="btn btn-info" />
              </form>
            </div>
              <div className=" col-sm-3 slideanim">
                <h3 className="headin5_amrc col_white_amrc pt2">Quick links</h3>
                <ul className="footer_ul_amrc">
                <li><a href="/onlinestore">E-shop</a></li>
                  <li><a href="/addstores">Add New Items</a></li>
                  <li><a href="/stockview">E-stock</a></li>
                  <li><a href="/stock">E-stock maintain</a></li>
                  <li><a href="/purchaseview">Purchases views</a></li>
                  <li><a href="/storedata">Store Data</a></li>
                </ul>
              </div>
              <div className=" col-sm-3 slideanim">
                <h3 className="headin5_amrc col_white_amrc pt2">Quick links</h3>
                <ul className="footer_ul_amrc">
                  <li><a href="/reports"> Monthly Reports and Calulation</a></li>
                  <li><a href="/Complain">Customer Complains</a></li>
                  <li><a href="/showcustomer">Customer Details</a></li>
                  <li><a href="/customerids">Customer Registration</a></li>
                  <li><a href="/showemployees">Technician Details</a></li>
                  <li><a href="/employeeids">Technician Registration</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="container">
            <p className="text-center">Copyright @2018 | Designed With by FIT 16</p>
          </div>

        </footer>
      </div>
    )
  }
}



export default Container;
