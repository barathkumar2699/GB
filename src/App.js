import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Contact from "./components/pages/Contact";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Footer from "./components/layout/Footer";
import Items from "./components/item/Items";
import Item from './components/item/Item'
import Admin from './components/admin/Admin'
import EnquiryForm from './components/form/EnquiryForm'

import ItemState from "./context/item/ItemState";
import "./App.css";

const App = () => {
  return (
    <div>
      <ItemState>
        <Router>
          <Fragment>
            <Navbar />
            <div className="container">
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/contact" component={Contact} />
                <Route exact path="/item" component={Items} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/item/:id" component={Item} />
                <Route exact path="/admin" component={Admin} />
                <Route exact path="/enquiry" component={EnquiryForm} />
              </Switch>
            </div>
            <Footer />
          </Fragment>
        </Router>
      </ItemState>
    </div>
  );
};

export default App;
