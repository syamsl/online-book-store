import React from "react";
import { Link } from "react-router-dom";

const AdminNav = () => (
  <nav>
    <ul className="nav flex-column">
      <li className="nav-item btn btn-raised grad">
        <Link to="/admin/dashboard" className="nav-link text-white shaw">
          Dashboard
        </Link>
      </li>

      <li className="nav-item btn btn-raised grad">
        <Link to="/admin/order-management" className="nav-link text-white shaw">
          Order Management
        </Link>
      </li>

      <li className="nav-item btn btn-raised grad">
        <Link to="/admin/user-management" className="nav-link text-white shaw">
          User Management
        </Link>
      </li>

      <li className="nav-item btn btn-raised grad">
        <Link to="/admin/products" className="nav-link text-white shaw">
          Product Management
        </Link>
      </li>

      <li className="nav-item btn btn-raised grad">
        <Link to="/admin/category" className="nav-link text-white shaw ">
          Category Management
        </Link>
      </li>

      <li className="nav-item btn btn-raised grad">
        <Link to="/admin/offer-management" className="nav-link text-white shaw">
          Offer Management
        </Link>
      </li>

      <li className="nav-item btn btn-raised grad">
        <Link to="/admin/sales" className="nav-link text-white shaw">
          Sales
        </Link>
      </li>

      <li className="nav-item btn btn-raised grad">
        <Link to="/admin/coupon" className="nav-link text-white shaw">
          Coupon
        </Link>
      </li>

    </ul>
  </nav>
);

export default AdminNav;
