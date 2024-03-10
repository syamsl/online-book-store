import React, { useLayoutEffect } from "react";
import { Link } from "react-router-dom";

const ProductListItems = ({ product }) => {
  const { price, category, subs, shipping, color, brand, author, quantity, sold ,offerPrice} =
    product;
  return (
    <ul className="list-group">
      <li className="list-group-item">
        <b>Price</b>{" "}
        <span className="label label-default label-pill pull-xs-right">
        {`${offerPrice ?  offerPrice : price }`}
        </span>
      </li>

      {category && (
        <li className="list-group-item">
          <b>Category</b>{" "}
          <Link
            to={`/category/${category.slug}`}
            className="label label-default label-pill pull-xs-right"
          >
            {category.name}
          </Link>
        </li>
      )}

      {subs && (
        <li className="list-group-item">
          <b>Sub Categories</b>
          {subs.map((s) => (
            <Link
              key={s._id}
              to={`/sub/${s.slug}`}
              className="label label-default label-pill pull-xs-right"
            >
              {s.name}
            </Link>
          ))}
        </li>
      )}

      <li className="list-group-item">
        <b>Shipping</b>{" "}
        <span className="label label-default label-pill pull-xs-right">
          {shipping}
        </span>
      </li>

      <li className="list-group-item">
        <b>Author</b>{" "}
        <span className="label label-default label-pill pull-xs-right">
          {author}
        </span>
      </li>

      <li className="list-group-item">
        <b>Available</b>{" "}
        <span className="label label-default label-pill pull-xs-right">
          {quantity}
        </span>
      </li>

      <li className="list-group-item">
        <b>Sold</b>{" "}
        <span className="label label-default label-pill pull-xs-right">
          {sold}
        </span>
      </li>
    </ul>
  );
};

export default ProductListItems;
