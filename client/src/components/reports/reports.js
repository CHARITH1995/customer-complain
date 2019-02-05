import React, { Component } from 'react';
import Nav from '../front/nav';
import { Link } from 'react-router-dom';
import PieChart from "react-svg-piechart";
import Searchreport from "./searchreport";
import { css } from '@emotion/core';
import { HashLoader } from 'react-spinners';
import './reports.css';

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

class Reports extends Component {
    constructor(props) {
        super(props);
        this.state = {
            complains: [],
            sales: [],
            is_mount: true,
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
            details: [],
<<<<<<< HEAD
            loading:true
=======
            total:''
>>>>>>> 8c86f69c10cb523757b2c31024765e6e089eda48
        }
    }
    logout = (e) => {
        e.preventDefault();
        localStorage.clear();
        sessionStorage.clear();
        this.props.history.push("/");
    }
    componentDidMount() {
        var authToken = localStorage.token;
        if (this.state.is_mount) {
            this.componentWillUnmount();
<<<<<<< HEAD
            fetch("http://localhost:4000/reports/complainreports", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer' + authToken
                },
            }).then(function (response) {
                return response.json();
            }).then(reports => {
                //console.log(reports)
=======
        fetch("http://localhost:4000/reports/complainreports", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer' + authToken
            },
        }).then(function (response) {
            return response.json();
        }).then(reports => {
            this.setState({
                complains: reports
            })
            for (var i = 1; i <= this.state.complains.length; i++) {      // push backend data to (report genarat)array
>>>>>>> 8c86f69c10cb523757b2c31024765e6e089eda48
                this.setState({
                    complains: reports
                })
                for (var i = 1; i <= this.state.complains.length; i++) {
                    this.setState({
                        data: {
                            title: this.state.complains[i - 1]._id.subarea,
                            value: parseInt(this.state.complains[i - 1].total),
                            color: this.state.complains[i - 1]._id.color,
                        }
                    })
                    this.state.details.push(this.state.data)
                }
            })
            var authToken = localStorage.token;
            fetch("http://localhost:4000/reports/salesreports", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer' + authToken
                },
            }).then(function (response) {
                return response.json();
            }).then(details => {
                this.setState({
                    sales: details
                })
<<<<<<< HEAD
                for (var i = 1; i <= this.state.sales.length; i++) {
                    this.setState({
                        salesdata: {
                            title: this.state.sales[i - 1]._id.item,
                            value: parseInt(this.state.sales[i - 1]._id.soldqty),
                            color: this.state.sales[i - 1]._id.color
                        },
                        loading:false
                    })
                    this.state.salesdetails.push(this.state.salesdata);
                }
            })
        }
    }
    componentWillUnmount() {
        this.setState({
            is_mount: false
        })
    }
=======
                this.state.salesdetails.push(this.state.salesdata);
            }
            
        })
    }
    fetch("http://localhost:4000/reports/totalqty", {
        method: "post",
        headers: {
            "Content-Type": "application/json",
            'Authorization': 'Bearer' + authToken
        },
    }).then(function (response) {
        return response.json();
    }).then(data => {
       this.setState({
           total:data
       })
    })
}
componentWillUnmount(){
    this.setState({
        is_mount:false
    })
}
>>>>>>> 8c86f69c10cb523757b2c31024765e6e089eda48
    render() {
        if (localStorage.token) {
            return (
                <div>
                    {
                        this.state.loading ? (
                            <div className='sweet-loading'>
                                <HashLoader
                                    css={override}
                                    sizeUnit={"px"}
                                    size={50}
                                    color={'#0073F5'}
                                    loading={this.state.loading} />
                            </div>
                        ) : (
                                <div>
                                    <div id="services" className="container-fluid text-center">
                                        <Nav />
                                        <h2 className="text-center">Reports</h2>
                                        <br />
                                        <div className="contain col-md-12 slideanim ">
                                            <div className="shadow p-3 mb-5 bg-white rounded">
                                                <div className="col-md-5 ">
                                                    <h2 className="text-center"> Complains of this month</h2>
                                                    <PieChart
                                                        data={this.state.details}
                                                        expandOnHover
                                                        onSectorHover={(d, i, e) => {
                                                            if (d) {
                                                                //console.log("Mouse enter - Index:", i, "Data:", d, "Event:", e)
                                                            } else {
                                                                //console.log("Mouse leave - Index:", i, "Event:", e)
                                                            }
                                                        }
                                                        }
                                                    />
                                                </div>
                                                <div className="col-md-5">
                                                    <div className="area">
                                                        {
                                                            this.state.complains.map(complain =>
                                                                <div className="cards-body" style={{ background: complain._id.color }}>
                                                                    <ul className="list-group list-group-flush">
                                                                        <li key={complain._id}><Link to={"/Subarea/" + complain._id.subarea}><span className="names">Subarea : {complain._id.subarea}</span></Link></li>
                                                                        <li><span className="names">Total Complains : </span>{complain.total}</li>
                                                                    </ul>
                                                                </div>
                                                            )
                                                        }
                                                    </div>
                                                </div>
                                            </div>
<<<<<<< HEAD
                                        </div>
                                        <br /><br />
                                        <div className="contain col-md-12 slideanim ">
                                            <div className="shadow p-3 mb-5 bg-white rounded">
                                                <div className="col-md-5">
                                                    <h2 className="text-center">Sold Items</h2>
                                                    <PieChart
                                                        data={this.state.salesdetails}
                                                        expandOnHover
                                                        onSectorHover={(d, i, e) => {
                                                            if (d) {
                                                                //console.log("Mouse enter - Index:", i, "Data:", d, "Event:", e)
                                                            } else {
                                                                // console.log("Mouse leave - Index:", i, "Event:", e)
                                                            }
                                                        }
                                                        }
                                                    />
                                                </div>
                                                <div className="col-md-5">
                                                    <div className="area">
                                                        {this.state.sales.map(sale =>
                                                            <div className="cards-body" style={{ background: sale._id.color }}>
                                                                <ul className="list-group list-group-flush">
                                                                    <li key={sale._id}><span className="names">Item Type : {sale._id.item}</span></li>
                                                                    <li><span className="names">Sold Items : </span>{sale._id.soldqty}</li>
                                                                </ul>
                                                            </div>
                                                        )
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
=======
                                        )
                                    }
                                </div>
                            </div>
                            </div>
                        </div>
                        <br /><br />
                    <div className="contain col-md-12 slideanim ">
                            <div className="shadow p-3 mb-5 bg-white rounded">
                        <div className="col-md-5">
                            <h2 className="text-center">Sold Items</h2>
                            <PieChart
                                data={this.state.salesdetails}
                                expandOnHover
                                onSectorHover={(d, i, e) => {
                                    if (d) {
                                        //console.log("Mouse enter - Index:", i, "Data:", d, "Event:", e)
                                    } else {
                                       // console.log("Mouse leave - Index:", i, "Event:", e)
                                    }
                                }
                                }
                            />
                        </div>
                        <div className="col-md-5">
                            <div className="area">
                                {this.state.sales.map(sale =>       // sales eke object call
                                    <div className="cards-body" style={{ background: sale._id.color }}>
                                    <ul className="list-group list-group-flush">
                                            <li key={sale._id}><span className="names">Item Type : {sale._id.item}</span></li>
                                            <li><span className="names">Sold Items : </span>{sale._id.soldqty}</li>
                                            {
                                                this.state.total>0 ?(      
                                            <li key={sale._id}><span className="names">Precentage : {(sale._id.soldqty/this.state.total)*100} %</span></li>
                                                ):(
                                                    <div></div>
                                                )
                                            }
                                    </ul>
>>>>>>> 8c86f69c10cb523757b2c31024765e6e089eda48
                                    </div>
                                    <div>
                                        <Searchreport />
                                    </div>
                                </div>
                            )
                    }
                </div>
            )
        }
    }
}
export default Reports;