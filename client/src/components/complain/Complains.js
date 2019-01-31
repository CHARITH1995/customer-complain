import React, { Component } from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';
import Nav from '../front/nav';
import './Complains.css';
import { Image ,Panel} from 'react-bootstrap';
import Pagination from "react-js-pagination";


class Complains extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            complains: [],
            searchfield: '',
            length: true,
            activePage: 1
        };
        this.onSearch = this.onSearch.bind(this);
    }
    searching(searchfield) {
        return function (x) {
            var search = []
            search = x.name.toLowerCase().includes(searchfield.toLowerCase()) || x.email.toLowerCase().includes(searchfield.toLowerCase()) || !searchfield;
            if (search.length === 0) {
                this.setState({
                    isempty: true
                })
            } else {
                return search
            }
        }
    }
    onSearch(e) {
        this.setState({
            searchfield: e.target.value
        })
    }
    componentDidMount() {
        var authToken = localStorage.token;
        fetch("http://localhost:4000/complain/comp", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer' + authToken
            },
        })
            .then(function (response) {
                return response.json();
            })
            .then(data => {
                if (data.success) {
                    this.setState({
                        length: true,
                        complains: data.details,
                    })
                } else {
                    this.setState({
                        length: false
                    })
                }
            })
    }
    handlePageChange(pageNumber) {
        this.setState({ activePage: pageNumber });
    }
    render() {
        const totalCourses = this.state.complains.length;

        if (localStorage.token) {
            return (
                <div>
                    <div className="head">
                        <Nav />
                    </div>
                    <div className="container-fluid">
                        <h2 className="title">Complains of this Month</h2>
                        <div className="col-sm-2 sidenav">
                            <div className="list-group ">
                                <a className="list-group-item active">SUB-AREAS</a>
                                <a className="list-group-item"><Link to={"/Subarea/" + "kandy"}>Kandy</Link></a>
                                <a className="list-group-item"><Link to={"/Subarea/" + "galle"}>Galle</Link></a>
                                <a className="list-group-item"><Link to={"/Subarea/" + "gampaha"}>Gampaha</Link></a>
                                <a className="list-group-item"><Link to={"/Subarea/" + "colombo"}>Colombo</Link></a>
                            </div>
                        </div>
                        <div class="col-sm-8">
                            <div className="searchbar">
                                <h2>Filterable List</h2>
                                <input className="form-control" id="myInput" type="text" placeholder="Search.." name="searchfield" value={this.state.searchfield} onChange={this.onSearch} required />
                            </div>

                            {
                                this.state.length ? (
                                    <div>
                                        {this.state.complains.filter(this.searching(this.state.searchfield)).map(complain =>
                                            <div className="contain rows">
                                                <div className="card-show">
                                                    <ul className="list-group list-group-flush">
                                                        <li className="list-group-item">Description : <span className="names">{complain.description}</span></li>
                                                        <li className="list-group-item">Customer Name : <span className="names">{complain.name}</span></li>
                                                        <li className="list-group-item">Email : <span className="names">{complain.email}</span></li>
                                                        <li className="list-group-item">Subarea : <span className="names">{complain.subarea}</span></li>
                                                        <li className="list-group-item">
                                                            <div className="storesbutton">
                                                                <Link to={"/Complainview/" + complain._id} className="btn btn-info">View</Link>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                    <hr />
                                                </div>
                                            </div>
                                        )
                                        }
                                    </div>
                                ) : (<div className="msg">
                                    <Panel bsStyle="danger" className="text-center">
                                        <Panel.Heading>
                                            <Panel.Title componentClass="h3">No Complains to Show</Panel.Title>
                                        </Panel.Heading>
                                    </Panel>
                                </div>

                                    )
                            }
                        </div>
                        {/* <div className="pagination">
                            Total Classes: {totalCourses}
                            <Pagination
                                activePage={this.state.activePage}
                                itemsCountPerPage={5}
                                totalItemsCount={totalCourses}
                                pageRangeDisplayed={2}
                                onChange={this.handlePageChange.bind(this)}
                            />
                        </div> */}
                    </div>
                </div>
            );
        }
    }
}

export default withRouter(Complains);
