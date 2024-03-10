import React, { useState, useEffect } from "react";
import { getCategory } from "../../functions/category";
import { Link } from "react-router-dom";
import ProductCard from "../../components/cards/ProductCard";
import CategoryList from "../../components/category/CategoryList";

const CategoryHome = ({ match }) => {
  const [category, setCategory] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const { slug } = match.params;

  useEffect(() => {
    setLoading(true);
    getCategory(slug).then((res) => {
      // console.log(JSON.stringify(res.data, null, 4));
      setCategory(res.data.category);
      setProducts(res.data.products);
      setLoading(false);
    });
  }, []);

  return (
    <div className="container-fluid mt-5">
      <div className="row">
        <div className="col">
          {loading ? (
            <h4 className="jumbotron text-center p-3 mt-3 mb-2 display-5 bg-info text-white">
              Loading...
            </h4>
          ) : (
            <h4 className="jumbotron text-center p-3 mt-3 mb-5 display-5 bg-info text-white">
              {products.length} Products in "{category.name}" category
            </h4>
          )}
        </div>
      </div>
      <div className="row">
            {products.map((p) => <div className="col-md-4" key={p._id}>
                <ProductCard product={p} />
            </div>)}
      </div>
    </div>
  );
};

export default CategoryHome;
