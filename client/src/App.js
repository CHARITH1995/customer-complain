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
import Reports from './components/reports/reports';
import Stores from './components/stores/stores';
import Onlinestore from './components/stores/onlinestore';
import viewitem from './components/stores/viewitem';
import Edititem from './components/stores/edititem';
import Forgetpwd from './components/profile/forgetpassword';
import Editpassword from './components/profile/editpassword';
import Datewise from './components/reports/manualreports/datewise';
import Adminprofile from './components/profile/adminprofile';
import Areawise from './components/reports/manualreports/areawise';
import Error from './components/error';
//editprofile/"+localStorage.token Adminprofile
class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={SignInForm} />
            <Route path="/passwordreset" component={Forgetpwd} />
          </Switch>
          <Switch>
            {(localStorage.token) ? <Route path="/Home" component={Home} /> : null}
            <Route path="/Error" component={Error} />
            <Redirect from="/Home" to="/Error" />
          </Switch>
          <Switch>
            {(localStorage.token) ? <Route path="/editprofile/:token" component={Adminprofile} /> : null} 
            <Route path="/Error" component={Error} />
            <Redirect from="/editprofile/:token" to="/Error" />
          </Switch>
          <Switch>
            {(localStorage.token) ? <Route path="/editpassword/:id/:password" component={Editpassword} /> : null}
            <Route path="/Error" component={Error} />
            <Redirect from="editpassword/:password" to="/Error" />
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
            {(localStorage.token) ? <Route path="/manualreports/:year/:month" component={Datewise} /> : null}
            <Route path="/Error" component={Error} />
            <Redirect from="/manualreports/:year/:month" to="/Error" />
          </Switch>
          <Switch>
            {(localStorage.token) ? <Route path="/manualsoldreports/:subarea" component={Areawise} /> : null}
            <Route path="/Error" component={Error} />
            <Redirect from="/manualreports/:subarea" to="/Error" />
          </Switch>
        </div>

      </Router>
    );
  }
}

export default App;
