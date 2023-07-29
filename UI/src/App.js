import React, { useState } from "react";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import axios from "axios";

const BackendURL = "http://localhost:3001";

function App() {
  const [cardDetails, setCardDetails] = useState({
    cvc: "",
    expiry: "",
    focus: "",
    name: "",
    number: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  function handleCardDetailsChange(newValue) {
    setError(null);
    setSuccess(null)
    setCardDetails((prev) => {
      return {
        ...prev,
        ...newValue,
      };
    });
  }

  function onInputFocus(e) {
    handleCardDetailsChange({ focus: e.target.name });
  }

  function onInputUpdate(e) {
    const { name, value } = e.target;
    handleCardDetailsChange({ [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.post(`${BackendURL}/validateCreditCard`, {
        data: { creditCardNumber: cardDetails.number },
      });
      response?.data?.success
        ? setSuccess("Your details are verified.")
        : setError("Please enter a valid card number");
    } catch (err) {
      console.log(err);
      setError(err?.message);
    }
  }

  return (
    <div className="p-5">
      <div id="PaymentForm">
        <Cards
          cvc={cardDetails.cvc}
          expiry={cardDetails.expiry}
          focused={cardDetails.focus}
          name={cardDetails.name}
          number={cardDetails.number}
        />
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3 mt-4">
            {error && (
              <div className="alert alert-danger mt-3" role="alert">
                {error}
              </div>
            )}
            <input
              type="tel"
              name="number"
              className="form-control"
              placeholder="Card Number"
              required
              onChange={onInputUpdate}
              onFocus={onInputFocus}
            />
          </div>
          <div className="form-group mb-3">
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Name"
              required
              onChange={onInputUpdate}
              onFocus={onInputFocus}
            />
          </div>
          <div className="row mb-3">
            <div className="col-6">
              <input
                type="tel"
                name="expiry"
                className="form-control"
                placeholder="Valid Thru"
                pattern="\d\d/\d\d"
                required
                onChange={onInputUpdate}
                onFocus={onInputFocus}
              />
            </div>
            <div className="col-6">
              <input
                type="tel"
                name="cvc"
                className="form-control"
                placeholder="CVC"
                pattern="\d{3,4}"
                required
                onChange={onInputUpdate}
                onFocus={onInputFocus}
              />
            </div>
          </div>
          <div className="d-grid">
            <button className="btn btn-dark">Confirm</button>
          </div>
        </form>
        {success && (
          <div class="alert alert-success mt-3" role="alert">
            {success}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
