import React, { useEffect, useState } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { createProduct } from "../../../functions/product";
import ProductCreateForm from "../../../components/forms/ProductCreateForm";
import { getCategories, getCategorySubs } from "../../../functions/category";
import FileUpload from "../../../components/forms/FileUpload";
import { LoadingOutlined } from "@ant-design/icons";

const initialState = {
  title: "",
  description: "",
  price: "",
  categories: [],
  category: "",
  subs: [],
  shipping: "",
  quantity: "",
  images: [],
  authors: ["William Shakespeare", "Agatha Christie", "Barbara Cartland", "J. K. Rowling", "Tom Clancy"],
  brands: [
    "Penguin Random House",
    "Harper Collins",
    "Simon and Schuster",
    "Macmillan Publishers",
    "Hachette Book Group",
  ],
  author: "",
  brand: "",
};

const ProductCreate = () => {
  const [values, setValues] = useState(initialState);
  const [subOptions, setSubOptions] = useState([]);
  const [showSub, setShowSub] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageState, setImageState] = useState("");
  const [formState, setFormState] = useState(false);
  const [err, setErr] = useState('')

  //redux
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () =>
    getCategories().then((c) => setValues({ ...values, categories: c.data }));

  const handleSubmit = (e) => {

    createProduct(values, user.token)
      .then((res) => {
        console.log("RESPONSE +++>>", res);
        toast.success(`${res.data.title} is created`);
        setTimeout(() => {
          window.location.reload();
        }, 4000);
      })
      .catch((err) => {
        console.log(err);
        // if (err.response.status === 400) toast.error(err.response.data);
        toast.error(err.response.data.err);
      });
    //
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    // console.log(e.target.name,' ----- ', e.target.value);
  };

  const handleCategoryChange = (e) => {
    // e.preventDefault();
    console.log("CLICKED CATEGORY", e.target.value);
    setValues({ ...values, subs: [], category: e.target.value });
    getCategorySubs(e.target.value).then((res) => {
      console.log("SUB OPTIONS ON CATEGORY CLICK", res);
      setSubOptions(res.data);
    });
    setShowSub(true);
  };

  return (
    <div className="container-fluid mt-5">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-10">
          {loading ? (
            <LoadingOutlined className="text-danger h1 mt-3" />
          ) : (
            <h4 className="mt-3">Create Product</h4>
          )}
          <hr />

          {/* {JSON.stringify(values.images)} */}

          <div className="p-3">
            <FileUpload
              imageState={imageState}
              setImageState={setImageState}
              values={values}
              setValues={setValues}
              setLoading={setLoading}
              err={err}
              setErr={setErr}
            />
          </div>

          <ProductCreateForm
            imageState={imageState}
            formState={formState}
            setFormState={setFormState}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            setValues={setValues}
            values={values}
            handleCategoryChange={handleCategoryChange}
            subOptions={subOptions}
            showSub={showSub}
            err={err}
            setErr={setErr}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCreate;
