import React, { useState } from "react";
import { useForm } from "react-hook-form";
// import { Form, Button } from "react-bootstrap";
// import { ToastContainer } from "react-toastify";
import "./signup.css";
import BackgroundImage from "../assets/images/background.jpg";
import { useUserSignUpMutation } from "../hooks/react-query/query-hooks/authQuery.hooks";
import { Link } from "react-router-dom";
import Logo from "../assets/images/logo.png";
import { RiCloseCircleLine } from "react-icons/ri";
import "../layouts/Header.css";

const Signup = () => {
  //mutation nethod for signUp

  const { mutate } = useUserSignUpMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //image handle

  const [img, setImg] = useState(null);

  //form submit

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("first_name", data.first_name);
    formData.append("last_name", data.last_name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    if (img) {
      formData.append("profile_pic", img);
    }
    mutate(formData);
  };

  return (
    <>
      <div
        className="sign-in__wrapper text-center"
        style={{ backgroundImage: `url(${BackgroundImage})`, height: "85.2vh" }}
      >
        
        <form
          className="shadow p-4 bg-white rounded"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="row">
            <div className="col-8">
              <img
                className="img-thumbnail ms-auto d-block mb-2"
                src={Logo}
                alt="logo"
                id="logo3"
              />
            </div>
            <div className="col-3 ms-auto d-block mb-2">
              <Link
                to="/"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "25px",
                  textDecoration: "none",
                  color: "red",
                }}
              >
                <RiCloseCircleLine />
              </Link>
            </div>
          </div>
          <h3 className="text-center text-info">Sign Up</h3>
          <div className="mb-3">
            {/* <label htmlFor="exampleInputFirstName" className="form-label">
              First Name
            </label> */}
            <input
              type="text"
              placeholder="First Name"
              name="first_name"
              className="form-control"
              id="exampleInputFirstName"
              {...register("first_name", { required: true })}
            />
            {errors.first_name && <span>This field is required</span>}
          </div>
          <div className="mb-3">
            {/* <label htmlFor="exampleInputLastName" className="form-label">
              Last Name
            </label> */}
            <input
              type="text"
              placeholder="Last Name"
              name="last_name"
              className="form-control"
              id="exampleInputLastName"
              {...register("last_name", { required: true })}
            />
            {errors.last_name && <span>This field is required</span>}
          </div>
          <div className="mb-3">
            {/* <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label> */}
            <input
              type="email"
              placeholder="Email address"
              name="email"
              className="form-control"
              id="exampleInputEmail1"
              {...register("email", { required: true })}
            />
            {errors.email && <span>This field is required</span>}
          </div>
          <div className="mb-3">
            {/* <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label> */}
            <input
              type="password"
              placeholder="Password"
              name="password"
              className="form-control"
              id="exampleInputPassword1"
              {...register("password", { required: true })}
            />
            {errors.password && <span>This field is required</span>}
          </div>
          <div className="mb-3">
            <label
              htmlFor="exampleInputProfilePic"
              className="form-label"
              style={{
                display: "flex",
                justifyContent: "left",
                alignItems: "left",
              }}
            >
              Profile Picture
            </label>
            <input
              type="file"
              onChange={(e) => setImg(e.target.files[0])}
              accept="image/*"
              className="form-control"
            />
            {img && (
              <img
                style={{ height: "180px" }}
                src={URL.createObjectURL(img)}
                alt=""
                className="upload-img"
              />
            )}
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          <div className="d-grid justify-content-end">
            <Link to="/signin" style={{ color: "black", margin: "5px" }}>
              Already have Account!
            </Link>
          </div>
        </form>
      </div>
      {/* <ToastContainer /> */}
    </>
  );
};

export default Signup;
