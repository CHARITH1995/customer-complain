import React, { Component } from 'react';
import { Image, Carousel } from 'react-bootstrap';
import './info.css';
class Infor extends Component {
    render() {
        return (
            <div className="jumbotron text-center">
                <Carousel>
                    <Carousel.Item>
                        <img width={1520} height={500} alt="900x500" src="/assets/7.jpg" />
                       
                    </Carousel.Item>
                    <Carousel.Item>
                        <img width={1520} height={500} alt="900x500" src="/assets/11.jpg" />
                       
                    </Carousel.Item>
                    <Carousel.Item>
                        <img width={1520} height={500} alt="900x500" src="/assets/6.jpg" />
                      
                    </Carousel.Item>
                </Carousel>
            </div>
        );

    }
}



export default Infor;
