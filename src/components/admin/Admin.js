import React, {  useContext, useEffect } from "react";
import ItemContext from "../../context/item/ItemContext";
import {
  Card,
  CardText,
  CardBody,
  CardTitle,
  Button,
} from "reactstrap";
import PropTypes from "prop-types";

function RenderEnquiry({ enquiry,deleteEnquiry }) {
  return (
    <div className=" container col m-1">
      <Card style={{backgroundColor:"#DCEAB2"}}>
        <CardBody>
  <CardTitle><h4>{enquiry.subject}</h4></CardTitle>
      <h6>
          Name :{enquiry.name}
      </h6>
  <div className="row">
    <div className="col-4">
        Email: {' '}
        {enquiry.email}
    </div>
    <div className="col-4">
        Phone:{' '}
        {enquiry.phone}
    </div>
    <div className="col-4">

          <Button className="btn btn-danger" onClick={()=>{deleteEnquiry(enquiry.id)}}>Delete</Button>
    </div>
  </div>
  Message: <br></br>
          <CardText>{enquiry.message}</CardText>
        </CardBody>
      </Card>
    </div>
  );
}
const Admin = (props) => {
  const itemContext = useContext(ItemContext);
  const { deleteEnquiry, fetchEnquiry, enquiry } = itemContext;
  useEffect(() => {
    fetchEnquiry();
    //eslint-disable-next-line
  }, []);
  if (!enquiry) {
    return <div>No Enquires Please check after some time</div>;
  }
  return (
    <div>
      {enquiry.map((enq) => (
        <div className="row ">
          <RenderEnquiry enquiry={enq} deleteEnquiry={deleteEnquiry} />
        </div>
      ))}
    </div>
  );
};

RenderEnquiry.propTypes = {
  enquiry:PropTypes.object,
};

export default Admin;
