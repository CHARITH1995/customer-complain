import React, { Component } from 'react';
import Container from './front/container';
import Navbar from './front/Navbar';
import Services from './front/Services';
import Sections from './front/Sections';
import About from './front/About';
import Infor from './front/Infor';
import './Home.css';
import { withRouter} from 'react-router-dom';




class Home extends Component {
 
    render() {
        if(localStorage.token){
        return (
            <div>
                <Navbar />
                <Infor />
                <About />
                <Services />
                <Sections />
                <Container />
            </div>
        );
    }
}
}
                
                    
                    
export default withRouter(Home);
