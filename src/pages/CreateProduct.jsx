import React, { useState } from "react";
import { useForm } from "react-hook-form";
// import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { useProductCreateMutation } from "../hooks/react-query/query-hooks/productQuery.hooks";
import { RiCloseCircleLine } from "react-icons/ri";
import BackgroundImage from "../assets/images/background.jpg";

const CreateProduct = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //handle image

  const [img, setImg] = useState(null);

  //create product method

  const { mutate } = useProductCreateMutation();

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    if (img) {
      formData.append("image", img);
    }
    mutate(formData);
  };

  return (
    <div
      className="sign-in__wrapper"
      style={{ backgroundImage: `url(${BackgroundImage})`, height: "85.2vh" }}
    >
      <div className="container-fluid">
        <form
          className="container-fluid shadow p-4 bg-white rounded mt-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="row">
            <div className="col-10 mb-2">
              <h2 className="text-center text-info">Create Product</h2>
            </div>
            <div className="col-2 ms-auto d-block mb-2">
              <Link
                to="/productList"
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

          <div className="mb-3">
            {/* <label htmlFor="title" className="form-label">
              Title
            </label> */}
            <input
              type="text"
              placeholder="Title"
              name="title"
              className="form-control"
              id="title"
              {...register("title", { required: true })}
            />
            {errors.title && <span>This field is required</span>}
          </div>
          <div className="mb-3">
            {/* <label htmlFor="description" className="form-label">
              Description
            </label> */}
            <textarea
              name="description"
              placeholder="Description"
              className="form-control"
              id="description"
              rows="3"
              {...register("description", { required: true })}
            />
            {errors.description && <span>This field is required</span>}
          </div>
          <div className="mb-3">
            <label htmlFor="image" className="form-label">
              Image
            </label>
            <input
              type="file"
              onChange={(e) => setImg(e.target.files[0])}
              accept="image/*"
              className="form-control"
            />
            {img && (
              <img
                style={{ height: "180px", marginTop: "10px" }}
                src={URL.createObjectURL(img)}
                alt="Preview"
                className="upload-img"
              />
            )}
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
      {/* <ToastContainer /> */}
    </div>
  );
};

export default CreateProduct;
