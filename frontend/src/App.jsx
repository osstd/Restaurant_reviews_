import React from "react";
import { Routes, Route, Link } from "react-router-dom";

import AddReview from "./pages/AddReview";
import Restaurant from "./pages/Restaurant";
import Restaurants from "./pages/RestaurantList";
import Login from "./pages/Login";
import Masthead from "./pages/Masthead";

const App = () => {
  const [user, setUser] = React.useState(null);

  async function login(user = null) {
    setUser(user);
  }

  async function logout() {
    setUser(null);
  }

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <span className="navbar-brand">Restaurant Reviews</span>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/"} className="nav-link">
              Restaurants
            </Link>
          </li>
          <li className="nav-item">
            {user ? (
              <a
                onClick={logout}
                className="nav-link"
                style={{ cursor: "pointer" }}
              >
                Logout {user.name}
              </a>
            ) : (
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            )}
          </li>
        </div>
      </nav>
      <div>
        <Masthead />
      </div>
      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<Restaurants />} />
          <Route path="/restaurants/:id" element={<Restaurant user={user} />} />
          <Route
            path="/restaurants/:id/review"
            element={<AddReview user={user} />}
          />
          <Route path="/login" element={<Login login={login} />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
