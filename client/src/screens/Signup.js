import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import HttpsIcon from "@mui/icons-material/Https";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import Footer from "../components/Footer";

export default function Signup() {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    location: "",
  });
  const navigate = useNavigate();
  async function handleSubmit(event) {
    event.preventDefault();
    const response = await fetch("http://localhost:5000/api/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
        location: credentials.location,
      }),
    });

    const json = await response.json();

    if (!json.success) {
      alert("Enter Valid Credentials");
    } else {
      navigate("/login");
    }
  }
  function handleChange(event) {
    setCredentials((prevItems) => {
      return {
        ...prevItems,
        [event.target.name]: event.target.value,
      };
    });
  }
  return (
    <>
      <Navbar />
      <section
        className="vh-100"
        style={{ marginTop: "20px", marginBottom: "100px" }}
      >
        <div className="container h-100  mb-5">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div
                className="card  card-body-form text-black"
                style={{ borderRadius: "25px" }}
              >
                <div className="card-body p-md-5">
                  <div div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4 text-white">
                        Create an Account
                      </p>

                      <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>
                        <div className="d-flex flex-row align-items-center mb-4">
                          <PersonIcon style={{ fontSize: "2rem" }} />
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="text"
                              className="form-control"
                              id="name"
                              name="name"
                              value={credentials.name}
                              onChange={handleChange}
                              placeholder="Your Name"
                            />
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <EmailIcon style={{ fontSize: "2rem" }} />
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="email"
                              className="form-control"
                              id="exampleInputEmail1"
                              name="email"
                              value={credentials.email}
                              onChange={handleChange}
                              placeholder="Your Email"
                            />
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <HttpsIcon style={{ fontSize: "2rem" }} />
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="password"
                              className="form-control"
                              id="exampleInputPassword1"
                              name="password"
                              value={credentials.password}
                              onChange={handleChange}
                              placeholder="Password Min-5 characters"
                            />
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <AddLocationIcon style={{ fontSize: "2rem" }} />
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="text"
                              className="form-control"
                              name="location"
                              value={credentials.location}
                              onChange={handleChange}
                              placeholder="Location"
                            />
                          </div>
                        </div>

                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button type="submit" className="m-3 btn btn-success">
                            Submit
                          </button>
                          <Link to="/login" className="m-3 btn btn-danger">
                            Already a User
                          </Link>
                        </div>
                      </form>
                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                        className="img-fluid"
                        alt="Sample"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
