import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const AddReview = (props) => {
  const PORT = 5000;
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  let initialReviewState = "";

  let editing = false;
  const location = useLocation();

  if (location.state && location.state.currentReview) {
    editing = true;
    initialReviewState = location.state.currentReview.text;
  }

  const [review, setReview] = useState(initialReviewState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (event) => {
    setReview(event.target.value);
  };

  const saveReview = () => {
    var data = {
      text: review,
      name: props.user.name,
      user_id: props.user.id,
      restaurant_id: id,
    };
    if (editing) {
      data.review_id = location.state.currentReview._id;
      axios
        .put(`http://localhost:${PORT}/review`, data)
        .then((response) => {
          setSubmitted(true);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axios
        .post(`http://localhost:${PORT}/review`, data)
        .then((response) => {
          setSubmitted(true);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className="p-4">
      <div>
        {props.user ? (
          <div className="submit-form">
            {submitted ? (
              <div>
                <h4>You submitted successfully!</h4>
                <Link to={"/restaurants/" + id} className="btn btn-success">
                  Back to Restaurant
                </Link>
              </div>
            ) : (
              <div>
                <div className="form-group">
                  <label htmlFor="description">
                    {editing ? "Edit" : "Create"} Review
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="text"
                    required
                    value={review}
                    onChange={handleInputChange}
                    name="text"
                  />
                </div>
                <button onClick={saveReview} className="btn btn-success">
                  Submit
                </button>
              </div>
            )}
          </div>
        ) : (
          <div>Please log in.</div>
        )}
      </div>
    </div>
  );
};

export default AddReview;
