import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useParams } from "react-router-dom";
import {
  useGetProductById,
  useProductUpdateMutation,
} from "../hooks/react-query/query-hooks/productQuery.hooks";
import { RiCloseCircleLine } from "react-icons/ri";
import BackgroundImage from "../assets/images/background.jpg";

const EditProduct = () => {
  const { id } = useParams();

  //fetch product by Id
  const { data, isError, isLoading } = useGetProductById(id);
  //  console.log(data)

  //Upadate method
  const { mutate } = useProductUpdateMutation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [img, setImg] = useState(null);

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    if (img) {
      formData.append("image", img);
    }
    formData.append("id", id);
    mutate(formData);
  };

  //for show data in the input box
  useEffect(() => {
    if (!isLoading && !isError && data) {
      setValue("title", data.title);
      setValue("description", data.description);
    }
  }, [data, setValue, isLoading, isError]);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading product details</p>;

  return (
    <div
      className="sign-in__wrapper"
      style={{ backgroundImage: `url(${BackgroundImage})`, height: "85.2vh" }}
    >
      <div className="container-fluid">
        <form
          className="container shadow p-4 bg-white rounded mt-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="row">
            <div className="col-10 mb-2">
              <h2 className="text-center text-info">Update Product</h2>
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
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              name="title"
              className="form-control"
              id="title"
              {...register("title", { required: true })}
            />
            {errors.title && <span>This field is required</span>}
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              name="description"
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
            Update
          </button>
        </form>
      </div>
      <ToastContainer />
      <hr />
    </div>
  );
};

export default EditProduct;
