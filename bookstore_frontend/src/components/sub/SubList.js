import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getSubs } from "../../functions/sub";

const SubList = () => {
  const [subs, setSubs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getSubs().then((res) => {
      setSubs(res.data);
      setLoading(false);
    });
  }, []);

  const showSubs = () => {
    return subs.map((c) => (
      <div className="m-3">
        <Link  to={`/sub/${c.slug}`}>
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
        {loading ? <h4 className="text-center">Loading...</h4> : showSubs()}
      </div>
    </div>
  );
};

export default SubList;
