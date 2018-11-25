import React, { Component } from 'react';
import './error.css';


class Error extends Component {
 
    render() {
        return (
            <div id="notfound">
            <div class="notfound">
                <div class="notfound-404">
                    <h1>Oops!</h1>
                    <h2>Hey !! please log first </h2>
                </div>
                <a href="/">Go TO LOGGIN PAGE</a>
            </div>
        </div>
        );

    }

}


export default Error;
