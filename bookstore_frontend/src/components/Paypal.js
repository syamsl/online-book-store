import React, { useState, useEffect } from 'react';
import { PayPalButton } from "react-paypal-button-v2";
import { useSelector, useDispatch } from "react-redux";
import {
  emptyUserCart,
  createPaypalOrderForUser,
} from "../functions/user";
import { createPaypalIntent } from "../functions/paypal";
import { toast } from "react-toastify";
import { useHistory } from 'react-router-dom';


const Paypal = ({ couponTrueOrFalse }) => {

  let history = useHistory();

  const dispatch = useDispatch();
  const { user, coupon, deliverAddress } = useSelector((state) => ({ ...state }));

  const [cartTotal, setCartTotal] = useState("");
  const [totalAfterDiscount, setTotalAfterDiscount] = useState("");
  const [payable, setPayable] = useState("")

  useEffect(() => {
    createPaypalIntent(user.token, coupon)
      .then((res) => {
        // console.log("RES PAYPAL--->", res)
        // setCartTotal(res.data.cartTotal)
        setTotalAfterDiscount(res.data.totalAfterDiscount)
        setPayable(Math.floor(res.data.payable * 0.013))
      })
      .catch((err) => {
        // console.log("ERR INTENT--->", err)
      })
  }, [])

  // const _redirect = () => {
  //   setTimeout(() => {
  //     history.push("/user/history");
  //   }, 1000);
  // }

  return (
    <PayPalButton
      options={{
        clientId: "AYQExkEE0jy9PYpgBVX64Hn0gfm-dqt6hOLF7BvfypYRAouGGgFu4iuAIMlDzIjE32zqOWv4u8-yHTz0",
        currency: "USD"
      }}

      amount={payable}
      // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
      onSuccess={(details, data) => {
        toast.success("Payment Successful transaction completed by" + details.payer.name.given_name)
        // alert("Transaction completed by " + details.payer.name.given_name);

        // console.log(details, data)

        let paymentId = data.orderID;
        // console.log(data.orderID);

        createPaypalOrderForUser(user.token, paymentId, couponTrueOrFalse, deliverAddress).then((res) => {
          // console.log("USER PAYPAL CREATED--->", res);
          //emptycart from redux, localStorage, reset coupon, reset COD, redirect
          if (res.data.ok) {
            //empty local Storage
            if (typeof window !== "undefined") localStorage.removeItem("cart");

            //empty redux cart

            dispatch({
              type: "ADD_TO_CART",
              payload: [],
            });

            //empty redux coupon

            dispatch({
              type: "COUPON_APPLIED",
              payload: false,
            });

            // console.log("DELIVERY_ADD--->", deliverAddress)

            //empty delivery address
            // dispatch({
            //   type:"DELIVERY_ADD",
            //   payload:{},
            // });

            //empty redux COD
            // dispatch({
            //   type: "COD",
            //   payload: false,
            // });

            //empty cart from backend

            emptyUserCart(user.token);

            //redirect
            setTimeout(() => {
              history.push("/user/history");
            }, 1000);

            // _redirect()
          }
        })
          .catch((err) => {
            // console.log("ERR PAYPAL ORDER--->", err)
          })


        // OPTIONAL: Call your server to save the transaction
        // return fetch("/paypal-transaction-complete", {
        //   method: "post",
        //   body: JSON.stringify({
        //     orderID: data.orderID
        //   })
        // });
      }}
    />
  );
}

export default Paypal;