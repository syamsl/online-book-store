import React, { useEffect, useState } from "react";
import { auth, googleAuthProvider } from "../../firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "@firebase/auth";
import { toast } from "react-toastify";
import { Button } from "antd";
import { MailOutlined, GoogleOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { createOrUpdateUser } from "../../functions/auth";

const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    let intended = history.location.state;
    if (intended) {
      return;
    } else {
      if (user && user.token) history.push("/");
    }
  }, [user, history]);

  //   if(user && user.token) history.push('/')
  // },[user, history]);

  let dispatch = useDispatch();

  const roleBasedRedirect = (res) => {
    //check if intended
    let intended = history.location.state;
    if (intended) {
      history.push(intended.from);
    } else {
      if (res.data.role === "admin") {
        history.push("/admin/dashboard");
      } else {
        history.push("/user/history");
      }
    }

    // if(res.data.role === "admin"){
    //   history.push("/admin/dashboard")
    // }else{
    //   history.push("/user/history")
    // }
  };

  const handleSubmit = async (e) => {
    setLoading(true);

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);

      // console.log(result);

      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();
      createOrUpdateUser(idTokenResult.token)
        .then((res) => {
          dispatch({
            type: "LOGGED_IN_USER",

            payload: {
              name: res.data.name,
              email: res.data.email,
              token: idTokenResult.token,
              role: res.data.role,
              _id: res.data._id,
            },
          });
          roleBasedRedirect(res);
        })
        .catch((err) => {
          // console.log('hellllooooo', err.response.data.err)
          toast.error(err.response.data.err);
        });

      // history.push('/')
    } catch (err) {
      // console.log('helloooooo', err.data);
      toast.error(err.message);
      setLoading(false);
    }
  };

  const googleLogin = async () => {
    try {
      signInWithPopup(auth, googleAuthProvider)
        .then(async (result) => {
          const { user } = result;

          const idTokenResult = await user.getIdTokenResult();

          createOrUpdateUser(idTokenResult.token)
            .then((res) => {
              dispatch({
                type: "LOGGED_IN_USER",

                payload: {
                  name: res.data.name,
                  email: res.data.email,
                  token: idTokenResult.token,
                  role: res.data.role,
                  _id: res.data._id,
                },
              });
              roleBasedRedirect(res);
            })
            .catch((err) => {
              // console.log('hellllooooo', err.response.data.err)
              toast.error(err.response.data.err);
            });

          // history.push('/')
        })
        .catch((err) => {
          // console.log(err)
          toast.error(err.message);
        });
    } catch (err) {
      // console.log(err);
      toast.error(err.message);
      setLoading(false);
    }
  };

  const validate = (e) => {
    e.preventDefault();

    var val_email = document.getElementById("log_email").value;
    var val_pass = document.getElementById("pass").value;

    let email_valid = false;
    let pass_valid = false;

    let mailRegex =
      /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if (!val_email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
      document.getElementById("errEmail").innerText = "Email is not valid!";
      email_valid = false;
    } else {
      document.getElementById("errEmail").style.display = "none";
      email_valid = true;
    }

    if (val_pass == "") {
      document.getElementById("errPass").innerText =
        "This field must not be empty";
      pass_valid = false;
    } else if (!val_pass.length > 6) {
      document.getElementById("errPass").innerText =
        "Password must be atleast 6 characters.";
      pass_valid = false;
    } else {
      document.getElementById("errPass").style.display = "none";
      pass_valid = true;
    }

    if (email_valid && pass_valid) {
      handleSubmit();
    }
  };

  const loginForm = () => (
    <form>
      <div className="form-group">
        <input
          id="log_email"
          type="email"
          className="form-control grad-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          autoFocus
        />
      </div>
      <span id="errEmail" className="text-danger"></span>

      <div className="form-group">
        <input
          id="pass"
          type="password"
          className="form-control grad-input"
          style={{ boxShadow: "5px 10px 18px #888888" }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
      </div>
      <span id="errPass" className="text-danger"></span>

      <br />
      <Button
        onClick={validate}
        type="primary"
        className="mb-3"
        style={{ boxShadow: "5px 10px 18px #888888" }}
        block
        shape="round"
        icon={<MailOutlined />}
        size="large"
        disabled={!email || password.length < 6}
      >
        Login with Email/Password
      </Button>
    </form>
  );

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 mt-5">
          {loading ? (
            <h2 className="text-danger shaw text-center">Loading...</h2>
          ) : (
            <h2 className="text-center text-secondary shaw">Login</h2>
          )}
          {loginForm()}

          <Button
            onClick={googleLogin}
            type="danger"
            className="mb-3 shaw text-center"
            style={{ boxShadow: "5px 10px 18px #888888" }}
            block
            shape="round"
            icon={<GoogleOutlined />}
            size="large"
          >
            Login with Google
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
