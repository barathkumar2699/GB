import React, { useContext,useState,useRef } from "react";
import { useHistory } from "react-router-dom";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import ItemContext from "../../context/item/ItemContext";
// import { Container,Button } from "react-floating-action-button";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Button,
} from "reactstrap";

const ItemList = ({ item, toggle }, ...props) => {
  const history = useHistory();
  const itemContext = useContext(ItemContext);
  const { getBatteryById, admin, deleteBattery, setCurrent,fetchComment } = itemContext;
  const { id, name, price, image } = item;
  const [copySuccess, setCopySuccess] = useState('');
  const textAreaRef = useRef(null);

  function copyToClipboard(e) {
    textAreaRef.current.select();
    document.execCommand('copy');
    e.target.focus();
    setCopySuccess('Copied!');
  };

  const onClick = () => {
    getBatteryById(id);
    fetchComment(id);
    
    history.push("/item/" + id);
    setTimeout(() => {
      //
    }, 100);
  };
  return (
    <div className="">
      {/* <Link to={`/item/${id}`} > */}
      <Card>
        <CardImg
          onClick={onClick}
          top
          width="100%"
          src={image}
          height="200"
          alt="Card image cap"
        />

        <CardBody className="text-center">
          <CardTitle>{name}</CardTitle>
          <CardText>{price}</CardText>

          {admin === true ? (
            <div>
              <Button
                onClick={() => {
                  deleteBattery(id);
                }}
              >
                <i className="fa fa-trash" aria-hidden="true"></i>
              </Button>{" "}
              <Button
                onClick={() => {
                  setCurrent(item);
                  toggle();
                }}
              >
                <i className="fa fa-edit" aria-hidden="true"></i>
              </Button>{" "}
            </div>
          ) : (
            <div>
              <Button onClick={onClick}>
                <i className="fa fa-info-circle" aria-hidden="true"></i>
              </Button>{" "}
              <Button
                className="btn "
                data-toggle="modal"
                data-target="#shareModal"
              >
                <i className="fa fa-share" aria-hidden="true"></i>
              </Button>
              {/* Modal */}
              <div
                className="modal fade bd-example-modal-sm"
                id="shareModal"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="exampleModalCenterTitle"
                aria-hidden="true"
              >
                <div
                  className="modal-dialog modal-sm modal-dialog-centered"
                  role="document"
                >
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLongTitle">
                        Share
                      </h5>
                      <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      <div className=" row">
                        <div className="col">
                          {" "}
                          <a
                            href="https://twitter.com/intent/tweet?text=Buy%20Battery%20at%20Guduvancherry%20Battery%0Avisit%20www.guduvancherrybattery.com"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <i className=" img-thumbnail fa fa-twitter fa-2x"></i>
                          </a>
                          <p>Twitter</p>
                        </div>
                        <div className="col">
                          {" "}
                          <a
                            href="https://www.facebook.com/sharer/sharer.php?u=www.google.com"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <i className=" img-thumbnail fa fa-facebook fa-2x"></i>
                          </a>
                          <p>Facebook</p>
                        </div>
                        <div className="col">
                          {" "}
                          <a
                            href="https://wa.me/?text=urlencodedtext"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <i className=" img-thumbnail fa fa-whatsapp fa-2x"></i>
                          </a>
                          <p>Whatsapp</p>
                        </div>
                      </div>
                    </div>
                    <div className="modal-footer">
                      <div >
                        <form onSubmit={(e)=>e.preventDefault()}>
                          <input
                            type="text" ref={textAreaRef} 
                            value="www.guduvancherrybatteries.com"
                            readOnly
                          />
                          <button onClick={copyToClipboard}>Copy</button> 
          {copySuccess}
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardBody>
      </Card>
      {/* </Link> */}
    </div>
  );
};

ItemList.propTypes = {
  itemContext: PropTypes.object,
};

export default withRouter(ItemList);
