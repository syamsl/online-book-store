import React, { useEffect, useState } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { getOrders, changeStatus } from "../../../functions/admin";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Orders from "../../../components/order/Orders";
import { Link } from "react-router-dom";
import { getCategories } from "../../../functions/category";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createCategoryOffer } from "../../../functions/offer";

const CreateCategoryOffer = ({ history }) => {

    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState("")
    const [name, setName] = useState("")
    const [expiry, setExpiry] = useState("")
    const [discount, setDiscount] = useState("")
    const [offerDetail, setOfferDetail] = useState("")

    const { user } = useSelector((state) => ({ ...state }))

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = () => {
        getCategories().then((c) => setCategories(c.data));
    }

    const handleCategoryChange = (e) => {
        // e.preventDefault();
        // console.log("CLICKED CATEGORY", e.target.value);
        setCategory(e.target.value);
        // setOfferDetail(e.target.value.name);
        // console.log("Selected Cat--->", e.target.value)
        categories.map((c) => {
            if (c._id == e.target.value) {
                // console.log("MAPPED CATEGORY--->",c.name)
                setOfferDetail(c.name)
            }
        })


    }

    const handleSubmit = (e) => {
        
        // console.log("OFFER NAME--->", name)
        // console.log("OFFER CATEGORY--->", selectedCategory)
        // console.log("OFFER EXPIRY--->", expiry)
        // console.log("OFFER DISCOUNT--->", discount)

        createCategoryOffer({ name, expiry, category, discount, offerDetail }, user.token)
            .then((res) => {
                // console.log("RES FROM BACKEND--->", res)
                toast("Category Offer created");
                history.push("/admin/offer-management")
            })

    }

    const validate = (e) => {
        e.preventDefault();

        var val_name = document.getElementById("cat-name")
        var val_category = document.getElementById("cat-category")
        var val_expiry = document.getElementById("cat-expiry")
        var val_discount = document.getElementById("cat-discount")

        // console.log("IMMEDIATE CONSOLE+",val_category.value);

        let name_valid = false;
        let category_valid = false;
        let expiry_valid = false;
        let discount_valid = false;

        if (val_name.value === '') {
            document.getElementById('errName').innerText = 'This field cannot be empty!'
            name_valid = false
        } else if (val_name.value.length < 4) {
            document.getElementById('errName').innerText = 'Name should have atleast 4 characters.'
            name_valid = false
        } else {
            document.getElementById('errName').style.display = 'none'
            name_valid = true
        }

        if (category ==='') {
            document.getElementById('errCat').innerText = 'This field cannot be empty!'
            category_valid = false
        } else {
            document.getElementById('errCat').style.display = 'none'
            category_valid = true
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

          if (name_valid && category_valid &&  expiry_valid && discount_valid) {
            handleSubmit();
        }
    }

    return (
        <div className="container-fluid mt-5">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className=" col-md-10 text-center">
                    <h2 className="shaw text-secondary mt-3">Create Category Offer</h2>
                    <div className="row justify-content-center" >
                        <div className="col-md-4">
                            <form >
                                <div className="form-group">

                                    <div className="mt-3">  <label>Offer Name</label></div>
                                    <div>
                                        <input
                                            id="cat-name"
                                            type="text"
                                            name="name"
                                            className="form-control text-center   grad-input p-2"
                                            onChange={(e) => { setName(e.target.value) }}

                                        />
                                    </div>
                                    <span id='errName' className="text-danger"></span>


                                    <div className="mt-3">  <label>Select Category</label></div>
                                    <div>
                                        <select
                                            id="cat-category"
                                            name="category"
                                            className="form-control text-center grad-input"
                                            onChange={handleCategoryChange}
                                        >
                                            <option value="Choose">Choose</option>
                                            {categories.length > 0 &&
                                                categories.map((c) => (
                                                    <option key={c._id} value={c._id}>
                                                        {c.name}
                                                    </option>
                                                ))}
                                        </select>
                                    </div>
                                    <span id='errCat' className="text-danger"></span>

                                    <div className="mt-3">  <label>Expiry</label></div>
                                    <div>
                                        <DatePicker
                                            id="cat-expiry"
                                            className="form-control text-center grad-input p-2"
                                            selected={expiry ? expiry : new Date()}
                                            required
                                            onChange={(date) => setExpiry(date)}

                                        />
                                        {/* <input
                                            type="text"
                                            name="price"
                                            className="form-control text-center   grad-input p-2"
                                        /> */}
                                    </div>
                                    <span id='errExpiry' className="text-danger"></span>

                                    <div className="mt-3">  <label>Discount %</label></div>
                                    <div>
                                        <input
                                            id="cat-discount"
                                            type="number"
                                            name="discount"
                                            maxlength="2"
                                            className="form-control text-center   grad-input p-2"
                                            onChange={(e) => setDiscount(e.target.value)}
                                        />
                                    </div>
                                    <span id='errDiscount' className="text-danger"></span>

                                    <div>
                                        <button className=" text-center mt-3   grad-button" type="submit" onClick={validate}>Submit</button>
                                    </div>

                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};
export default CreateCategoryOffer;
