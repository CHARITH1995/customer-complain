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
              <div className=" col-sm-3">
                <h3 className="headin5_amrc col_white_amrc pt2">Quick links</h3>
                <ul className="footer_ul_amrc">
                  <li><a href="http://kalarikendramdelhi.com">Remove Background</a></li>
                  <li><a href="http://kalarikendramdelhi.com">Shadows  Mirror Reflection</a></li>
                  <li><a href="http://kalarikendramdelhi.com">Logo Design</a></li>
                  <li><a href="http://kalarikendramdelhi.com">Vectorization</a></li>
                  <li><a href="http://kalarikendramdelhi.com">Hair Masking/Clipping</a></li>
                  <li><a href="http://kalarikendramdelhi.com">Image Cropping</a></li>
                </ul>
              </div>
              <div className=" col-sm-3">
                <h3 className="headin5_amrc col_white_amrc pt2">Quick links</h3>
                <ul className="footer_ul_amrc">
                  <li><a href="http://kalarikendramdelhi.com">Remove Background</a></li>
                  <li><a href="http://kalarikendramdelhi.com">Shadows  Mirror Reflection</a></li>
                  <li><a href="http://kalarikendramdelhi.com">Logo Design</a></li>
                  <li><a href="http://kalarikendramdelhi.com">Vectorization</a></li>
                  <li><a href="http://kalarikendramdelhi.com">Hair Masking/Clipping</a></li>
                  <li><a href="http://kalarikendramdelhi.com">Image Cropping</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="container">
            <ul className="foote_bottom_ul_amrc">
              <li><a href="http://kalarikendramdelhi.com">Home</a></li>
              <li><a href="http://kalarikendramdelhi.com">About</a></li>
              <li><a href="http://kalarikendramdelhi.com">Services</a></li>
              <li><a href="http://kalarikendramdelhi.com">Pricing</a></li>
              <li><a href="http://kalarikendramdelhi.com">Blog</a></li>
              <li><a href="http://kalarikendramdelhi.com">Contact</a></li>
            </ul>
            <p className="text-center">Copyright @2018 | Designed With by FIT 16</p>

            <ul className="social_footer_ul">
              <li><a href="http://kalarikendramdelhi.com"><i class="fab fa-facebook-f"></i></a></li>
              <li><a href="http://kalarikendramdelhi.com"><i class="fab fa-twitter"></i></a></li>
              <li><a href="http://kalarikendramdelhi.com"><i class="fab fa-linkedin"></i></a></li>
              <li><a href="http://kalarikendramdelhi.com"><i class="fab fa-instagram"></i></a></li>
            </ul>
          </div>

        </footer>
      </div>
    )
  }
//   render() {
//     return (
//       <div id="contact" className="container-fluid">
//         <div className="containers col-sm-12">
//           <h2 className="text-centers"><div >!!Register new Admin Here!!</div></h2>
//           <div className="row">
//             <div>
//               <div className="col-sm-5">
//                 <p>Contact us and we'll get back to you within 24 hours.</p>
//                 <p><span className="glyphicon glyphicon-map-marker"></span> Moratuwa</p>
//                 <p><span className="glyphicon glyphicon-phone"></span> +00 1515151515</p>
//                 <p><span className="glyphicon glyphicon-envelope"></span> myemail@something.com</p>
//               </div>
//             </div>
//             <div className="col-sm-7 slideanim " >
//               <div className="adminmsg">
//                 {
//                   this.state.showerr ? (
//                     <div >
//                       <Panel bsStyle="danger" className="text-center">
//                         <Panel.Heading>
//                           <Panel.Title componentClass="h3">{this.state.msg}</Panel.Title>
//                         </Panel.Heading>
//                       </Panel>
//                     </div>
//                   ) : (
//                       <div>

//                       </div>
//                     )
//                 }
//                 {
//                   this.state.showsuc ? (
//                     <div className="adminmsg">
//                       <Panel bsStyle="success" className="text-center">
//                         <Panel.Heading>
//                           <Panel.Title componentClass="h3">{this.state.msg}</Panel.Title>
//                         </Panel.Heading>
//                       </Panel>
//                     </div>
//                   ) : (
//                       <div>

//                       </div>
//                     )
//                 }

//               </div>
//               <form onSubmit={this.handleSubmit} ref="form">
//                 <div className="form-group col-sm-6">
//                   <label htmlFor="name">First name:</label>
//                   <p className="formtext">input first name</p>
//                   <input type="text" className="form-control" name="fname" id="fname" value={this.state.fname} onChange={this.handleChange} required />
//                   <span style={{ color: "#FD6571" }}>{this.state.fnameerr}</span>
//                 </div>
//                 <div className="form-group col-sm-6">
//                   <label htmlFor="name">Last name:</label>
//                   <p className="formtext">input last name</p>
//                   <input type="text" className="form-control" name="lname" id="lname" value={this.state.lname} onChange={this.handleChange} required />
//                   <span style={{ color: "#FD6571" }}>{this.state.lnameerr}</span>
//                 </div>
//                 <div className="form-group col-sm-12">
//                   <label htmlFor="email">Email address:</label>
//                   <p className="formtext">input correct email</p>
//                   <input type="email" className="form-control" name="email" id="email" value={this.state.email} onChange={this.handleChange} required />
//                   <span style={{ color: "#FD6571" }}>{this.state.emailerr}</span>
//                 </div>
//                 <div className="form-group col-md-12">
//                   <label htmlFor="exampleFormControlInput1">Telephone number :</label>
//                   <input type="number" className="form-control" id="exampleFormControlInput1" name="tp" placeholder="" value={this.state.tp} onChange={this.handleChange} />
//                   <span style={{ color: "#FD6571" }}>{this.state.tperr}</span>
//                 </div>
//                 <div className="form-group col-md-12">
//                   <label className="checkbox-inline"><input type="checkbox" defaultChecked={this.state.is_admin} onChange={this.handleCheck} />Admin</label>
//                 </div>
//                 <div className="form-group col-md-12">
//                   <label htmlFor="exampleFormControlInput1">Company ID :</label>
//                   <input type="text" className="form-control" id="exampleFormControlInput1" name="id" placeholder="********" value={this.state.id} onChange={this.handleChange} />
//                   <span style={{ color: "#FD6571" }}>{this.state.Iderr}</span>
//                 </div>
//                 <input type="submit" name="submit" value="Submit" className="btn btn-info" />
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
}



export default Container;
