import React, { Component } from 'react';
import { Image } from 'react-bootstrap';
import './info.css';
class Infor extends Component {
    render() {
        return (
            <div className="jumbotron text-center">
                <div id="myCarousel" className="carousel slide text-center" data-ride="carousel">
                    <div className="cycle-slideshow"
                        data-cycle-fx="scrollHorz"
                        data-cycle-pause-on-hover="true"
                        data-cycle-speed="800"
                    >
                        <ol className="carousel-indicators">
                            <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
                            <li data-target="#myCarousel" data-slide-to="1"></li>
                            <li data-target="#myCarousel" data-slide-to="2"></li>
                        </ol>
                        <div className="carousel-inner" role="listbox">
                            <div className="item active">
                                <img src="/assets/7.jpg" />
                            </div>
                            <div className="item">
                                <img src="/assets/6.jpg" />
                            </div>
                            <div className="item">
                                <img src="/assets/7.jpg" />
                            </div>
                        </div>
                        <a className="left carousel-control" href="#myCarousel" role="button" data-slide="prev">
                            <span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
                            <span className="sr-only">Previous</span>
                        </a>
                        <a className="right carousel-control" href="#myCarousel" role="button" data-slide="next">
                            <span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
                            <span className="sr-only">Next</span>
                        </a>
                    </div>
                </div>

            </div>
        );

    }
}



export default Infor;
