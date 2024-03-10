import React, { useState } from "react";
import UserNav from "../../components/nav/UserNav";
import { auth } from "../../firebase";
import { toast } from "react-toastify";

const Password = () => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    //   console.log(password);
    await auth.currentUser
      .updatePassword(password)
      .then(() => {
        setLoading(false);
        setPassword("");
        toast.success("Password Updated");
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.message);
      });
  };

  const passwordUpdateForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          className="form-control grad-input"
          placeholder="Enter new password"
          disabled={loading}
          value={password}
        />
        <div className="d-flex justify-content-center mt-4">
          <button
            className="btn btn-raised grad-button text-white shaw"
            disabled={!password || password.length < 6 || loading}
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  );
  return (
    <div className="container-fluid mt-5">
      <div className="row">
        <div className="col-md-2">
          <UserNav />
        </div>
        <div className="col-md-10">
          <div className="d-flex justify-content-center mt-4">
            {loading ? (
              <h2 className="text-danger shaw text-center">Loading...</h2>
            ) : (
              <h2 className="text-secondary shaw text-cente ">
                Password Update
              </h2>
            )}
          </div>
          <div className="d-flex justify-content-center">
            {passwordUpdateForm()}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Password;
