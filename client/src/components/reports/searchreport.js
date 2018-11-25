import React, { Component } from 'react';
import './searchreport.css';


class Searchreport extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
        // this.handleChange = this.handleChange.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
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
                                <form onSubmit={this.handleSubmit}>
                                    <div className="form-group col-md-4">
                                        <label htmlFor="exampleFormControlInput1"> Month :(1 - 12)</label>
                                        <input type="text" className="form-control" id="exampleFormControlInput1" name="month" placeholder="month" value={this.state.fname} onChange={this.handleChange} required />
                                    </div>
                                    <div className="form-group col-md-4">
                                        <label htmlFor="exampleFormControlInput1">Year :</label>
                                        <input type="text" className="form-control" id="exampleFormControlInput1" name="year" placeholder="year" value={this.state.lname} onChange={this.handleChange} required />
                                    </div>
                                    <div className="form-group col-md-8">
                                        <div className="radio-inline">
                                            <label><input type="radio" name="optradio" /> Sales</label>
                                        </div>
                                        <div className="radio-inline">
                                            <label><input type="radio" name="optradio" checked /> Complains</label>
                                        </div>
                                    </div>
                                    <div className="form-group col-md-8">
                                        <input type="submit" name="submit" value="Submit" className="btn btn-info" />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="container col-sm-6">
                        <div className="row">
                            <div className="card">
                                <form onSubmit={this.handleSubmit}>
                                    <div className="form-group col-md-8">
                                        <label htmlFor="exampleFormControlInput1">Subarea :</label>
                                        <input type="text" className="form-control" id="exampleFormControlInput1" name="month" placeholder="month" value={this.state.fname} onChange={this.handleChange} required />
                                    </div>
                                    <div className="form-group col-md-8">
                                        <input type="submit" name="submit" value="Submit" className="btn btn-info" />
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
