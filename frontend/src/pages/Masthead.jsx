import React from "react";

const Masthead = () => {
  const mastheadStyle = {
    backgroundImage:
      'url("https://static01.nyt.com/images/2015/06/28/travel/28SEINFELD1/28SEINFELD1-superJumbo.jpg")',
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    height: "375px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
  };
  return (
    <div className="masthead" style={mastheadStyle}>
      <div className="container text-center">
        <h1 className="display-4">New York City Restaurants</h1>
        <p className="lead">Find a restaurant or add a review!</p>
      </div>
    </div>
  );
};

export default Masthead;
