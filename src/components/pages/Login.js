import React, { useState,useContext } from "react";
import PropTypes from "prop-types";
import ItemContext from "../../context/item/ItemContext";

const Login = (props) => {
  const [login, setLogin] = useState({
    username: "",
    password: "",
  });
  const { username, password } = login;
  const itemContext=useContext(ItemContext)
  const {adminLogin}=itemContext;
  const onChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    e.persist()
    console.log(login)
    adminLogin(login)
  };
  return (
    <div className="container ">
      <form className="form" onSubmit={onSubmit}>
        <table className="table table-center">
          <tbody>
            <tr>
              <td>Username: </td>
              <td>
                <input
                  type="text"
                  name="username"
                  value={username}
                  onChange={onChange}
                />
              </td>
            </tr>
            <tr>
              <td>Password: </td>
              <td>
                <input
                  type="text"
                  name="password"
                  value={password}
                  onChange={onChange}
                />
              </td>
            </tr>
            <tr>
                <td >
                    <input type="submit" className="btn btn-success " value="login" />
                </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
};

Login.propTypes = {
  login:PropTypes.object,
};

export default Login;
