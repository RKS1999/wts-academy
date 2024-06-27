import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Logo from "../assets/images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../redux/slice/authSlice";
import { profile_pic } from "../Api/Endpoints";
import { Container, Nav, Navbar, Dropdown } from "react-bootstrap";
import "../layouts/Header.css";

function Header() {
  const dispatch = useDispatch();
  // const { isLoggedIn, user, profileImage } = useSelector((state) => state.auth);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const firstName = localStorage.getItem("fname");
  const lastName = localStorage.getItem("lname");
  const profileImage = localStorage.getItem("propic");
  const token = localStorage.getItem("token");

  const handleProfile = () => {
    navigate("/profiledetails");
    setShowDropdown(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/signin");
    setShowDropdown(false);
  };

  const handleToggleDropdown = () => setShowDropdown(!showDropdown);

  return (
    <Navbar expand="lg" bg="black" data-bs-theme="dark">
      <Container>
        <Navbar.Brand to="/">
          <img src={Logo} alt="logo" id="logo1" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Link className="nav-link active " to="/">
              Home
            </Link>
            <Link className="nav-link active " to="/productList">
              Products
            </Link>
            {token && (
              <>
                <div className="position-relative mt-2 ms-4 d-flex">
                  <span className="text-white">{firstName} {lastName}</span>
                  <div className="ms-4">
                    <img
                      src={profileImage ? profile_pic(profileImage) : "error"}
                      alt="Profile"
                      style={{
                        width: "30px",
                        height: "30px",
                        borderRadius: "50%",
                        cursor: "pointer",
                      }}
                      onClick={handleToggleDropdown}
                    />
                  </div>
                  <Dropdown.Menu
                    show={showDropdown}
                    align="end"
                    className="mt-0"
                    style={{ backgroundColor: "gray" }}
                  >
                    <Dropdown.Item onClick={handleProfile}>
                      <i className="bi bi-person-circle"></i> Profile
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={handleLogout}>
                      <i className="bi bi-box-arrow-right"></i> Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </div>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
