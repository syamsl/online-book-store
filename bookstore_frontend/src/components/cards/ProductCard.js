import React, { useState } from "react";
import { Card, Tooltip } from "antd";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import laptop from "../../images/laptop.png";
import { Link } from "react-router-dom";
import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";
import { showAverage } from "../../functions/rating";


const { Meta } = Card;
const ProductCard = ({ product }) => {
  const [tooltip, setTooltip] = useState("Click to add");

  //redux
  const { user, cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    let cart = [];
    if (typeof window != "undefined") {
      //if cart is in local Storage GET it
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      //push new product to cart
      cart.push({
        ...product,
        count: 1,
      });
      //remove duplicates
      let unique = _.uniqWith(cart, _.isEqual);

      //save to local storage
      // console.log("unique", unique);
      localStorage.setItem("cart", JSON.stringify(unique));
      //show tooltip
      setTooltip("Added");

      //add to redux state
      dispatch({
        type: "ADD_TO_CART",
        payload: unique,
      });
      //show cart items in side drawer
      dispatch({
        type: "SET_VISIBLE",
        payload: true,
      });
    }
  };

  //destructure
  const { images, title, description, slug, price , offerPrice} = product;
  // console.log("He he--->",product);
  return (
    <>
      {product && product.ratings && product.ratings.length > 0 ? (
          showAverage(product)
        ) : (
          <div className="text-center text-secondary pt-1 pb-3">
            No Rating Yet
          </div>
        )}
    <div>
      <Card
        cover={
          <img
            src={images && images.length ? images[0].url : laptop}
            style={{ height: "150px", objectFit: "contain" }}
            className="p-1"
          />
        }
        actions={[
          <Link to={`/product/${slug}`}>
            <EyeOutlined className="text-warning" /> <br />
            <p className="text-dark m-2">VIEW PRODUCT</p>
          </Link>,
          <Tooltip title={tooltip}>
            <button
              className="btn"
              onClick={handleAddToCart}
              disabled={product.quantity < 1}
            >
              <ShoppingCartOutlined className="text-danger" /> <br />
              {product.quantity < 1 ? "Out of Stock" : "Add to Cart"}
            </button>
          </Tooltip>,
        ]}

        className="card-shaw"

      >
        <Meta
          title={
            offerPrice ? (
              <>
              <span>{title}</span>
              <br/>
                <span className="text-secondary">
                  <del>Rs. {price}</del>
                </span>{" "}
                <span className="text-success">Rs. {offerPrice} - {product.offer.discount}%OFF</span>
              </>
            ) : (
              <>
              <span>{title}</span>
              <br />
              <span className="text-success">Rs. {price}</span>
              </>
            )
          }
          // title={`${title} - Rs. ${offerPrice ? offerPrice: price}`}
          description={`${description && description.substring(0, 40)}...`}
        />

      </Card>
    </div>
    </>
  );
};

export default ProductCard;
