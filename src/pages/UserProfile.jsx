import React from "react";
import { profile_pic } from "../Api/Endpoints";
import { Link } from "react-router-dom";
import { RiCloseCircleLine } from "react-icons/ri";

const UserProfile = () => {
  const firstName = localStorage.getItem("fname");
  const lastName = localStorage.getItem("lname");
  const email = localStorage.getItem("email");
  const profileImage = localStorage.getItem("propic");
  const token = localStorage.getItem("token");

  return (
    <div className="container mt-5 p-2" style={{ height: "78.6vh" }}>
      <div style={{ flex: "wrap" }}>
        {token && (
          <div className="row">
            <div className="col-7 text-center">
              <img
                src={profileImage ? profile_pic(profileImage) : "error"}
                alt="Profile"
                style={{
                  width: "300px",
                  height: "300px",
                  borderRadius: "50%",
                  cursor: "pointer",
                }}
              />
            </div>
            <div className="col-5">
              <br />
              <div className="row" style={{ paddingTop: "20px" }}>
                <div className="col-11">
                  <h1 className="text-info">User Profile Details</h1>
                </div>
                <div className="col-1">
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
              <br />
              <h3 className="card-title mt-3">
                Name : {firstName} {lastName}
              </h3>
              <h3 className="card-title mt-3">Email : {email}</h3>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
