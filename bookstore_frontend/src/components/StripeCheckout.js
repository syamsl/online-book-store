import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useSelector, useDispatch } from "react-redux";
import { createPaymentIntent } from "../functions/stripe";
import { Link } from "react-router-dom";
import { createOrder, emptyUserCart } from "../functions/user";

import { Card, Alert } from "antd";
import { DollarOutlined, CheckOutlined } from "@ant-design/icons";
import Laptop from "../images/laptop.png";

const  StripeCheckout = ({ history }) => {
  const dispatch = useDispatch();
  const { user, coupon, deliverAddress } = useSelector((state) => ({ ...state }));

  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");
  const [cartTotal, setCartTotal] = useState(0);
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  const [payable, setPayable] = useState(0);

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {

    createPaymentIntent(user.token, coupon).then((res) => {
      // console.log("Create payment from backend RES--->", res.data);
      setClientSecret(res.data.clientSecret);
      //additional response recieved on successful payment
      setCartTotal(res.data.cartTotal);
      setTotalAfterDiscount(res.data.totalAfterDiscount);
      setPayable(res.data.payable);

    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: e.target.name.value,
        },
      },
    });

    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      //here you get result after successful payment

      //create order and save in database for admin to process
      createOrder(payload, user.token,deliverAddress).then((res) => {

        if (res.data.ok) {
          //empty cart from local Storage
          if (typeof window !== "undefined") localStorage.removeItem("cart");

          // console.log("CART DELETED--->AT LOCAL STR FRONT")
          //empty cart from redux

          dispatch({
            type:"ADD_TO_CART",
            payload: [],
          });

          dispatch({
            type:"COUPON_APPLIED",
            payload: false,
          });

          // console.log("CART DELETED--->AT REDUX")
          //empty card from database

          emptyUserCart(user.token);
          // console.log("CART DELETED--->FROM DATABASE FRONT")
        }
      });
      //empty user cart from redux store and local storage
      // console.log(JSON.stringify(payload, null, 4));

      setError(null);
      setProcessing(false);
      setSucceeded(true);
    }
  };

  const handleChange = async (e) => {
    //listen for changes in the card element
    //and display any errors as the customer types their card details
    setDisabled(e.empty); //disable pay button if errors
    setError(e.error ? e.error.message : ""); // show error message
  };

  const cartStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  return (
    <>
      {!succeeded && (
        <div>
          {coupon && totalAfterDiscount !== undefined ? (
            <Alert
              description={`Total after discount: ${totalAfterDiscount}`}
              type="success"
              showIcon
            />
          ) : (

            // <p className="alert alert-success">{`Total after discount: ${totalAfterDiscount}`}</p>

            <Alert message="No Coupon Applied" type="error" showIcon />
          )}
        </div>
      )}

      <div className="text-center pb-5">
        <Card
          cover={
            <img
              src={Laptop}
              style={{
                height: "200px",
                objectFit: "contain",
                marginbottom: "-50px",
              }}
            />
          }
          actions={[
            <>
              <DollarOutlined className="text-info" />
              <br /> <b>Total: ₹ {cartTotal}</b>
            </>,
            <>
              <CheckOutlined className="text-success" />
              <br /> <b>Total payable: ₹ {(payable / 100).toFixed(2)}</b>
            </>,
          ]}
        />
      </div>

      <form id="payment-form" className="stripe-form" onSubmit={handleSubmit}>
        <CardElement
          id="card-element"
          options={cartStyle}
          onChange={handleChange}
        />
        <button
          className="stripe-button"
          disabled={processing || disabled || succeeded}
        >
          <span id="button-text">
            {processing ? (
              <div className="spinner" id="spinner"></div>
            ) : (
              <b>Pay</b>
            )}
          </span>
        </button>
        <br />
        {error && (
          <div className="card-error" role="alert">
            {error}
          </div>
        )}
        <br />
        <p className={succeeded ? "result-message" : "result-message hidden"}>
          Payment Successful.
          <Link to="/user/history"> See Purchase History</Link>
        </p>
      </form>
    </>
  );
};

export default StripeCheckout;
