import React, { useState } from "react";
import { Select } from "antd";
const { Option } = Select;

const ProductCreateForm = ({
  handleSubmit,
  handleChange,
  setValues,
  values,
  handleCategoryChange,
  subOptions,
  showSub,
  imageState,
  err
}) => {
  //destructur
  const {
    title,
    description,
    price,
    categories,
    category,
    subs,
    shipping,
    quantity,
    images,
    authors,
    brands,
    author,
    brand,
  } = values;

  

  const validate = (e) => {
    e.preventDefault();

    var val_title = document.getElementById("pro_title")
    var val_description = document.getElementById("pro_desc")
    var val_price = document.getElementById("pro_price")
    var val_quantity = document.getElementById("pro_quan")
    // var val_address = document.getElementById("add-address)

    let title_valid = false
    let desc_valid = false
    let price_valid = false
    let quantity_valid = false
    let image_valid =false
    let ship_valid = false
    let color_valid = false
    let brand_valid = false
    let category_valid = false
    // let sub_valid = false

    if (images.length<3) {
      document.getElementById('errImage').innerText = "Number of images must be atleast 3"
      image_valid = false
    }else if(images.length>5){
      document.getElementById('errImage').innerText = "Number of images not more than 5"
      image_valid = false
    } else {
      document.getElementById('errImage').style.display = 'none'
      image_valid = true
    }

    if (val_title.value === '') {
      document.getElementById('errTitle').innerText = 'This field cannot be empty!'
      title_valid = false
    } else if (val_title.value.length < 4) {
      document.getElementById('errTitle').innerText = 'Name should have atleast 4 characters.'
      title_valid = false
    } else {
      document.getElementById('errTitle').style.display = 'none'
      title_valid = true
    }

    if (val_description.value === '') {
      document.getElementById('errDescription').innerText = 'This field cannot be empty!'
      desc_valid = false
    } else if (val_description.value.length < 15) {
      document.getElementById('errDescription').innerText = 'Description should have atleast 15 characters.'
      desc_valid = false
    } else {
      document.getElementById('errDescription').style.display = 'none'
      desc_valid = true
    }

    if (val_price.value === '') {
      document.getElementById('errPrice').innerText = 'This field cannot be empty!'
      price_valid = false
    } else if (val_price.value.length < 1) {
      document.getElementById('errPrice').innerText = 'Price must not be less than 1'
      price_valid = false
    } else {
      document.getElementById('errPrice').style.display = 'none'
      price_valid = true
    }

    if (val_quantity.value === '') {
      document.getElementById('errQuantity').innerText = 'This field cannot be empty!'
      quantity_valid = false
    } else if (val_quantity.value.length < 0) {
      document.getElementById('errQuantity').innerText = 'Price must not be less than 0'
      quantity_valid = false
    } else {
      document.getElementById('errQuantity').style.display = 'none'
      quantity_valid = true
    }

    if(shipping==""){
      document.getElementById('errShip').innerText = "This field cannot be empty!"
      ship_valid = false
    }else{
      document.getElementById('errShip').style.display = 'none'
      ship_valid = true
    }

    if(author==""){
      document.getElementById('errColor').innerText = "This field cannot be empty!"
      color_valid = false
    }else{
      document.getElementById('errColor').style.display = 'none'
      color_valid = true
    }


    if(brand==""){
      document.getElementById('errBrand').innerText = "This field cannot be empty!"
      brand_valid = false
    }else{
      document.getElementById('errBrand').style.display = 'none'
      brand_valid = true
    }

    if(category==""){
      document.getElementById('errCategory').innerText = "This field cannot be empty!"
      category_valid = false
    }else{
      document.getElementById('errCategory').style.display = 'none'
      category_valid = true
    }


    // if(subs==""){
    //   document.getElementById('errSubs').innerText = "This field cannot be empty!"
    //   sub_valid = false
    // }else{
    //   document.getElementById('errSubs').style.display = 'none'
    //   sub_valid = true
    // }

    if (title_valid && desc_valid && price_valid && quantity_valid && image_valid && ship_valid && color_valid && brand_valid && category_valid) {
      handleSubmit();
    }


  }

  return (
    <form >
      <div className="form-group">
        <span id='errImage' className="text-danger"></span>
        <br />
        <label>Title</label>
        <input
          id="pro_title"
          type="text"
          name="title"
          className="form-control"
          value={title}
          onChange={handleChange}
        />
      </div>
      <span id='errTitle' className="text-danger"></span>

      <div className="form-group">
        <label>Description</label>
        <input
        id="pro_desc"
          type="text"
          name="description"
          className="form-control"
          value={description}
          onChange={handleChange}
        />
      </div>
      <span id='errDescription' className="text-danger"></span>

      <div className="form-group">
        <label>Price</label>
        <input
        id="pro_price"
          type="number"
          name="price"
          className="form-control"
          value={price}
          onChange={handleChange}
        />
      </div>
      <span id='errPrice' className="text-danger"></span>

      <div className="form-group">
        <label>Shipping</label>
        <select
          name="shipping"
          className="form-control"
          onChange={handleChange}
        >
          <option>Choose</option>
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>
      </div>
      <span id='errShip' className="text-danger"></span>


      <div className="form-group">
        <label>Quantity</label>
        <input
        id="pro_quan"
          type="number"
          name="quantity"
          className="form-control"
          value={quantity}
          onChange={handleChange}
        />
      </div>
      <span id='errQuantity' className="text-danger"></span>

      <div className="form-group">
        <label>Author</label>
        <select name="author" className="form-control" onChange={handleChange}>
          <option>Choose</option>
          {authors.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
      <span id='errColor' className="text-danger"></span>

      <div className="form-group">
        <label>Brand</label>
        <select name="brand" className="form-control" onChange={handleChange}>
          <option>Choose</option>
          {brands.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>
      <span id='errBrand' className="text-danger"></span>

      <div className="form-group">
        <label>Category</label>
        <select
          name="category"
          className="form-control"
          onChange={handleCategoryChange}
        >
          <option>Choose</option>
          {categories.length > 0 &&
            categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
        </select>
      </div>
      <span id='errCategory' className="text-danger"></span>

      {showSub &&
      <>
        <div>
          <label>Sub Categories</label>
          <Select
            mode="multiple"
            style={{ width: "100%" }}
            placeholder="Please select"
            value={subs}
            onChange={(value) => setValues({ ...values, subs: value })}
          >
            {subOptions.length &&
              subOptions.map((s) => (
                <Option key={s._id} value={s._id}>
                  {s.name}
                </Option>
              ))}
          </Select>
        </div>
        {/* <span id='errSubs' className="text-danger"></span> */}
        </>
      }

      <br />
      <button className="btn btn-outline-info " onClick={validate}>SAVE</button>
    </form>
  );
};

export default ProductCreateForm;
