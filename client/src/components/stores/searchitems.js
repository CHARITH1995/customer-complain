import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './searchitems.css';
class Searchitems extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchfield: '',
            results: [],
            isempty:false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e) {
        var authToken = localStorage.token;
        e.preventDefault();
        const search = {
            searchfield: this.state.searchfield
        }
        console.log(search)
        fetch("http://localhost:4000/stores/search", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer' + authToken
            },
            body: JSON.stringify(search)
        }).then(res => res.json())
            .then(data => {
                console.log(data.success)
                if(data.success){
                    this.setState({
                        isempty:false,
                        results: data.items
                    })
                }else{
                    if(!data.success){
                        this.setState({
                            isempty:true
                        })
                    }
                }
            })
    }
    handleChange(e) {
        let target = e.target;
        let value = target.type === 'checkbox' ? target.checked : target.value
        let name = target.name;
        this.setState({
            [name]: value,
            results:[],
            isempty:false
        });
    }

    render() {
        if (localStorage.token) {
        return (
            <div className="searchbar">
                <h2>Filterable List</h2>
                <input className="form-control" id="myInput" type="text" placeholder="Search.." name="searchfield" value={this.state.searchfield} onChange={this.handleChange} required />
                <div className="searchbutton">
                    <input className="btn btn-sm btn-info" value="search" id="myInput" type="submit" onClick={this.handleSubmit} />
                </div>
                {
                    this.state.isempty ? (
                        <div><h2 className="alert bg-danger">No Result found</h2></div>
                    ):(
                        this.state.results.map(result =>
                            <div >
                                <h2>Search Results here</h2>
                                <ul class="list-group" id="myList">
                                <a className="list-group-item">id : <Link to={"/viewitem/"+result._id}><span>{result._id}</span></Link> Item type :  {result.item}</a>
                                </ul>
                            </div>
                    )
                )
                }
                
            </div>

        );
    }

    }
}



export default Searchitems;
