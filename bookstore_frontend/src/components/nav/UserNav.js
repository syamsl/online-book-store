import React from "react";
import { Link } from "react-router-dom";

const UserNav = () => (
  <nav>
    <ul className="nav flex-column">
      <li className="nav-item btn btn-raised grad">
        <Link to="/user/history" className="nav-link text-white shaw">
          History
        </Link>
      </li>
      {/* <li className="nav-item btn btn-raised grad">
        <Link to="/user/profile" className="nav-link text-white shaw">
          User Profile
        </Link>
      </li> */}
      <li className="nav-item btn btn-raised grad">
        <Link to="/user/password" className="nav-link text-white shaw">
          Password
        </Link>
      </li>
      <li className="nav-item btn btn-raised grad">
        <Link to="/user/wishlist" className="nav-link text-white shaw">
          Wishlist
        </Link>
      </li>
    </ul>
  </nav>
);

export default UserNav;
