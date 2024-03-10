import axios from "axios";
export const createPaypalIntent = (authtoken, coupon) =>
  axios.post(
    `${process.env.REACT_APP_API}/create-paypal-intent`,
    {couponApplied:coupon},
    {
      headers: {
        authtoken,
      },
    }
  );
