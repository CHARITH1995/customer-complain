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
                        <Carousel.Caption>
                            <h3>First slide label</h3>
                            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img width={1520} height={500} alt="900x500" src="/assets/6.jpg" />
                        <Carousel.Caption>
                            <h3>Second slide label</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img width={1520} height={500} alt="900x500" src="/assets/7.jpg" />
                        <Carousel.Caption>
                            <h3>Third slide label</h3>
                            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </div>
        );

    }
}



export default Infor;
