import React, { useState, useEffect } from "react";
import UserNav from "../../components/nav/UserNav";
import ProfileFileUpload from "../../components/forms/ProfileFileUpload";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import AddAddressForm from "../../components/forms/AddAddressForm";
import { useSelector } from "react-redux";
import {
  getUserDetails,
  editUserDetails,
  deleteUserAddress,
} from "../../functions/user";
import { toast } from "react-toastify";

const History = () => {
  const { user } = useSelector((state) => ({ ...state }));

  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [addressName, setAddressName] = useState("");
  const [mobile, setMobile] = useState("");
  const [street, setStreet] = useState("");
  const [pincode, setPincode] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState([]);
  const [newAddress, setNewAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [nameEdit, setNameEdit] = useState(false);
  const [mobileEdit, setMobileEdit] = useState(false);
  const [nameSave, setNameSave] = useState(false);
  const [mobileSave, setMobileSave] = useState(false);

  useEffect(() => {
    loadUserDetails();
  }, []);

  const loadUserDetails = () =>
    getUserDetails(user.token).then((u) => {
      // console.log(u)
      setName(u.data.name);
      setMobile(u.data.mobile);
      setAddress(u.data.address);
      setImage(u.data.image);
    });

  const handleEdit = () => {
    setNameEdit(true);
    setNameSave(true);
    setMobileEdit(true);
    setMobileSave(true);
  };

  const handleNameSave = () => {
    editUserDetails(user.token, name, mobile, {})
      .then((u) => {
        // console.log("RES from backend--->", u)

        setLoading(false);
        setNameEdit(false);
        setNameSave(false);
        toast.success("User Name updated");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleMobileSave = () => {
    editUserDetails(user.token, name, mobile, {})
      .then((u) => {
        // console.log("RES from backend--->", u)

        setLoading(false);
        setMobileEdit(false);
        setMobileSave(false);
        toast.success("User Mobile updated");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleRemove = (id) => {
    deleteUserAddress(user.token, id)
      .then((res) => {
        // console.log("DELETE RES--->", res);
        toast.success("Address deleted.");
        loadUserDetails();
      })
      .catch((err) => {
        console.log("DELETE ERR--->", err);
      });
  };

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
      loadUserDetails();
    });
  };

  const validate = () => {
    let name_valid = false;
    let mobile_valid = false;

    if (name === "") {
      document.getElementById("errUserName").innerText =
        "Name must not be empty!";
      name_valid = false;
    } else if (name.length < 4) {
      document.getElementById("errUserName").innerText =
        "Name must have atleast 4 characters";
      name_valid = false;
    } else {
      document.getElementById("errUserName").style.display = "none";
      name_valid = true;
    }

    if (mobile === "") {
      document.getElementById("errUserMobile").innerText =
        "Mobile must not be empty!";
      mobile_valid = false;
    } else if (!(mobile.length === 10)) {
      document.getElementById("errUserMobile").innerText =
        "Mobile must be 10 digits";
      mobile_valid = false;
    } else if (!(typeof mobile === "string")) {
      document.getElementById("errUserMobile").innerText =
        "Mobile number must be number";
      mobile_valid = false;
    } else {
      document.getElementById("errUserMobile").style.display = "none";
      mobile_valid = true;
    }

    if (name_valid && mobile_valid) {
      handleNameSave();
      handleMobileSave();
    }
  };

  return (
    <div className="container-fluid mt-5">
      <div className="row">
        <div className="col-md-2">
          <UserNav />
        </div>

        <div className="col-md-10">
          <div className="mt-5">
            <h2 className="text-center shaw text-secondary">User Profile</h2>
            <hr />
          </div>

          <div className="row">
            <div className="mt-4 col-md-4">
              <div className="d-flex justify-content-center">
                <div>
                  <ProfileFileUpload
                    image={image}
                    setImage={setImage}
                    setLoading={setLoading}
                  />
                  <div className="col"></div>
                </div>
              </div>
            </div>

            <div className="col-md-8">
              <div className="d-flex justify-content-center">
                <div>
                  <h3 className="text-secondary shaw text-center">
                    User Details
                  </h3>
                  <label className="text-dark shaw"> Name : </label>
                  <input
                    id="name"
                    className="grad-input text-center m-4"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    disabled={!nameEdit}
                  />
                  <br />
                  <div>
                    <span id="errUserName" className="text-danger"></span>
                  </div>
                  <label className="text-dark shaw">Mobile : </label>
                  <input
                    id="mobile"
                    className="grad-input text-center m-4"
                    type="Number"
                    onChange={(e) => setMobile(e.target.value)}
                    value={mobile}
                    disabled={!mobileEdit}
                  />
                  <span
                    onClick={() => {
                      handleEdit();
                    }}
                    className="btn btn-lg btn-raised float-right  grad-button mt-4"
                  >
                    <EditOutlined className="text-info" />
                  </span>
                  <button
                    className="btn btn-raised grad-button m-2"
                    onClick={() => {
                      validate();
                    }}
                  >
                    {" "}
                    save
                  </button>
                  <div>
                    <span id="errUserMobile" className="text-danger"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <hr />
              {address && (
                <h2 className="text-secondary shaw text-center mt-4">
                  Address
                </h2>
              )}
              {address.map((c) => (
                <>
                  <div className="d-flex justify-content-center mt-4">
                    <textarea
                      disabled
                      className="grad-input"
                      cols="30"
                      rows="2"
                      value={`${c.name} \nStreet: ${c.street} \nPincode: ${c.pincode} \nAddress: ${c.address}`}
                    />
                    <span
                      onClick={() => {
                        handleRemove(c.id);
                      }}
                      className="btn btn-lg btn-raised float-right  grad-button m-3"
                    >
                      <DeleteOutlined className="text-danger" />
                    </span>
                  </div>
                </>
              ))}
            </div>

            <div className="col-md-6">
              <AddAddressForm
                handleSubmit={handleSubmit}
                setAddressName={setAddressName}
                setStreet={setStreet}
                setPincode={setPincode}
                setCity={setCity}
                setNewAddress={setNewAddress}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default History;
