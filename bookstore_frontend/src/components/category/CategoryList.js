import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCategories } from "../../functions/category";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getCategories().then((c) => {
      setCategories(c.data);
      setLoading(false);
    });
  }, []);

  const showCategories = () => {
    return categories.map((c) => (
        <div className="p-2">
        <Link to={`/category/${c.slug}`}>
      <div className="col btn text-dark btn-raised m-1 grad-button ">
        {c.name}
      </div>
      </Link>
      </div>
    ));
  };

  return (
    <div className="container">
      <div className="row d-flex justify-content-center">
        {loading ? (
          <h4 className="text-center">Loading...</h4>
        ) : (
          showCategories()
        )}
      </div>
    </div>
  );
};

export default CategoryList;
