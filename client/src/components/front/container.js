import React, { Component } from 'react';
import './container.css';


class Container extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fname: '',
      lname: '',
      email: '',                                              
      password: '',
      cmfpassword:'',
      default:true,
      err:true,
      fnameerr:true,
      lnameerr:true,
      emailerr:true,
      passerr:true,
      cmfpasserr:true,
      errname:'',
      showalert:false,
      succname:'',
      successmsg:false,
      mail:false,
      emailValid: false,
      passwordValid: false,
      nameValid:false,
      cmfValidate:false,
      formValid:false
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
      default:false,
      showalert:false,
      mail:false,
      successmsg:false,
    }, 
      () => { this.validateField(name, value)
    });
  }


  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;// let cmfValidate=this.state.cmfValidate;
    let fnameValid = this.state.fnameValid;
    let lnameValid = this.state.lnameValid;
    let cmfValidate=this.state.cmfValidate;
    
    switch(fieldName) {
      case 'fname':
        fnameValid=value.match(/^[a-zA-Z]{3,}$/i);
        if(!fnameValid){
          this.setState({
            errname:"your first name field incorrect",
            err:true,
            fnameerr:true
          })
        }else{
          this.setState({
            succname:"your first name field correct",
            err:false,
            fnameerr:false
          })
        }
        break;
        case 'lname':
        lnameValid=value.match(/^[a-zA-Z]{3,}$/i);
        if(!lnameValid){
          this.setState({
            errname:"your last name field incorrect",
            err:true,
            lnameerr:true
          })
        }else{
          this.setState({
            succname:"your last name field correct",
            err:false,
            lnameerr:false
          })
        }
        break;
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        if(!emailValid){
          this.setState({
            errname:"your email is not in correct format",
            err:true,
            emailerr:true,
          }) 
        }else{
          this.setState({
            succname:"your email can be accepted",
            err:false,
            emailerr:false
          })
        }
        break;
      case 'password':
        passwordValid = value.length >= 6;
        if(!passwordValid){
          this.setState({
            errname:"your password too short",
            err:true,
            passerr:true,
            cmfpasserr:true
          }) 
        }else{
          this.setState({
            ...this.state,
            succname:"your password can be accepted",
            err:false,
            passerr:false,
            cmfpasserr:true
          })
        }
        break;
        case 'cmfpassword':
          if(this.state.cmfpassword!==this.state.password){
            this.setState({
              ...this.state,
              errname:"confirmation can't be accepted",
              err:true,
              cmfpasserr:true
            }) 
          }else{
            this.setState({
              ...this.state,
              succname:"password confirmed",
              err:false,
              cmfpasserr:false
            })
          }
          break;
      default:
        break;
    } 
  }
  handleSubmit(e) {
    var authToken = localStorage.token;
    this.setState({
      ...this.state,
      default:true
    })
    e.preventDefault();
    if(!this.state.lnameerr &&!this.state.fnameerr && !this.state.emailerr && !this.state.passerr && !this.state.cmfpasserr){
      const user ={
        fname:this.state.fname,
        lname:this.state.lname,
        email:this.state.email,
        password:this.state.password
      }
      fetch("http://localhost:4000/register/newid",{
        method:"POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': 'Bearer' + authToken
        },
        body:JSON.stringify(user)
      })
       .then(res => res.json())
       .then(json =>{
           if(json.success){
            this.setState({
              successmsg:true
            })
            this.success();
            this.resetForm();
           }else{
             if(json.msg){
              this.setState({
                mail:true,
              })
              this.alert();
             } 
           }
       })
    }else{
    this.setState({
      showalert:true
    })
    this.alert();
    }
   
    }
  
 alert(){
   if(this.state.showalert){
     if(this.state.passerr){
      return(
        <div className="alert alert-danger" role="alert">
        <h2 className="msg">check your password field once again</h2>
      </div>
       )
     }
     else if(this.state.cmfpasserr){
      return(
        <div className="alert alert-danger" role="alert">
        <h2 className="msg">password comfirmation not valid</h2>
      </div>
       )
     }
     else if(this.state.fnameerr){
      return(
        <div className="alert alert-danger" role="alert">
        <h2 className="msg">check your first name field once again</h2>
      </div>
       )
      }else if(this.state.lnameerr){
        return(
          <div className="alert alert-danger" role="alert">
          <h2 className="msg">check your last name field once again</h2>
        </div>
         )
      }
  }       
 }
 success(){
  if(this.state.successmsg){
   return(
    <div className="alert alert-info" role="alert">
    <h2 className="msg">!!!Registered successfully!!!</h2>
  </div>
   )
  
 }       
}
 mailvalid(){
  if(this.state.mail){
    console.log("err")
    return(
     <div className="alert alert-danger" role="alert">
     <h2 className="msg">email is already taken!!</h2>
   </div>
    )
  }
 }
 err=()=>{
  if(this.state.default){
    return(
     <div></div>
    )
   }
   else if(this.state.err){
    return(
      <div className="alert alert-danger" role="alert">
        <h2 className="msg">{this.state.errname}</h2>
      </div>
    )
   }
   else{
    return(
      <div className="alert alert-success" role="alert">
        <h2 className="msg">{this.state.succname}</h2>
      </div>
    )
    
   }
      }   
 resetForm = () => {
  this.setState({
      ...this.state,
      fname: '',
      lname:'',
      email: '',
      password:'',
      cmfpassword:'',
      default:true,
      mail:false,
      showalert:false,
      success:false

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
        <div>
            {this.err()}
            {this.alert()}
            {this.mailvalid()}
            {this.success()}
          </div>
          
          <form onSubmit={this.handleSubmit} ref="form">
          <div className="form-group col-sm-6">
              <label htmlFor="name">First name:</label>
              <p className="formtext">input first name</p>
              <input type="text" className="form-control" name="fname" id="fname" value={this.state.fname} onChange={this.handleChange} required/>
            </div>
            <div className="form-group col-sm-6">
              <label htmlFor="name">Last name:</label>
              <p className="formtext">input last name</p>
              <input type="text" className="form-control" name="lname" id="lname" value={this.state.lname} onChange={this.handleChange} required/>
            </div>
            <div className="form-group col-sm-12">
              <label htmlFor="email">Email address:</label>
              <p className="formtext">input correct email</p>
              <input type="email" className="form-control" name="email" id="email" value={this.state.email} onChange={this.handleChange} required/>
            </div>
            <div className="form-group col-sm-12" >
              <label htmlFor="pwd">Password:</label>
              <p className="formtext">use minimum 6 characters</p>
              <input type="password" className="form-control" name="password" id="pwd" value={this.state.password} onChange={this.handleChange} required />
            </div>
            <div className="form-group col-sm-12" >
              <label htmlFor="pwd">Comfirm Password:</label>
              <p className="formtext">once again enter your password</p>
              <input type="password" className="form-control" name="cmfpassword" id="pwdcmf" value={this.state.cmfpassword} onChange={this.handleChange} required />
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
