import React from "react";
import Resizer from "react-image-file-resizer";
import axios from "axios";
import { useSelector } from "react-redux";
import { Avatar, Badge } from "antd";
import { addUserImage, deleteUserImage } from "../../functions/user";

const ProfileFileUpload = ({ image, setImage, setLoading }) => {
  const { user } = useSelector((state) => ({ ...state }));

  const fileUploadAndResize = (e) => {
    //   console.log(e.target.files);
    // resize
    let files = e.target.files[0];

    if (files) {
      setLoading(true);
        Resizer.imageFileResizer(
          files,
          720,
          720,
          "JPEG",
          100,
          0,
          (uri) => {
            // console.log(uri);
            axios
              .post(
                `${process.env.REACT_APP_API}/uploadimageuser`,
                { image: uri },
                {
                  headers: {
                    authtoken: user ? user.token : "",
                  },
                }
              )
              .then((res) => {
                console.log("IMAGE UPLOAD RES DATA", res);
                addUserImage(user.token,res.data.url)
                .then(res => console.log("res"))
                .catch((err) =>{console.log(err)})
                setLoading(false);
                setImage(res.data);
              })
              .catch((err) => {
                setLoading(false);
                console.log("CLOUDINARY UPLOAD ERR", err);
              });
          },
          "base64"
        );
    } // send back to server to upload cloudinary
    // set url to images[] in the parent component - ProductCreate
  };
  const handleImageRemove = (public_id) => {
    setLoading(true);
    // console.log("remove image",public_id);
    axios.post(
      `${process.env.REACT_APP_API}/removeimageuser`,
      { public_id },
      {
        headers: {
          authtoken: user ? user.token : "",
        },
      }
    )
    .then(res => {
        setLoading(false)
        setImage('');
        // console.log(res.data)
        addUserImage(user.token, "")
        .then(res => console.log("res"))
        .catch((err) =>{console.log(err)})
    })
    .catch(err => {
        console.log(err)
        setLoading(false);
    })
  };

  return (
    <>
      <div className="row">
        {image &&
           (
            <Badge
              count="X"
              onClick={() => handleImageRemove(image.public_id)}
              style={{ cursor: "pointer" }}
            >
              <Avatar
                src={image .url? image.url : image}
                size={100}
                shape="circle"
                className="ml-3"
              />
            </Badge>
          )}
      </div>
      <div className="row">
        <label className="btn grad-button text-dark btn-raised mt-3">
          {" "}
          Choose File
          <input
            type="file"
            
            hidden
            accept="images/*"
            onChange={fileUploadAndResize}
          />
        </label>
      </div>
    </>
  );
};
export default ProfileFileUpload;
