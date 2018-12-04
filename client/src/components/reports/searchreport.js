import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './searchreport.css';


class Searchreport extends Component {
    constructor(props) {
        super(props);
        this.state = {
            month: 0,
            year: 0,
            subarea:''
        };
        this.handleChange = this.handleChange.bind(this);
    }
 
    handleChange(e) {
        let target = e.target;
        let value = target.type === 'checkbox' ? target.checked : target.value
        let name = target.name;
        this.setState({
            [name]: value,
        });
    }

    render() {
        return (
            <div id="contact" className="container-fluid">
                <div className="containers col-sm-12 slideanim">
                    <h2 className="text-centers"><div>Get the results manually</div></h2>
                    <div className="container col-sm-6">
                        <div className="row">
                            <div className="card">
                                <form>
                                    <div className="form-group col-md-4">
                                        <label htmlFor="exampleFormControlInput1"> Month :(1 - 12)</label>
                                        <input type="text" className="form-control" id="exampleFormControlInput1" name="month" placeholder="month"  onChange={this.handleChange} required />
                                    </div>
                                    <div className="form-group col-md-4">
                                        <label htmlFor="exampleFormControlInput1">Year :</label>
                                        <input type="text" className="form-control" id="exampleFormControlInput1" name="year" placeholder="year"  onChange={this.handleChange} required />
                                    </div>
                                    <div className="form-group col-md-8">
                                        <Link to={"/manualreports/"+this.state.year+"/"+this.state.month} className="btn btn-info">Search</Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="container col-sm-6">
                        <div className="row">
                            <div className="card">
                                <form>
                                    <div className="form-group col-md-8">
                                        <label htmlFor="exampleFormControlInput1">Sub Area :</label>
                                        <select className="form-control" id="exampleFormControlSelect1" name="subarea" value={this.state.subarea} onChange={this.handleChange} required>
                                            <option >--Select Sub-Area--</option>
                                            <option value="kandy">Kandy</option>
                                            <option value="galle">Galle</option>
                                            <option value="gampaha">Gampaha</option>
                                            <option value="colombo">Colombo</option>
                                        </select>
                                    </div>
                                    <div className="form-group col-md-8">
                                        <Link to={"/manualsoldreports/"+this.state.subarea} className="btn btn-info">Search</Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );

    }
}



export default Searchreport;
