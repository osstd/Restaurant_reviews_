import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Restaurants = () => {
  const PORT = 5000;
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchName, setSearchName] = useState("");
  const [searchZip, setSearchZip] = useState("");
  const [searchCuisine, setSearchCuisine] = useState("");
  const [cuisines, setCuisines] = useState(["All Cuisines"]);

  useEffect(() => {
    retrieveRestaurants();
    retrieveCuisines();
  }, []);

  //
  const onChangeSearchName = (e) => {
    const searchName = e.target.value;
    setSearchName(searchName);
  };

  const onChangeSearchZip = (e) => {
    const searchZip = e.target.value;
    setSearchZip(searchZip);
  };

  const onChangeSearchCuisine = (e) => {
    const searchCuisine = e.target.value;
    setSearchCuisine(searchCuisine);
  };
  //
  const retrieveRestaurants = () => {
    setLoading(true);
    axios
      .get(`http://localhost:${PORT}/`)
      .then((response) => {
        setRestaurants(response.data.restaurants);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };
  //
  const retrieveCuisines = () => {
    setLoading(true);
    axios
      .get(`http://localhost:${PORT}/cuisines`)
      .then((response) => {
        setCuisines((prevCuisines) => [...prevCuisines, ...response.data]);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };
  //
  const refreshList = () => {
    retrieveRestaurants();
  };
  //

  const findR = (query, by, page = 0) => {
    setLoading(true);
    axios
      .get(`http://localhost:${PORT}/?${by}=${query}&page=${page}`)
      .then((response) => {
        setRestaurants(response.data.restaurants);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };
  const findByName = () => {
    findR(searchName, "name");
  };

  const findByZip = () => {
    findR(searchZip, "zipcode");
  };

  const findByCuisine = () => {
    if (searchCuisine == "All Cuisines") {
      refreshList();
    } else {
      findR(searchCuisine, "cuisine");
    }
  };

  return (
    <div className="p-4">
      <div className="row pb-1">
        <div className="container ml-4">
          <div className="alert alert-info fixed-width-alert">
            <span>
              New York City restaurant reviews directory. Search for your
              restaurant by name or zipcode. Alternatively, select a cuisine
              from the dropdown menu.
            </span>
          </div>
        </div>
        <div className="input-group col-lg-4 py-1 fixed-width">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name"
            value={searchName}
            onChange={onChangeSearchName}
          />
          <div className="input-group-append px-2">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByName}
            >
              Search
            </button>
          </div>
        </div>
        <div className="input-group col-lg-4 py-1 fixed-width">
          <input
            type="text"
            className="form-control"
            placeholder="Search by zip"
            value={searchZip}
            onChange={onChangeSearchZip}
          />
          <div className="input-group-append px-2">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByZip}
            >
              Search
            </button>
          </div>
        </div>
        <div className="input-group col-lg-4 py-1">
          <select className="" onChange={onChangeSearchCuisine}>
            {cuisines.map((cuisine, index) => {
              return (
                <option key={index} value={cuisine}>
                  {cuisine.substring(0, 20)}
                </option>
              );
            })}
          </select>
          <div className="input-group-append px-2">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByCuisine}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="row">
        {restaurants.map((restaurant) => {
          const address = `${restaurant.address.building} ${restaurant.address.street}, ${restaurant.address.zipcode}`;
          return (
            <div key={restaurant._id} className="col-lg-4 pb-1">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{restaurant.name}</h5>
                  <p className="card-text">
                    <strong>Cuisine: </strong>
                    {restaurant.cuisine}
                    <br />
                    <strong>Address: </strong>
                    {address}
                  </p>
                  <div className="row">
                    <Link
                      to={"/restaurants/" + restaurant._id}
                      className="btn btn-primary col-lg-5 mx-1 mb-1"
                    >
                      View Reviews
                    </Link>
                    <a
                      target="_blank"
                      href={"https://www.google.com/maps/place/" + address}
                      className="btn btn-primary col-lg-5 mx-1 mb-1"
                    >
                      View Map
                    </a>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Restaurants;
