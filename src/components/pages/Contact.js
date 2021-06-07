import React from "react";
// import {useHistory} from 'react-router-dom'
import {
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";
import { Link } from "react-router-dom";
import EnquiryForm from '../form/EnquiryForm'

const Contact = (props) => {
  
  return (
    <div className="container">
      <div className="row">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/">Home</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>Contact Us</BreadcrumbItem>
        </Breadcrumb>
        <div className="col-12">
          <h3>Contact Us</h3>
          <hr />
        </div>
      </div>

      <div className="row ">
        <div className="col-12">
          <h3>Location Information</h3>
        </div>
        <div className="col-12 col-sm-4 offset-sm-1">
          <h5>Our Address</h5>
          <address>
            #141, 2, Grand Southern Trunk Rd, <br />
            Srinivasapuram, Guduvanchery, <br />
            Tamil Nadu 603202 <br />
            <i className="fa fa-phone"></i>: + 072997 90416
            <br />
            <i className="fa fa-envelope"></i>:{" "}
            <a href="mailto:confusion@food.net">confusion@food.net</a>
          </address>
          <div className="btn-group" role="group">
            <a
              role="button"
              className="btn btn-primary"
              href="tel:+85212345678"
            >
              <i className="fa fa-phone"></i> Call
            </a>
            <a role="button" href="/" className="btn btn-info">
              <i className="fa fa-skype"></i> Skype
            </a>
            <a
              role="button"
              className="btn btn-success"
              href="mailto:confusion@food.net"
            >
              <i className="fa fa-envelope-o"></i> Email
            </a>
        
          </div>
          
        </div>

        <div className="col-12 col-sm-6 offset-sm-1">
          <h5>Map of our Location</h5>
          <div className="mapouter" >
            <div className="gmap_canvas">
              <iframe title="map"
                width="600"
                height="200"
                id="gmap_canvas"
                src="https://maps.google.com/maps?q=%23141%2C%202%2C%20Grand%20Southern%20Trunk%20Rd%2C%20Srinivasapuram%2C%20Guduvanchery%2C%20Tamil%20Nadu%20603202&t=&z=13&ie=UTF8&iwloc=&output=embed"
                frameBorder="0"
                scrolling="no"
                marginHeight="0"
                marginWidth="0"
              />
              
            </div>
          </div>
        </div>

      </div>
      <br />
      <h3>Enquiry Form</h3>
      <hr ></hr>
      <EnquiryForm />
    </div>
  );
};



export default Contact;
