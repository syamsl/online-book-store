import React from "react";
import { Menu, Badge } from "antd";
import { getAuth, signOut } from "firebase/auth";

import {
  HomeOutlined,
  UserOutlined,
  UserAddOutlined,
  SettingOutlined,
  LogoutOutlined,
  ShoppingCartOutlined,
  ShopOutlined,
} from "@ant-design/icons";

import { useState } from "react";
import { Link } from "react-router-dom";
import firebase from "@firebase/app-compat";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Search from "../forms/Search";
import { size } from "lodash";

const { SubMenu, Item } = Menu;

const Header = () => {
  const [current, setCurrent] = useState("");

  let dispatch = useDispatch();
  let { user, cart } = useSelector((state) => ({ ...state }));
  let history = useHistory();

  const handleClick = (e) => {
    // console.log(e.key);
    setCurrent(e.key);
  };

  const logout = () => {
    const auth = getAuth();
    signOut(auth).then((res) => {
      dispatch({
        type: "LOGOUT",
        payload: null,
      });
      history.push("/login");
    });
    // firebase.auth().signOut();
  };

  return (
    <div className="container-fluid p-0 pos">
      <Menu
        onClick={handleClick}
        selectedKeys={[current]}
        mode="horizontal"
        style={{ backgroundColor: "white", width: "100%" }}
        className
      >
        {user && user.role === "admin" && (
          <Item
            key="admin_dashboard"
            style={{
              fontWeight: "bolder",
              fontSize: "medium",
              color: "blue",
            }}
          >
            Admin
          </Item>
        )}

        {!user && (
          <>
            <Item key="home" className="mr-4">
              <Link
                to="/"
                className="text-secondary"
                style={{ fontWeight: "bolder", fontSize: "medium" }}
              >
                Home
              </Link>
            </Item>
            <Item key="shop" className="mr-4">
              <Link
                to="/shop"
                className="text-secondary"
                style={{ fontWeight: "bolder", fontSize: "medium" }}
              >
                Shop
              </Link>
            </Item>
            <Item key="cart" className="mr-4">
              <Link to="/cart" style={{ fontSize: "medium" }}>
                <Badge count={cart.length} offset={[9, 0]}>
                  <b
                    className="text-secondary"
                    style={{ fontWeight: "bolder", fontSize: "medium" }}
                  >
                    {" "}
                    Cart
                  </b>
                </Badge>
              </Link>
            </Item>
            <Item
              disabled={Item}
              key="search"
              className="ml-auto p-1"
              style={{ width: "5 rem" }}
            >
              <Search />
            </Item>
          </>
        )}

        {user && user.role === "subscriber" && (
          <>
            <Item key="home" className="mr-4">
              <Link
                to="/"
                className="text-secondary"
                style={{ fontWeight: "bolder", fontSize: "medium" }}
              >
                Home
              </Link>
            </Item>
            <Item key="shop" className="mr-4">
              <Link
                to="/shop"
                className="text-secondary"
                style={{ fontWeight: "bolder", fontSize: "medium" }}
              >
                Shop
              </Link>
            </Item>
            <Item key="cart" className="mr-4">
              <Link to="/cart" style={{ fontSize: "medium" }}>
                <Badge count={cart.length} offset={[9, 0]}>
                  <b
                    className="text-secondary"
                    style={{ fontWeight: "bolder", fontSize: "medium" }}
                  >
                    {" "}
                    Cart
                  </b>
                </Badge>
              </Link>
            </Item>
            <Item
              disabled={Item}
              key="search"
              className="ml-auto p-1"
              style={{ width: "5 rem" }}
            >
              <Search />
            </Item>
          </>
        )}

        {!user && (
          <Item
            key="login"
            icon={
              <UserOutlined
                className="text-secondary"
                style={{ fontWeight: "bolder", fontSize: "medium" }}
              />
            }
          >
            <Link
              to="/login"
              className="text-secondary"
              style={{ fontWeight: "bolder", fontSize: "medium" }}
            >
              Login
            </Link>
          </Item>
        )}

        {!user && (
          <Item
            key="register"
            icon={
              <UserAddOutlined
                className="text-secondary"
                style={{ fontWeight: "bolder", fontSize: "medium" }}
              />
            }
          >
            <Link
              to="/register"
              className="text-secondary"
              style={{ fontWeight: "bolder", fontSize: "medium" }}
            >
              Register
            </Link>
          </Item>
        )}

        {user && user.role === "subscriber" && (
          <SubMenu
            key="SubMenu"
            title={user.email && user.email.split("@")[0]}
            className="text-secondary"
          >
            {user && user.role === "subscriber" && (
              <Item className="text-center">
                <Link to="/user/history" className="btn text-center">
                  Dashboard
                </Link>
              </Item>
            )}

            <Item onClick={logout} className="text-center">
              <button className="btn btn-raised grad">Logout</button>
            </Item>
          </SubMenu>
        )}
        {user && user.role === "admin" && (
          <SubMenu
            key="SubMenu"
            title={user.email && user.email.split("@")[0]}
            className="text-secondary ml-auto"
          >
            {user && user.role === "admin" && (
              <Item className="text-center">
                <Link to="/admin/dashboard" className="btn text-center">
                  Dashboard
                </Link>
              </Item>
            )}

            <Item onClick={logout} className="text-center">
              <button className="btn btn-raised grad">Logout</button>
            </Item>
          </SubMenu>
        )}
      </Menu>
    </div>
  );
};

export default Header;
