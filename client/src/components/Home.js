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
                                                    <p className="mb10">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                                                    <p><i className="fa fa-location-arrow"></i> 9878/25 sec 9 rohini 35 </p>
                                                    <p><i className="fa fa-phone"></i>  +91-9999878398  </p>
                                                    <p><i className="fa fa fa-envelope"></i> info@example.com  </p>


                                                </div>


                                                <div className=" col-sm-4 col-md  col-6 col">
                                                    <h5 className="headin5_amrc col_white_amrc pt2">Quick links</h5>

                                                    <ul className="footer_ul_amrc">
                                                        <li><a href="http://kalarikendramdelhi.com">Image Rectoucing</a></li>
                                                        <li><a href="http://kalarikendramdelhi.com">Clipping Path</a></li>
                                                        <li><a href="http://kalarikendramdelhi.com">Hollow Man Montage</a></li>
                                                        <li><a href="http://kalarikendramdelhi.com">Ebay  Amazon</a></li>
                                                        <li><a href="http://kalarikendramdelhi.com">Hair Masking/Clipping</a></li>
                                                        <li><a href="http://kalarikendramdelhi.com">Image Cropping</a></li>
                                                    </ul>

                                                </div>


                                                <div className=" col-sm-4 col-md  col-6 col">
                                                    <h5 className="headin5_amrc col_white_amrc pt2">Quick links</h5>

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
                                            <p className="text-center">Copyright @2017 | Designed With by <a href="#">Your Company Name</a></p>

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
                </div>
            );
        }
    }
}



export default withRouter(Home);
