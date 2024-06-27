import React from "react";
import { Form, Button } from "react-bootstrap";
import "./signin.css";
import { useForm } from "react-hook-form";
import BackgroundImage from "../assets/images/background.jpg";
import Logo from "../assets/images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useUserSignInMutation } from "../hooks/react-query/query-hooks/authQuery.hooks";
import { RiCloseCircleLine } from "react-icons/ri";
import "../layouts/Header.css";

const Signin = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //handle signIn method
  const { mutate } = useUserSignInMutation();

  const onSubmit = (data) => mutate(data);

  return (
    <>
      <div
        className="sign-in__wrapper"
        style={{ backgroundImage: `url(${BackgroundImage})`, height: "85.2vh" }}
      >
        <Form
          className="shadow p-4 bg-white rounded"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="row">
            <div className="col-8">
              <img
                className="img-thumbnail ms-auto d-block mb-2"
                src={Logo}
                alt="logo"
                id="logo2"
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
          <h2 className="text-center text-info">Sign In</h2>
          <Form.Group className="mb-2" controlId="email">
            {/* <Form.Label>Email</Form.Label> */}
            <Form.Control
              type="email"
              placeholder="Email"
              required
              {...register("email", { required: true })}
            />
            {errors.email && <span>This field is required</span>}
          </Form.Group>
          <Form.Group className="mb-2" controlId="password">
            {/* <Form.Label>Password</Form.Label> */}
            <Form.Control
              type="password"
              placeholder="Password"
              required
              {...register("password", { required: true })}
            />
            {errors.password && <span>This field is required</span>}
          </Form.Group>
          <Form.Group className="mb-2" controlId="checkbox">
            <Form.Check type="checkbox" label="Remember me" />
          </Form.Group>
          <Button className="w-100" variant="primary" type="submit">
            Log In
          </Button>
          <div className="d-grid justify-content-end">
            <Button
              className="text-muted px-0"
              variant="link"
              onClick={() => navigate("/signup")}
            >
              Create an Account
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default Signin;
