import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Home from './components/Home';
import Complains from './components/complain/Complains';
import Complainview from './components/complain/complainview';
import SignInForm from './components/SignInForm';
import Subarea from './components/complain/subarea';
import Status from './components/complain/status';
import Register from './components/registerids/register';
import Customerids from './components/registerids/customerids';
import Employeeids from './components/registerids/employeeids';
import Viewcustomers from './components/registerids/showcustomers';
import ViewEmployees from './components/registerids/showallemployess';//Updatecustomer
import Updatecustomer from './components/registerids/updatecustomer';//Updatecustomer
import Updateemployee from './components/registerids/employeeupdate';//Updatecustomer
import Reports from './components/reports/reports';
import Stores from './components/stores/stores';
import Viewbyitems from './components/stores/item';
import Onlinestore from './components/stores/onlinestore';
import viewitem from './components/stores/viewitem';
import Edititem from './components/stores/edititem';
import Forgetpwd from './components/profile/forgetpassword';
import Editpassword from './components/profile/editpassword';
import Datewise from './components/reports/manualreports/datewise';
import Adminprofile from './components/profile/adminprofile';
import Areawise from './components/reports/manualreports/areawise';
import Itemtypes from './components/itemtypes/itemtypes';
import Storedata from './components/reports/listview';
import Stock from './components/Stock/stock';
import Stockview from './components/Stock/stockview';
import Edit from './components/Stock/edit'; 
import View from './components/Stock/view';
import Purchview from './components/purchases/view';
import Purchases from './components/purchases/show';
import Error from './components/error';
import socketIOClient from "socket.io-client";
class App extends Component {
  constructor() {
    super();
    this.state = {
      response: false,
      endpoint: "http://localhost:4000"
    };
  }
  componentDidMount() {
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    socket.on("FromAPI");
  }
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={SignInForm} />
            <Route path="/passwordreset" component={Forgetpwd} />
          <Route path="/manualreports/:year/:month" component={Datewise} />
          </Switch>
          <Switch>
            {(localStorage.token) ? <Route path="/Home" component={Home} /> : null}
            <Route path="/Error" component={Error} />
            <Redirect from="/Home" to="/Error" />
          </Switch>
          <Switch>
            {(localStorage.token) ? <Route path="/editprofile" component={Adminprofile} /> : null} 
            <Route path="/Error" component={Error} />
            <Redirect from="/editprofile/:token" to="/Error" />
          </Switch>
          <Switch>
            {(localStorage.token) ? <Route path="/Complain" component={Complains} /> : null}
            <Route path="/Error" component={Error} />
            <Redirect from="/Complain" to="/Error" />
          </Switch>
          <Switch>
            {(localStorage.token) ? <Route path="/Complainview/:id" component={Complainview} /> : null}
            <Route path="/Error" component={Error} />
            <Redirect from="/Complainview/:id" to="/Error" />
          </Switch>
          <Switch>
            {(localStorage.token) ? <Route path="/Subarea/:subarea" component={Subarea} /> : null}
            <Route path="/Error" component={Error} />
            <Redirect from="/Subarea/:subarea" to="/Error" />
          </Switch>
          <Switch>
            {(localStorage.token) ? <Route path="/Status/:status/:subarea" component={Status} /> : null}
            <Route path="/Error" component={Error} />
            <Redirect from="/Status/:status/:subarea" to="/Error" />
          </Switch>
          <Switch>
            {(localStorage.token) ? <Route path="/registerIds" component={Register} /> : null}
            <Route path="/Error" component={Error} />
            <Redirect from="/registerIds" to="/Error" />
          </Switch>
          <Switch>
            {(localStorage.token) ? <Route path="/customerids" component={Customerids} /> : null}
            <Route path="/Error" component={Error} />
            <Redirect from="/customerids" to="/Error" />
          </Switch>
          <Switch>
            {(localStorage.token) ? <Route path="/showcustomer" component={Viewcustomers} /> : null}
            <Route path="/Error" component={Error} />
            <Redirect from="/showcustomer" to="/Error" />
          </Switch>
          <Switch>
            {(localStorage.token) ? <Route path="/showemployees" component={ViewEmployees} /> : null}
            <Route path="/Error" component={Error} />
            <Redirect from="/showemployees" to="/Error" />
          </Switch>
          <Switch>
            {(localStorage.token) ? <Route path="/purchaseview" component={Purchases} /> : null}
            <Route path="/Error" component={Error} />
            <Redirect from="/purchaseview" to="/Error" />
          </Switch>
          <Switch>
            {(localStorage.token) ? <Route path="/updatecustomer/:id" component={Updatecustomer} /> : null}
            <Route path="/Error" component={Error} />
            <Redirect from="/updatecustomer/:id" to="/Error" />
          </Switch>
          <Switch>
            {(localStorage.token) ? <Route path="/updateemployee/:id" component={Updateemployee} /> : null}
            <Route path="/Error" component={Error} />
            <Redirect from="/updateemployee/:id" to="/Error" />
          </Switch>
          <Switch>
            {(localStorage.token) ? <Route path="/employeeids" component={Employeeids} /> : null}
            <Route path="/Error" component={Error} />
            <Redirect from="/employeeids" to="/Error" />
          </Switch>
          <Switch>
            {(localStorage.token) ? <Route path="/reports" component={Reports} /> : null}
            <Route path="/Error" component={Error} />
            <Redirect from="/reports" to="/Error" />
          </Switch>
          <Switch>
            {(localStorage.token) ? <Route path="/addstores" component={Stores} /> : null}
            <Route path="/Error" component={Error} />
            <Redirect from="/addstores" to="/Error" />
          </Switch>
          <Switch>
            {(localStorage.token) ? <Route path="/onlinestore" component={Onlinestore} /> : null}
            <Route path="/Error" component={Error} />
            <Redirect from="/onlinestore" to="/Error" />
          </Switch>
          <Switch>
            {(localStorage.token) ? <Route path="/show/:item" component={Viewbyitems} /> : null}
            <Route path="/Error" component={Error} />
            <Redirect from="/show/:item" to="/Error" />
          </Switch>
          <Switch>
            {(localStorage.token) ? <Route path="/edititem/:id" component={Edititem} /> : null}
            <Route path="/Error" component={Error} />
            <Redirect from="/edititem/:serialnumber" to="/Error" />
          </Switch>
          <Switch>
            {(localStorage.token) ? <Route path="/viewitem/:id" component={viewitem} /> : null}
            <Route path="/Error" component={Error} />
            <Redirect from="/viewitem/:id" to="/Error" />
          </Switch>
          <Switch>
            {(localStorage.token) ? <Route path="/manualsoldreports/:subarea" component={Areawise} /> : null}
            <Route path="/Error" component={Error} />
            <Redirect from="/manualreports/:subarea" to="/Error" />
          </Switch>
          <Switch>
            {(localStorage.token) ? <Route path="/itemstypes" component={Itemtypes} /> : null}
            <Route path="/Error" component={Error} />
            <Redirect from="/itemstypes" to="/Error" />
          </Switch>
          <Switch>
            {(localStorage.token) ? <Route path="/storedata" component={Storedata} /> : null}
            <Route path="/Error" component={Error} />
            <Redirect from="/storedata" to="/Error" />
          </Switch>
          <Switch>
            {(localStorage.token) ? <Route path="/stock" component={Stock} /> : null}
            <Route path="/Error" component={Error} />
            <Redirect from="/stock" to="/Error" />
          </Switch>
          <Switch>
            {(localStorage.token) ? <Route path="/stockview" component={Stockview} /> : null}
            <Route path="/Error" component={Error} />
            <Redirect from="/stockview" to="/Error" />
          </Switch>
          <Switch>
            {(localStorage.token) ? <Route path="/view/:id" component={View} /> : null}
            <Route path="/Error" component={Error} />
            <Redirect from="/view/:id" to="/Error" />
          </Switch>
          <Switch>
            {(localStorage.token) ? <Route path="/editstockitem/:id" component={Edit} /> : null}
            <Route path="/Error" component={Error} />
            <Redirect from="/editstockitem/:id" to="/Error" />
          </Switch>
          <Switch>
            {(localStorage.token) ?<Route path="/purchview/:id" component={Purchview} /> : null}
            <Route path="/Error" component={Error} />
            <Redirect from="/purchview/:id" to="/Error" />
          </Switch>
          <Route path="/editpassword/:id/:password" component={Editpassword} />
        </div>

      </Router>
    );
  }
}

export default App;
