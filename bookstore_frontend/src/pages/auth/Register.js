import React, { useEffect, useState } from "react";
import { auth } from "../../firebase";
import { sendSignInLinkToEmail } from "firebase/auth";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const Register = ({ history }) => {
  const [email, setEmail] = useState("");

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) history.push("/");
  }, [user, history]);

  const handleSubmit = async (e) => {
    // e.preventDefault();

    // console.log("ENV--->", process.env.REACT_APP_REGISTER_REDIRECT_URL);

    const config = {
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true,
    };

    // let data = await auth.sendSignInLinkToEmail(email,config);
    // toast("Email send");

    await sendSignInLinkToEmail(auth, email, config);
    toast.success(
      `Email is sent to ${email}. Click the link to complete registration.`
    );

    //save user in local storage
    window.localStorage.setItem("emailForRegistration", email);

    //clear state
    setEmail("");
  };

  const validate = (e) => {
    e.preventDefault();

    var val_email = document.getElementById("regis_email").value;

    let email_valid = false;
    let mailRegex =
      /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if (!val_email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
      document.getElementById("errEmail").innerText = "Email is not valid!";
      email_valid = false;
    } else {
      document.getElementById("errEmail").style.display = "none";
      email_valid = true;
    }

    if (email_valid) {
      handleSubmit();
    }
  };

  const registerForm = () => (
    <form>
      <input
        id="regis_email"
        type="email"
        className="form-control grad-input"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        autoFocus
        required
      />
      <span id="errEmail" className="text-danger"></span>
      <br />
      <div className="d-flex justify-content-center">
        <button
          type="submit"
          onClick={validate}
          className="btn btn-raised mt-3 text-white shaw grad-button"
        >
          Register
        </button>
      </div>
    </form>
  );

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 mt-5">
          <h2 className="text-center text-secondary shaw">Register</h2>
          {registerForm()}
        </div>
      </div>
    </div>
  );
};

export default Register;
