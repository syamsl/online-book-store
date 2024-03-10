import React, { useState } from "react";
import { Card, Tabs, Tooltip } from "antd";
import { Link } from "react-router-dom";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";

// import { Carousel} from "react-bootstrap"

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import Laptop from "../../images/laptop.png";
import ProductListItems from "./ProductListItems";
import _, { toSafeInteger } from "lodash";
import { useSelector, useDispatch } from "react-redux";
import { addToWishlist } from "../../functions/user";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import StarRating from "react-star-ratings";
import RatingModal from "../modal/RatingModal";
import { showAverage } from "../../functions/rating";
import { GlassMagnifier } from "react-image-magnifiers";

const { TabPane } = Tabs;

//this is children component of Product image

const SingleProduct = ({ product, onStarClick, star }) => {
  const [tooltip, setTooltip] = useState("Click to add");
  const { title, description, images, slug, _id } = product;

  //redux
  const { user, cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  let history = useHistory();

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
    }
  };

  const handleAddToWishlist = (e) => {
    e.preventDefault();
    if (user) {
      addToWishlist(product._id, user.token).then((res) => {
        // console.log("ADDED TO WISHLIST", res.data);
        toast.success("Added to Wishlist");
        // history.push("/user/wishlist");
      });
    } else toast.error("Login to add to wishlist");

  };

  return (
    <>
      <div className="col-md-4 offset-md-1 mt-5">
        {images && images.length ? (
          <Carousel showArrows={true} autoPlay infiniteLoop>
            {images &&
              images.map((i) => (
                <GlassMagnifier
                  imageSrc={i.url}
                  key={i.public_id}
                  magnifierSize="200px"
                  square={true}
                  magnifierPosition="over"
                  imagePosition="over"
                  largeImageSrc={i.url}
                  largeImageWidth="400px"
                  largeImageHeight="400px"
                />
              ))}

            {/* {images && images.map((i) => <img src={i.url} key={i.public_id} />)} */}
          </Carousel>
        ) : (
          <Card cover={<img src={Laptop} className="mb-3 card-image" />}></Card>
        )}
        <Tabs type="card">
          <TabPane tab="Description" key="1">
            {description && description}
          </TabPane>
          <TabPane tab="More" key="2">
            Contact us on 1999-992-282
          </TabPane>
        </Tabs>
      </div>

      <div className="col-md-5 mt-5">
        <h2 className="bg-info grad text-secondary shaw p-3 text-center">
          {title}
        </h2>

        {product && product.ratings && product.ratings.length > 0 ? (
          showAverage(product)
        ) : (
          <div className="text-center text-secondary pt-1 pb-3">
            No Rating Yet
          </div>
        )}

        <Card
          actions={[
            <Tooltip title={tooltip}>
              <button
                onClick={handleAddToCart}
                className="btn"
                disabled={product.quantity < 1}
              >
                <ShoppingCartOutlined className="text-danger" /> <br />
                {product.quantity < 1 ? "Out of Stock" : "Add to Cart"}
              </button>
            </Tooltip>,
            <a onClick={handleAddToWishlist}>
              <HeartOutlined className="text-info" /> <br />
              ADD TO WISHLIST
            </a>,
            <RatingModal>
              <StarRating
                name={_id}
                numberOfStars={5}
                rating={star}
                changeRating={onStarClick}
                isSelectable={true}
                starRatedColor="gold"
                starHoverColor="gold"
              />
            </RatingModal>,
          ]}
        >
          <ProductListItems product={product} />
        </Card>
      </div>
    </>
  );
};

export default SingleProduct;
