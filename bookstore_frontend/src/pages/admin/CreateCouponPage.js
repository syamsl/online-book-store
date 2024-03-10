import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import { getCoupons, removeCoupon, createCoupon } from "../../functions/coupon";
import "react-datepicker/dist/react-datepicker.css";
import AdminNav from "../../components/nav/AdminNav";

import { DeleteOutlined } from "@ant-design/icons";

const CreateCouponPage = () => {
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [discount, setDiscount] = useState("");
  const [loading, setLoading] = useState(false);
  const [coupons, setCoupons] = useState([]);

  //redux
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadAllCoupons();
  }, []);

  const loadAllCoupons = () => getCoupons().then((res) => setCoupons(res.data));

  const handleSubmit = (e) => {
   
    setLoading(true);
    // console.log(name,expiry, discount)
    createCoupon({ name, expiry, discount }, user.token)
      .then((res) => {
        setLoading(false);
        loadAllCoupons();
        setName("");
        setDiscount("");
        setExpiry("");
        toast.success(`${res.data.name} is created`);
      })
      .catch((err) => console.log("create coupon err===>", err));
  };

  const handleRemove = (couponId) => {
    if (window.confirm("Delete?")) {
      setLoading(true);
      removeCoupon(couponId, user.token)
        .then((res) => {
          loadAllCoupons();
          setLoading(false);
          toast.info(`Coupon "${res.data.name}" deleted`);
        })
        .catch((err) => console.log(err));
    }
  };

  const validate = (e) => {
    e.preventDefault()
    var val_code = document.getElementById("coup-code")
    var val_discount = document.getElementById("coup-dis")
    var val_expiry = document.getElementById("coup-exp")

    let code_valid = false
    let discount_valid = false
    let expiry_valid = false

    if (val_code.value === '') {
      document.getElementById('errCode').innerText = 'This field cannot be empty!'
      code_valid = false
    } else if (val_code.value.length< 6) {
      document.getElementById('errCode').innerText = 'Coupon code should have atleast 6 characters.'
      code_valid = false   
    } else if (val_code.value.length<10) {
      document.getElementById('errCode').innerText = 'Coupon code should only have atmost 10 characters.'
      code_valid = false   
    } else {
      document.getElementById('errCode').style.display = 'none'
        code_valid=true
    }

    if (val_discount.value === '') {
      document.getElementById('errDiscount').innerText = 'This field cannot be empty!'
      discount_valid = false
    } else if (val_discount.value<1 || val_discount.value>99) {
      document.getElementById('errDiscount').innerText = 'Coupon discount need to be within range 1 to 99.'
      discount_valid = false   
    }  else {
      document.getElementById('errDiscount').style.display = 'none'
      discount_valid=true
    }

    if (val_expiry.value === '') {
      document.getElementById('errExpiry').innerText = 'This field cannot be empty!'
      expiry_valid = false
    } else if (new Date(val_expiry.value)<Date.now()) {
      document.getElementById('errExpiry').innerText = 'Select a valid expiry date.'
      expiry_valid = false   
    }  else {
      document.getElementById('errExpiry').style.display = 'none'
      expiry_valid=true
    }

    if (code_valid && discount_valid &&  expiry_valid) {
      handleSubmit();
  }


  }

  return (
    <div className="container-fluid text-lg mt-5">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-10">
          <h4 className="mt-3">
            {loading ? (
              <b className="text-danger">Loading...</b>
            ) : (
              <h2 className="text-secondary shaw  text-center">Coupon</h2>
            )}
          </h4>
          <form >

            <div className="form-group">
              <label className="text-muted">Coupon code:</label>
              <input
                id="coup-code"
                type="text"
                className=" grad-input m-2"
                onChange={(e) => setName(e.target.value)}
                value={name}
                autoFocus
                required
              ></input>
             
            </div>
            <span id='errCode' className="text-danger"></span>
            <div className="form-group">
              <label className="text-muted">Discount % : </label>
              <input
                id="coup-dis"
                type="Number"
                className="grad-input m-2"
                onChange={(e) => setDiscount(e.target.value)}
                value={discount}
                autoFocus
                required
              ></input>
             
            </div>
            <span id='errDiscount' className="text-danger"></span>
            <div className="form-group">
              <label className="text-muted text-center">Expiry :</label>
              <br />
              <DatePicker
                id="coup-exp"
                className="grad-input"
                selected={expiry ? expiry : new Date()}
                value={expiry}
                onChange={(date) => setExpiry(date)}
                required
              />
              <span id='errExpiry' className="text-danger"></span>
            </div>
            <div>
              <button className="btn btn-raised text-white shaw grad-button text-center" onClick={validate}>
                <b>Save</b>
              </button>
            </div>

          </form>

          <br />
          <h4 className="text-center text-secondary shaw m-3">
            Coupons - {coupons.length}
          </h4>

          <table className="table table-bordered">
            <thead className="thead-light">
              <tr>
                <th className="text-center" scope="col">
                  Coupon code
                </th>
                <th className="text-center" scope="col">
                  Expiry
                </th>
                <th className="text-center" scope="col">
                  Discount
                </th>
                <th className="text-center" scope="col">
                  Action
                </th>
              </tr>
            </thead>
            {/* {JSON.stringify(coupons)} */}
            <tbody>
              {coupons.map((c) => (
                <tr key={c._id}>
                  <td className="text-center">{c.name}</td>
                  <td className="text-center">
                    {new Date(c.expiry).toLocaleDateString()}
                  </td>
                  <td className="text-center">{c.discount}%</td>
                  <td className="text-center">
                    <DeleteOutlined
                      onClick={() => handleRemove(c._id)}
                      className="text-danger btn-lg pointer"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default CreateCouponPage;
