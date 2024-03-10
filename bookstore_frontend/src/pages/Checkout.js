import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getUserCart,
  emptyUserCart,
  saveUserAddress,
  applyCoupon,
  createCashOrderForUser,
  createPaypalOrderForUser,
  getUserDetails,
  editUserDetails,
} from "../functions/user";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Alert, Radio } from "antd";
import AddAddressForm from "../components/forms/AddAddressForm";
import { Modal } from 'antd';

import Paypal from "../components/Paypal";

const Checkout = ({ history }) => {
  const [state, setState] = useState(false);
  const [addressModalVisible, setAddressModalVisible] = useState(false)
  const [couponModalVisible, setCouponModalVisible] = useState(false)

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [street, setStreet] = useState("");
  const [pincode, setPincode] = useState("");
  const [city, setCity] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [addressName, setAddressName] = useState("");

  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState([]);
  const [deliveryAddress, setDeliveryAddress] = useState([]);
  const [addressSaved, setAddressSaved] = useState(false);
  const [coupon, setCoupon] = useState("");

  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  const [discountError, setDiscountError] = useState("");

  const dispatch = useDispatch();
  const { user, COD, deliverAddress } = useSelector((state) => ({ ...state }));
  const couponTrueOrFalse = useSelector((state) => state.coupon);

  const addressStyle = {
    padding: '10px',
    display: 'flex',
    border: '1px solid #e5e5e5',
    borderRadius: '6px',
    justifyContent: 'space-between',
  }
  useEffect(() => {
    getUserCart(user.token).then((res) => {
      // console.log("user cart res===>", JSON.stringify(res.data, null, 4));
      setProducts(res.data.products);
      setTotal(res.data.cartTotal);
    });
  }, []);

  const loadUserDetails = () =>
    getUserDetails(user.token).then((u) => {
      // console.log("POPULATING TEST--->",u)
      setName(u.data.name);
      setMobile(u.data.mobile);
      setAddress(u.data.address);
    });

  useEffect(() => {
    //getUserDetails
    // if(address && address !== []){
    //   addCheckbox()
    // } else{

    loadUserDetails();
  }, [state]);

  const emptyCart = () => {
    //remove from localStorage
    if (typeof window !== "undefined") {
      localStorage.removeItem("cart");
    }

    // remove from redux
    dispatch({
      type: "ADD_TO_CART",
      payload: [],
    });

    //remove from backend
    emptyUserCart(user.token).then((res) => {
      setProducts([]);
      setTotal(0);
      setTotalAfterDiscount(0);
      setCoupon("");
      toast.info("Cart is empty. Continue shopping");
    });
  };

  // const saveAddressToDb = () => {
  //   // console.log(address)
  //   saveUserAddress(user.token, address).then((res) => {
  //     if (res.data.ok) {
  //       setAddressSaved(true);
  //       toast.success("Address saved");
  //     }
  //   });
  // };

  // const addCheckbox = () => {
  //   console.log(address);

  //   let html = ''
  //   address.forEach((c)=>{
  //     console.log('forEach');
  //     html +=  `
  //     <input type="radio" checked value={${c.id}} onChange={handleChange} />
  //             <span>
  //               {${c.name}}
  //               {/* <textarea type="checkbox"  className="grad-input" cols="30" rows="2" type="radio" checked  value=${c.name} \nStreet: ${c.street} \nPincode: ${c.pincode} \nAddress: ${c.address}} /> */}
  //             </span>
  //             <br />
  //             <span>
  //               {\tStreet: ${c.street}}
  //             </span>
  //             <br />
  //             <span>
  //               {\tPincode: ${c.pincode}}
  //             </span>
  //             <br />
  //             <span>
  //               {\tAddress: ${c.address}}
  //             </span>
  //     `
  //   })
  //   console.log(html);
  //   document.getElementById('syam').innerHTML = html
  // }

  const applyDiscountCoupon = () => {
    // console.log("send coupon to backend===>", coupon);
    applyCoupon(user.token, coupon).then((res) => {
      // console.log("RES form backend on COUPON APPlIED--->", res.data);
      if (res.data) {
        setTotalAfterDiscount(res.data);

        //push the totalAfterDiscount to redux
        //update redux coupon applied true/false
        dispatch({
          type: "COUPON_APPLIED",
          payload: true,
        });
      }
      //error
      if (res.data.err) {
        // console.log("ERR from backend--->", res.data.err);
        setDiscountError(res.data.err);

        //update redux coupon applied true/false
        dispatch({
          type: "COUPON_APPLIED",
          payload: false,
        });
      }
    });
  };

  const saveAdd = (e) => {
    e.preventDefault();

    let add_id = document.querySelector(
      'input[name="view_address"]:checked'
    ).value;

    address.map((c) => {
      if (c.id == add_id) {
        dispatch({
          type: "DELIVERY_ADD",
          payload: c,
        });
        toast.success(`Delivery Address of ${c.name} is saved`);
        setAddressSaved(true);
      }
    });
  };

  const saveNewAddress = (e) => {
    e.preventDefault();
    setAddressModalVisible(true)
    setState(true);
  };

  const openCouponModal = (e) => {
    e.preventDefault()
    setCouponModalVisible(true)
  }

  const handleSubmit = (e) => {
    //e.preventDefault();
    editUserDetails(user.token, name, mobile, {
      addressName,
      street,
      city,
      newAddress,
      pincode,
    }).then((res) => {
      // console.log("RES --->", res);
      toast.success("New Address added");
      setAddressModalVisible(false)
      loadUserDetails();
    });
  };

  const showAddress = () => (
    <>
      <form>
        {address.map((c) => (
          <div className="mt-2" key={c.id} style={addressStyle}>
            {/* <input type="radio" disabled checked value=""></input> */}
            <div>
              <span>
                <strong style={{ fontWeight: 600 }}>
                  {`${c.name}`}
                </strong>
                {/* <textarea type="checkbox" className="grad-input " cols="30" rows="6" checked value={`${c.name} \nStreet: ${c.street} \nPincode: ${c.pincode} \nAddress: ${c.address}`} /> */}
              </span>
              <br />
              <span>{`\tStreet: ${c.street}`}</span>
              <br />
              <span>{`\tPincode: ${c.pincode}`}</span>
              <br />
              <span>{`\tAddress: ${c.address}`}</span>
            </div>
            <div>
              <input
                type="radio"
                id="c.id"
                checked
                value={c.id}
                name="view_address"
                style={{ "margin": "revert" }}
              />
            </div>

          </div>
        ))}
        <div style={{ "display": "flex" }}>
          {address?.length !== 0 && (<div>
            <button
              className="btn btn-raised text-dark mt-2 grad-button mr-2"
              onClick={saveAdd}
            >
              Save
            </button>
          </div>)}
          <div>
            <button
              className="btn btn-raised text-dark mt-2 grad-button mr-2"
              onClick={saveNewAddress}
            >
              Add Address
            </button>
          </div>
          <div>
            <button
              className="btn btn-raised text-dark mt-2 grad-button"
              onClick={openCouponModal}
            >
              Apply Coupon
            </button>
          </div>
        </div>


        {/* <div className="col-md-12">
          <div className="col-md-4">
            <hr />
            <h2 className="text-center text-secondary shaw  mt-5 ">
              Apply Coupon
            </h2>
            <br />
            {discountError && <p className="text-danger ml-5">{discountError}</p>}
            {showApplyCoupon()}
            <br />
          </div>
        </div> */}
      </form>

      {/* <div className="ml-5" style={{ width: "80%" }}>
    //     <ReactQuill theme="snow" value={address} onChange={setAddress} />
    //     <button
    //       className="btn text-secondary btn-raised  mt-4 grad-button"
    //       onClick={saveAddressToDb}
    //     >
    //       <b>Save</b>
    //     </button>
    //   </div> */}
    </>
  );

  const showProductSummary = () => (
    <>
      {products.map((p, i) => (
        <div key={i}>
          <p>
            {p.product.offerPrice ? (
              <span>
                <span className="text-success">
                  {/* {p.product.title} ({p.color}) x {p.count} = Rs.{" "} */}
                  {p.product.title} x {p.count} = Rs.{" "}
                  {p.product.offerPrice * p.count}
                </span>
              </span>
            ) : (
              <span>
                <span className="text-success">
                  {/* {p.product.title} ({p.color}) x {p.count} = Rs.{" "} */}
                  {p.product.title} x {p.count} = Rs.{" "}
                  {p.product.price * p.count}
                </span>
              </span>
            )}
          </p>
        </div>
      ))}
    </>
  );

  const showApplyCoupon = () => (
    <>
      <div className="ml-5" style={{ width: "80%" }}>
        <input
          className="form-control grad-input "
          onChange={(e) => {
            setCoupon(e.target.value);
            setDiscountError("");
          }}
          type="text"
        />
        <button
          onClick={applyDiscountCoupon}
          className="btn text-dark btn-raised  mt-4 grad-button"
        >
          Apply
        </button>
      </div>
    </>
  );

  const createCashOrder = () => {
    createCashOrderForUser(
      user.token,
      COD,
      couponTrueOrFalse,
      deliverAddress
    ).then((res) => {
      // console.log("USER CASH ORDER CREATED--->", res);
      //emptycart from redux, localStorage, reset coupon, reset COD, redirect
      if (res.data.ok) {
        //empty local Storage
        if (typeof window !== "undefined") localStorage.removeItem("cart");

        //empty redux cart

        dispatch({
          type: "ADD_TO_CART",
          payload: [],
        });

        //empty redux coupon

        dispatch({
          type: "COUPON_APPLIED",
          payload: false,
        });

        //empty redux COD

        dispatch({
          type: "COD",
          payload: false,
        });

        //empty cart from backend

        emptyUserCart(user.token);

        //redirect

        setTimeout(() => {
          history.push("/user/history");
        }, 1000);
      }
    });
  };

  return (
    <div className="container -fluid mt-5">
      <div className="row">
        {/* deliveryOptions */}

        <div className="col-md-8">
          <h2 className="mt-3 text-center text-secondary shaw">
            Delivery Address
          </h2>
          <hr />
          {showAddress()}

          {/* <h2 className="text-center text-secondary shaw">Apply Coupon</h2>
          <br />
          {discountError && <p className="text-danger ml-5">{discountError}</p>}
          {showApplyCoupon()}
          <br /> */}
        </div>

        {/* order Summary */}

        <div className="col-md-4">
          <h2 className="mt-3 text-center text-secondary shaw">
            Order Summary
          </h2>
          <hr />
          <p>
            <b>Products {products.length}</b>
          </p>
          {showProductSummary()}
          <hr />
          <p>
            <b>Cart Total</b>: Rs. {total}
          </p>
          {totalAfterDiscount > 0 && (
            <div className="col-md-8">
              <Alert
                message="Discount Applied"
                description={`Total Payable: Rs.${totalAfterDiscount}`}
                type="success"
                showIcon
              />
            </div>

            // <p className="text-success">
            //   Discount Applied: Total Payable: Rs. {totalAfterDiscount}
            // </p>
          )}

          <div className="row">
            <div className="col-md-6">
              {COD ? (
                <button
                  disabled={!addressSaved || !products.length}
                  className=" btn text-secondary btn-raised  mt-4 grad-button"
                  onClick={createCashOrder}
                >
                  <b>Place Order</b>
                </button>
              ) : (
                <>
                  <button
                    disabled={!addressSaved || !products.length}
                    className="btn text-white btn-raised  mt-4 mb-3 stripepay-button"
                    onClick={() => history.push("/payment")}
                  >
                    Place Order-Stripe Pay
                  </button>
                  {addressSaved && products.length > 0 && (
                    <Paypal couponTrueOrFalse={couponTrueOrFalse} />
                  )}
                </>
              )}
            </div>
            <div className="col-md-6">
              <button
                disabled={!products.length}
                onClick={emptyCart}
                className="btn text-dark btn-raised  mt-4 ml-5 grad-button"
              >
                Empty Cart
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-8">
          {/* Address Modal */}
          <Modal
            title="Add Address"
            bodyStyle={{ backgroundColor: '#f1f1ef' }}
            visible={addressModalVisible}
            okButtonProps={{ style: { display: 'none' } }}
            onCancel={() => setAddressModalVisible(false)} width={1000}>
            <AddAddressForm
              handleSubmit={handleSubmit}
              setAddressName={setAddressName}
              setStreet={setStreet}
              setPincode={setPincode}
              setCity={setCity}
              setNewAddress={setNewAddress}
              style={state ? "block" : "none"}
            />
          </Modal>
            
          {/* Coupon Modal */}
          <Modal
            title=""
            bodyStyle={{ backgroundColor: '#f1f1ef' }}
            visible={couponModalVisible}
            okButtonProps={{ style: { display: 'none' } }}
            onCancel={() => setCouponModalVisible(false)} width={1000}>
            <div>
              <hr />
              <h2 className="text-center text-secondary shaw  mt-5 ">
                Apply Coupon
              </h2>
              <br />
              <div>
              {discountError && <p className="text-danger ml-5">{discountError}</p>}
              {showApplyCoupon()}
              </div>
              <br />
            </div>
          </Modal>

        </div>

      </div>
    </div>
  );
};

export default Checkout;
