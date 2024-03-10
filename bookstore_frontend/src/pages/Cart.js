import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import ProductCardInCheckout from "../components/cards/ProductCardInCheckout";
import { userCart } from "../functions/user";

const Cart = ({ history }) => {
  const { cart, user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const getTotal = () => {  
    // if offerPrice exist in cart then use offerPrice else use price
    return cart.reduce((acc, item) => {
      return acc + (item.offerPrice ? item.offerPrice : item.price) * item.count;
    }, 0);
    // if(cart.offer){
    //   return cart.reduce((currentValue, nextValue) => {
    //     return currentValue + nextValue.count * nextValue.offerPrice;
    //   }, 0);
    // }else{
    //   return cart.reduce((currentValue, nextValue) => {
    //     return currentValue + nextValue.count * nextValue.price;
    //   }, 0);
    // }
   
  };

  const saveOrderToDb = () => {
    // console.log("cart", JSON.stringify(cart, null, 4));
    userCart(cart, user.token)
      .then((res) => {
        // console.log("CART POST RES==>", res);
        if (res.data.ok) history.push("/checkout");
      })
      .catch((err) => console.log("cart save err==>", err));
  };

  const showCartItems = () => (
    <table className="table table-bordered">
      <thead className="thead-light">
        <tr>
          <th className="text-center" scope="col">
            Image
          </th>
          <th className="text-center" scope="col">
            Title
          </th>
          <th className="text-center" scope="col">
            Price
          </th>
          <th className="text-center" scope="col">
            Brand
          </th>
          {/* <th className="text-center" scope="col">
            Color
          </th> */}
          <th className="text-center" scope="col">
            Author
          </th>
          <th className="text-center" scope="col">
            Count
          </th>
          <th className="text-center" scope="col">
            Shipping
          </th>
          <th className="text-center" scope="col">
            Remove
          </th>
        </tr>
      </thead>

      {cart.map((p) => (
        <ProductCardInCheckout key={p._id} p={p} />
      ))}
    </table>
  );

  //saveCashOrderToDb
  const saveCashOrderToDb = () => {
    // console.log("cart", JSON.stringify(cart, null, 4));
    dispatch({
      type: "COD",
      payload: true,
    });

    userCart(cart, user.token)
      .then((res) => {
        // console.log("CART POST RES==>", res);
        if (res.data.ok) history.push("/checkout");
      })
      .catch((err) => console.log("cart save err==>", err));
  };

  return (
    <div className="container-fluid mt-5">
      <div className="row">
        <h2 className="m-4 text-secondary shaw">
          Cart - {cart.length} Product
        </h2>
        {/* {JSON.stringify(cart)} */}
      </div>

      <div className="row">
        <div className="col-md-8">
          {!cart.length ? (
            <p>
              No products in cart. <Link to="/shop">Continue shopping.</Link>
            </p>
          ) : (
            showCartItems()
          )}
        </div>
        <div className="col-md-4">
          <h2 className="text-center text-secondary shaw">
            Order Summary
          </h2>
          <hr />
          <p>
            <b>Products</b>
          </p>
          {cart.map((c, i) => (
            <div key={i}>
              <p>
                {/* if product has offerPrice then  */}
                {c.offerPrice ? (
                  <span>
                 
                    <span className="text-success">{c.title} x {c.count} = </span>
                    <span className="text-danger">
                      <del>Rs {c.price * c.count}</del>
                    </span>
                    <span className="text-success">    Rs. {c.offerPrice * c.count}</span>
                  </span>
                ) : (
                  <span>
                    <span className="text-success">{c.title} x {c.count} = Rs. {c.price * c.count}</span>
                  </span>
                )}
                
              </p>
            </div>
          ))}
          <hr />
          <b>Total</b>: <b>Rs. {getTotal()}</b>
          <hr />
          {user ? (
            <>
              <button
                onClick={saveOrderToDb}
                className="btn btn-raised mt-2 grad-button text-dark"
                disabled={!cart.length}
              >
                Proceed to Checkout
              </button>
              <br />

              <button
                onClick={saveCashOrderToDb}
                className="btn  btn-raised mt-2 grad-button text-dark"
                disabled={!cart.length}
              >
                Pay Cash On Delivery
              </button>
            </>
          ) : (
            <button className="btn btn-sm btn-primary mt-2">
              <Link to={{ pathname: "Login", state: { from: "cart" } }}>
                Login to Checkout
              </Link>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
