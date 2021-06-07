import React, { Fragment, useContext ,useEffect} from "react";
import {Link} from 'react-router-dom';
import ItemContext from "../../context/item/ItemContext";
import {Button} from 'reactstrap'


const Navbar = (props) => {
  const itemContext=useContext(ItemContext)
  const {admin,logout,getLoginStatus,getAllBatteries}=itemContext
  useEffect(()=>{
getLoginStatus()
getAllBatteries()

//eslint-disable-next-line
  },[])
  return (
    <Fragment>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="/">
            <img src={require('./logo.jpg')} height="40" width="30" alt="jsx-a11y/img-redundant-alt" /> 
          Guduvancherry Batterries
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto ">
            <li className="nav-item  " >
            <Link to="/" className="nav-link">
            <i className="fa fa-home" aria-hidden="true"></i> {' '}
                Home <span className="sr-only"></span>
              </Link>
            </li>
            <li className="nav-item ">
            <Link to="/item" className="nav-link">
            <i className="fa fa-shopping-cart" aria-hidden="true"></i>{' '}
                Item <span className="sr-only"></span>
              </Link>
            </li>
            <li className="nav-item ">
              <Link to="/contact" className="nav-link">
              <i className="fa fa-phone-square" aria-hidden="true"></i>{' '}
                Contact Us <span className="sr-only"></span>
              </Link>
            </li>
            
            {admin===true?(<div>
              <li className="nav-item ">
              <Link to="/admin" className="nav-link">
              <i className="fa fa-phone-square" aria-hidden="true"></i>{' '}
               Admin <span className="sr-only"></span>
              </Link>
            </li>
            </div>):null}
          </ul>
          {admin===true?(<div>
            <div className="d-flex justify-content-lg-start ">
          <Button onClick={() => {
            logout()
          }} >
          <i className="fa fa-sign-in" aria-hidden="true"></i>{' '}
          Logout
          </Button>
          </div>
            </div>
            ):(

        <div className="d-flex justify-content-lg-start ">
          <Link  to="/login">
          <i className="fa fa-sign-in" aria-hidden="true"></i>{' '}
          Login
          </Link>
          </div>
            )}
        </div>
      </nav>
    </Fragment>
  );
};


export default Navbar;
