import React, { useEffect } from "react";
import Jumbotron from "../components/cards/Jumbotron";
import BestSellers from "../components/home/BestSellers";
import NewArrivals from "../components/home/NewArrivals";
import CategoryList from "../components/category/CategoryList";
import SubList from "../components/sub/SubList";
import { useSelector } from "react-redux";

const Home = ({ history }) => {
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.role === "admin") {
      history.push("/admin/dashboard");
    }
  }, []);

  return (
    <>
      <div className="jumbotron grad text-danger bg-gradient  h1 shaw font-weight-bold text-center mt-5">
        <Jumbotron
          text={[
            "Discover, Dream, Dive In",
            "New Arrivals",
            "Curiosity Begins Here",
            "Buy Best Sellers",
          ]}
        />
      </div>

      <h4 className="text-center p-4 mt-5 display-4 jumbotron text-secondary shaw">
        New Arrivals
      </h4>
      <NewArrivals />

      <h4 className="text-center p-4 mt-5 display-4 jumbotron text-secondary shaw">
        <b>Best Sellers</b>
      </h4>
      <BestSellers />

      <h4 className="text-center p-4 mt-5 display-4 jumbotron text-secondary shaw">
        <b>Categories</b>
      </h4>
      <CategoryList />

      <h4 className="text-center p-4 mt-5 display-4 jumbotron text-secondary  shaw">
        <b>Sub Categories</b>
      </h4>
      <SubList />
    </>
  );
};

export default Home;
