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
import { getProducts, createProductOffer } from "../../../functions/offer";


const CreateProductOffer = ({ history }) => {

    const [products, setProducts] = useState([]);
    const [name, setName] = useState("")
    const [discount, setDiscount] = useState("")
    const [expiry, setExpiry] = useState("")
    const [product, setProduct] = useState("")
    const [offerDetail, setOfferDetail] = useState("")
    const { user } = useSelector((state) => ({ ...state }))
    const [loading, setLoading] = useState("");

    useEffect(() => {
        loadProducts()
    }, []);

    const loadProducts = () => {
        getProducts(user.token)
            .then((res) => {
                // console.log("RES PRODUCTS--->",res)
                setProducts(res.data)
            })
    }

    const handleProductChange = (e) => {
        setProduct(e.target.value);
        products.map((p) => {
            if (p._id == e.target.value) {
                setOfferDetail(p.title)
            }
        })

        // console.log("SELECTED PRODUCT--->",product)
    }

    const handleSubmit = (e) => {

        createProductOffer({ name, expiry, product, discount, offerDetail }, user.token)
            .then((res) => {
                console.log("RES FROM PRODUCT OFFER--->", res)
                toast("Product Offer created");
                history.push("/admin/offer-management")
            })

    }

    const validate = (e) => {
        e.preventDefault();

        var val_name = document.getElementById("proname")
        var val_product = document.getElementById("propro")
        var val_expiry = document.getElementById("proexpiry")
        var val_discount = document.getElementById("prodiscount")

        // console.log("IMMEDIATE CONSOLE+",val_category.value);

        let name_valid = false;
        let product_valid = false;
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

        if (product == '') {
            document.getElementById('errPro').innerText = 'This field cannot be empty!'
            product_valid = false
        } else {
            document.getElementById('errPro').style.display = 'none'
            product_valid = true
        }

        if (val_expiry.value === '') {
            document.getElementById('errExpiry').innerText = 'This field cannot be empty!'
            expiry_valid = false
        } else if (new Date(val_expiry.value) < Date.now()) {
            document.getElementById('errExpiry').innerText = 'Select a valid expiry date.'
            expiry_valid = false
        } else {
            document.getElementById('errExpiry').style.display = 'none'
            expiry_valid = true
        }

        if (val_discount.value === '') {
            document.getElementById('errDiscount').innerText = 'This field cannot be empty!'
            discount_valid = false
        } else if (val_discount.value < 1 || val_discount.value > 99) {
            document.getElementById('errDiscount').innerText = 'Coupon discount need to be within range 1 to 99.'
            discount_valid = false
        } else {
            document.getElementById('errDiscount').style.display = 'none'
            discount_valid = true
        }

        if (name_valid && product_valid && expiry_valid && discount_valid) {
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
                    <h2 className="shaw text-secondary mt-3">Create Product Offer</h2>
                    <div className="row justify-content-center" >
                        <div className="col-md-4">
                            <form >
                                <div className="form-group">

                                    <div className="mt-3">  <label>Offer Name</label></div>
                                    <div>
                                        <input
                                            id="proname"
                                            type="text"
                                            name="price"
                                            className="form-control text-center   grad-input p-2"
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </div>
                                    <span id='errName' className="text-danger"></span>


                                    <div className="mt-3">  <label>Select Product</label></div>
                                    <div>
                                        <select
                                            id="propro"
                                            name="category"
                                            className="form-control text-center grad-input"
                                            onChange={handleProductChange}
                                        >
                                            <option>Choose</option>
                                            {products.length > 0 &&
                                                products.map((p) => (
                                                    <option key={p._id} value={p._id}>
                                                        {p.title}
                                                    </option>
                                                ))}
                                        </select>
                                    </div>
                                    <span id='errPro' className="text-danger"></span>

                                    <div className="mt-3">  <label>Expiry</label></div>
                                    <div>
                                        <DatePicker
                                            id="proexpiry"
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
                                            id="prodiscount"
                                            type="number"
                                            name="discount"
                                            maxlength="2"
                                            className="form-control text-center   grad-input p-2"
                                            onChange={(e) => setDiscount(e.target.value)}
                                        />
                                    </div>
                                    <span id='errDiscount' className="text-danger"></span>

                                    <div>
                                        <button className=" text-center mt-3   grad-button" onClick={validate}>Submit</button>
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
export default CreateProductOffer;
