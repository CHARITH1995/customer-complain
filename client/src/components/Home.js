import React, { Component } from 'react';
import Container from './front/container';
import Navbar from './front/Navbar';
import Services from './front/Services';
import Sections from './front/Sections';
import About from './front/About';
import Infor from './front/Infor';
import './Home.css';
import { withRouter } from 'react-router-dom';




class Home extends Component {

    render() {
        if (localStorage.token) {
            return (
                <div>
                    <Navbar />
                    <Infor />
                    <About />
                    <Services />
                    <Sections />
                    {
                        (localStorage.admin=='yes') ? (
                            <Container />
                        ) : (
                                <div>
                                      <footer class="footer">
                                        <div className="container bottom_border">
                                            <div className="row">
                                                <div className=" col-sm-4 col-md col-sm-4  col-12 col">
                                                    <h5 class="headin5_amrc col_white_amrc pt2">Find us</h5>
                                                    <p className="mb10"> we seek to continuously enhance our products and services while focusing on affordability and accessibility so that every home is “connected” and are able to enjoy the benefits of access to knowledge and information. We consid</p>
                                                
                                                    <p><i className="fa fa-phone"></i>  +94-1199878398  </p>
                                                    <p><i className="fa fa fa-envelope"></i> pr@slt.lk  </p>


                                                </div>


                                                <div className=" col-sm-4 col-md  col-6 col">
                                                    <h5 className="headin5_amrc col_white_amrc pt2">Quick links</h5>

                                                    <ul className="footer_ul_amrc">
                                                    <li><a href="/onlinestore">E-shop</a></li>
                  <li><a href="/addstores">Add New Items</a></li>
                  <li><a href="/stockview">E-stock</a></li>
                  <li><a href="/stock">E-stock maintain</a></li>
                  <li><a href="/purchaseview">Purchases views</a></li>
                  <li><a href="/storedata">Store Data</a></li>
                
               /ul></ul>

                                                </div>


                                                <div className=" col-sm-4 col-md  col-6 col">
                                                    <h5 className="headin5_amrc col_white_amrc pt2">Quick links</h5>

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
                                            
                                            <p className="text-center">Copyright @2017 | Designed With by <a href="#">Your Company Name</a></p>

                                            
                                        </div>

                                    </footer>
                                </div>
                                
                            )
                    }
                </div>
            );
        }
    }
}



export default withRouter(Home);
