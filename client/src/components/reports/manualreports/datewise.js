import React, { Component } from 'react';
import Nav from '../front/nav';
import { Link } from 'react-router-dom';
import PieChart from "react-svg-piechart";


class Datewise extends Component {
    constructor(props) {
        super(props);
        this.state = {
            complains: [],
            sales: [],
            salesdata: [{
                title: '',
                value: 0,
                color: ''
            }],
            salesdetails: [],
            data: [{
                title: '',
                value: 0,
                color: ''
            }],
            details: []
        }
    }
    componentDidMount() {
        var authToken = localStorage.token;
        fetch("http://localhost:4000/complain/Status/"+this.props.match.params.status+"/"+this.props.match.params.subarea, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer' + authToken
            },
        })
            .then(function (response) {
                return response.json();
            })
            .then(data => {
                this.setState({
                    complains:data
                })
            })
           
    }

    render() {
        if (localStorage.token) {
            return (
                <div>
                    <div id="services" className="container-fluid text-center">
                        <Nav />
                        <h3 className="text-center">Reports Of this Month</h3>
                        <br />
                        <div className="container col-md-12 slideanim ">
                            <div className="col-md-5">
                                <h3 className="text-center"> Complains</h3>
                                <PieChart
                                    data={this.state.details}
                                    expandOnHover
                                    onSectorHover={(d, i, e) => {
                                        if (d) {
                                            console.log("Mouse enter - Index:", i, "Data:", d, "Event:", e)
                                        } else {
                                            console.log("Mouse leave - Index:", i, "Event:", e)
                                        }
                                    }
                                    }
                                />
                            </div>
                            <div className="col-md-5">
                                <div className="area">
                                    {   
                                        this.state.details.map(detail =>
                                            <div className="row">
                                            <div className="card">
                                                <div className="cards-body" style={{ background: detail.color }}>
                                                    <div >
                                                        <ul>
                                                            <li><Link to={"/Subarea/" + detail.title}><span className="attribute">Subarea : </span>{detail.title}</Link></li>
                                                            <li><span className="attribute">Total Complains : </span>{detail.value}</li>
                                                        </ul>
                                                        <hr />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                        <br /><br />
                    </div>

                    <div className="container col-md-12 slideanim ">
                        <div className="col-md-5">
                            <h3 className="text-center">Sold Items</h3>
                            <PieChart
                                data={this.state.salesdetails}
                                expandOnHover
                                onSectorHover={(d, i, e) => {
                                    if (d) {
                                        console.log("Mouse enter - Index:", i, "Data:", d, "Event:", e)
                                    } else {
                                        console.log("Mouse leave - Index:", i, "Event:", e)
                                    }
                                }
                                }
                            />
                        </div>
                        <div className="col-md-5">
                            <div className="area">
                                {this.state.salesdetails.map(detail =>
                                    <div className="row">
                                        <div className="card">
                                            <div className="cards-body" style={{ background: detail.color }}>
                                                <div >
                                                    <ul>
                                                        <li><span className="attribute">Item Type : </span>{detail.title}</li>
                                                        <li><span className="attribute">Sold Items : </span>{detail.value}</li>
                                                    </ul>
                                                    <hr />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                                }
                            </div>
                        </div>
                    </div>
                    <Searchreport />
                </div>
            )
        }
    }
}
export default Datewise;