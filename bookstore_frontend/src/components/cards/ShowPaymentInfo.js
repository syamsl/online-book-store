import React from "react";

const ShowPaymentInfo = ({ order, showStatus = true }) => {
  return (
    <div>
      <div>
        <span>
          Order Id:{"  "} {order.paymentIntent.id}
        </span>
        {"   /   "}
        <span>
          Amount:{"  "}
          {order.paymentIntent.amount.toLocaleString("en-US", {
            style: "currency",
            currency: "inr",
          })}
        </span>
        {"  /  "}
        <span>Currency: {order.paymentIntent.currency.toUpperCase()}</span>
        {"/"}
        <span>Method: {order.paymentIntent.payment_method_types[0]}</span>
        {"  /   "}

        <span>
          Payment: {order.paymentIntent.payment_method_types[0].toUpperCase()}
        </span>
        {"   /   "}
        <span>
          <br />
          Ordered on:{"  "}{" "}
          {new Date(order.paymentIntent.created * 1000).toLocaleString()}
        </span>
        <br />
        {/* {showStatus && order.orderStatus=="Cancelled" (
          <span className="badge bg-danger text-white">
            STATUS: {order.orderStatus}
          </span>
        )} */}
        {order.orderStatus === "Cancelled" && (
          <span className="badge bg-danger p-2  text-white">
            STATUS: {order.orderStatus}
          </span>
        )}
        {order.orderStatus === "Not Processed" && (
          <span className="badge bg-primary p-2  text-white">
            STATUS: {order.orderStatus}
          </span>
        )}
        {order.orderStatus === "Cash On Delivery" && (
          <span className="badge bg-warning p-2  text-white">
            STATUS: {order.orderStatus}
          </span>
        )}
        {order.orderStatus === "Processing" && (
          <span className="badge bg-info p-2  text-white">
            STATUS: {order.orderStatus}
          </span>
        )}
        {order.orderStatus === "Dispatched" && (
          <span className="badge bg-secondary p-2 text-white">
            STATUS: {order.orderStatus}
          </span>
        )}
        {order.orderStatus === "Completed" && (
          <span className="badge bg-success p-2 text-white">
            STATUS: {order.orderStatus}
          </span>
        )}
        {"   "}
      </div>
    </div>
  );
};

export default ShowPaymentInfo;
