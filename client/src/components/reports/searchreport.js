import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './searchreport.css';


class Searchreport extends Component {
    constructor(props) {
        super(props);
        this.state = {
            month: 0,
            year: 0,
            subarea: ''
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
            <div>
                <footer class="footer slideanim">
                    <div className="container bottom_border">
                        <div className="rows">
                            <div className="col-md-6" >
                                <h3 className="headin5_amrc col_white_amrc pt2">Check Store Details</h3>
                                <ul className="footer_ul_amrc">
                                     <li><a href="/storedata">Store details</a></li>
                               </ul>
                            </div>
                            <div className=" col-sm-6">
                                <h3 className="headin5_amrc col_white_amrc pt2">Area complains</h3>
                                    <form>
                                        <div className="form-group col-md-4">
                                            <label htmlFor="exampleFormControlInput1">Sub Area :</label>
                                            <select className="form-control" id="exampleFormControlSelect1" name="subarea" value={this.state.subarea} onChange={this.handleChange} required>
                                                <option >--Select Sub-Area--</option>
                                                <option value="kandy">Kandy</option>
                                                <option value="galle">Galle</option>
                                                <option value="gampaha">Gampaha</option>
                                                <option value="colombo">Colombo</option>
                                            </select>
                                        </div>
                                        <div className="buttonv">
                                        <div className="col-md-2 buttonview">
                                            <Link to={"/manualsoldreports/" + this.state.subarea} className="btn btn-info">Search</Link>
                                        </div>
                                        </div>
                                    </form>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        );

    }
}



export default Searchreport;
