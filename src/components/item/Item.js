import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import ItemContext from "../../context/item/ItemContext";
import Spinner from "../../components/layout/Spinner";
import { FadeTransform, Fade, Stagger } from "react-animation-components";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
  Button,
} from "reactstrap";
import { Link, useHistory } from "react-router-dom";

function RenderBattery({ dish, history, favorite, postFavorite }) {
  return (
    <div className="col-12 col-md-6 justify-items-center">
      <Card>
        <CardImg top src={dish.image} alt={dish.name} />

        <CardBody className="text-center">
          <CardTitle>{dish.name}</CardTitle>
          <CardText>
            {" "}
            <i className="fa fa-inr" aria-hidden="true">
              {dish.price} / piece
            </i>
          </CardText>
          <a role="button" className="btn btn-primary" href="tel:+85212345678">
            <i className="fa fa-phone"></i> Call Now
          </a>{" "}
          <Button
            className="btn btn-danger"
            onClick={() => {
              // console.log("hi");
              history.push("/enquiry");
            }}
          >
            <i className="fa fa-commenting mr-1" aria-hidden="true"></i>Get Best
            Price
          </Button>
        </CardBody>
      </Card>
    </div>
  );
}

function RenderDescriptiom({ description }) {
  // console.log(description);
  return (
    <div className="col-12 col-md-6 justify-items-center">
      <table className="table  table-bordered table-striped table-hover text-center">
        <thead>
          <tr>
            <th scope="row" colSpan="2">
              Product description
            </th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(description).map((key, index) => {
            return (
              <tr key={index}>
                <td>{key.charAt(0).toUpperCase() + key.slice(1)}</td>
                <td>{description[key]}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      Being the foremost names of the industry we are involved in providing an
      extensive range of {description.brand} {description.type} Batteries
    </div>
  );
}

function RenderComments({
  comments,
  dishId,
  admin,
  deleteComment,
  fetchComment,
}) {
  if (comments) {
    return (
      <div className="col-12 col-md-6 justify-items-center">
        <h4>Comments</h4>
        <ul className="list-unstyled">
          <Stagger in>
            {comments.map((comment) => {
              return (
                <Fade in key={comment.id}>
                  {/* <div className="card m-2 p-2" key={comment.id}> */}
                  <li>
                    <p>{comment.comment}</p>
                    <p>{comment.rating} stars</p>
                    <p>
                      -- {comment.author}{" "}
                      {new Intl.DateTimeFormat("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "2-digit",
                      }).format(new Date(Date.parse(comment.date)))}
                    </p>
                  </li>
                  {admin === true ? (
                    <div>
                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          deleteComment(comment.id);
                        }}
                      >
                        delete
                      </button>
                    </div>
                  ) : null}

                  {/* </div> */}
                </Fade>
              );
            })}
          </Stagger>
        </ul>
      </div>
    )
  } else {
    return <div>Something went wrong</div>;
  }
}

const CommentForm = ({ id, postComment }) => {
  const [comments, setComments] = useState({
    author: "",
    batteryId: id,
    comment: "",
    date: new Date().toISOString(),
    rating: "",
  });

  const onChange = (e) => {
    console.log(e.target);
    setComments({ ...comments, [e.target.name]: e.target.value });
  };

  const resetValue = () => {
    setComments({
      author: "",
      batteryId: "",
      comment: "",
      date: "",
      rating: "",
    });
  };
  const { author, comment, rating } = comments;
  const onSubmit = (e) => {
    e.preventDefault();
    if (comments.date === "" || rating === "" || author === "") {
      alert("Enter all fields");
      return;
    }
    console.log(comments);
    postComment(comments);
    resetValue();
  };

  return (
    <div className="col-12 col-md-6 justify-items-center">
      <h4>Comment Form</h4>
      <form onSubmit={onSubmit}>
        <div className="form-group row">
          <label htmlFor="author" className="col-sm-2 col-form-label">
            Name
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              value={author}
              onChange={onChange}
              className="form-control"
              name="author"
              placeholder="Name"
            />
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="rating" className="col-sm-2 col-form-label">
            Rating
          </label>
          <div className="col-sm-10">
            <select
              className="custom-select mr-sm-2"
              name="rating"
              defaultValue={"DEFAULT"}
              value={rating}
              onChange={onChange}
            >
              <option value="DEFAULT" selected>
                Choose a salutation ...
              </option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
              <option value="4">Four</option>
              <option value="5">Five</option>
            </select>
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="comment" className="col-sm-2 col-form-label">
            Comment
          </label>
          <div className="col-sm-10">
            <textarea
              value={comment}
              onChange={onChange}
              rows="10"
              className="form-control"
              name="comment"
              placeholder="comment"
            />
          </div>
        </div>
        <div className="row justify-content-center">
          <button type="submit" className="btn btn-success">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

const Item = (props) => {
  const itemContext = useContext(ItemContext);
  const history = useHistory();
  const {
    getBatteryById,
    battery,
    comments,
    fetchComment,
    admin,
    deleteComment,
    postComment,
  } = itemContext;
  useEffect(() => {
    // console.log(props)
    getBatteryById(props.match.params.id);
    //fetchComment(props.match.params.id);
    //eslint-disable-next-line
  }, []);

  // console.log("hi", battery);

  if (battery) {
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/item">Menu</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{battery.name}</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>{battery.name}</h3>
            <hr />
          </div>
        </div>

        <div className="row">
          <RenderBattery
            dish={battery}
            history={history}
            // favorite={props.favorite}
            // postFavorite={props.postFavorite}
          />
          <RenderDescriptiom
            description={battery.description}
            key={battery.id}
          />
        </div>
        <div className="row">
          <RenderComments
            comments={comments}
            dishId={props.match.params.id}
            admin={admin}
            deleteComment={deleteComment}
            fetchComment={fetchComment}
          />
          <CommentForm id={battery.id} postComment={postComment} />
        </div>
      </div>
    );
  }
  return (
    <div>
      Something went wrong please go back
      <Spinner />
    </div>
  );
};

Item.propTypes = {
  battery: PropTypes.object,
};

Item.defaultProps = {
  "dish.image": require("../../images/exide150ah.jpg"),
};

export default Item;
