import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const navigate = useNavigate();
  const initialUserState = {
    name: "",
    id: "",
  };

  const [user, setUser] = useState(initialUserState);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const login = () => {
    props.login(user);
    navigate("/");
  };
  return (
    <div>
      <div className="submit-form mb-2 px-3">
        <div>
          <div className="form-group fixed-width py-1">
            <label htmlFor="user">Username</label>
            <input
              type="text"
              className="form-control"
              id="name"
              required
              value={user.name}
              onChange={handleInputChange}
              name="name"
            />
          </div>

          <div className="form-group fixed-width py-1">
            <label htmlFor="id">ID</label>
            <input
              type="text"
              className="form-control"
              id="id"
              required
              value={user.id}
              onChange={handleInputChange}
              name="id"
            />
          </div>

          <button onClick={login} className="btn btn-success">
            Login
          </button>
        </div>
      </div>
      <div className="container py-1">
        <div className="alert alert-info fixed-width-alert">
          <span>
            Type a unique ID. This is not a log-in ID but rather a review ID. So
            that you are able to edit and delete your reviews.
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
