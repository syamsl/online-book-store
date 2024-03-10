import React, { useEffect, useState } from "react";
import { auth } from "../../firebase";
import { signInWithEmailLink, updatePassword } from "@firebase/auth";
import { toast } from "react-toastify";
import { useDispatch} from "react-redux";
import { createOrUpdateUser } from "../../functions/auth";

const RegisterComplete = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const { user } = useSelector((state) => ({ ...state }));
  let dispatch = useDispatch();

  useEffect(() => {
    setEmail(window.localStorage.getItem("emailForRegistration"));

    // console.log(window.location.href);
    // console.log(window.localStorage.getItem('emailForRegistration'));
  }, []);

  const handleSubmit = async (e) => {

    // validation

    if (!email || !password) {
      toast.error("Email and Password is required");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be atleast 6 characters long");
      return;
    }

    try {
      const result = await signInWithEmailLink(auth,
        email,
        window.location.href
      );

      // console.log('RESULT', result);

      if (result.user.emailVerified) {
        //remove user email from localStorage

        window.localStorage.removeItem("emailForRegistration");

        //get user id token

        let user = auth.currentUser;

        await updatePassword(user,password);

        const idTokenResult = await user.getIdTokenResult();

        //redux store

        // console.log("user", user, "idTokenResult", idTokenResult);

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
          })
          .catch(err=>console.log(err));

        //redirect

        history.push("/");
      }
    } catch (error) {
      // console.log(error);
      toast.error(error.message);
    }
  };

  const validate = (e) =>{
    e.preventDefault()

    var val_pass = document.getElementById("pass").value

    let pass_valid = false

    if(val_pass==""){
      document.getElementById('errPass').innerText = "This field must not be empty"
      pass_valid = false
    }else if(!val_pass.length>6){
      document.getElementById('errPass').innerText = "Password must be atleast 6 characters."
      pass_valid = false
    }else{
      document.getElementById('errPass').style.display = 'none'
      pass_valid = true
    }
    
    if(pass_valid){
      handleSubmit()
    }

}

  const completeRegistrationForm = () => (
    <form>
      <input type="email" className="form-control" value={email} disabled />
      <input
        id="pass"
        type="password"
        className="form-control grad-input"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        autoFocus
      />
      <span id='errPass' className="text-danger"></span>
       <div className="d-flex justify-content-center">
      <button onClick={validate} className="btn btn-raised p-2 grad-button text-white shaw">
        Complete Registration
      </button>
      </div>
    </form>
  );

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 mt-5 ">
        <h4 className="text-center text-secondary shaw">Register Complete</h4>
        {completeRegistrationForm()}
        </div>
      </div>
    </div>
  );
};

export default RegisterComplete;
