import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import EmailIcon from "@mui/icons-material/Email";
import HttpsIcon from "@mui/icons-material/Https";

export default function Login() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  let navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    const response = await fetch("http://localhost:5000/api/loginuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });

    const json = await response.json();

    if (!json.success) {
      alert("Enter Valid Cred");
    }
    if (json.success) {
      navigate("/");
      localStorage.setItem("userEmail", credentials.email);
      localStorage.setItem("authToken", json.authToken);
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
        style={{
          backgroundColor: "transparent",
          marginTop: "20px",
          marginBottom: "100px",
        }}
      >
        <div className="container h-100 login-mx-border">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black mx-card-login">
                <div className="card-body card-body-form  p-md-5">
                  <div className="row justify-content-center">
                    <div class="col-md-9 col-lg-6 col-xl-5">
                      <img
                        src="https://www.go.ooo/img/bg-img/Login.jpg"
                        class="img-fluid"
                        alt="Sample "
                      />
                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4 text-white">
                        Login Here
                      </p>

                      <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>
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
                              placeholder="Password "
                            />
                          </div>
                        </div>

                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button type="submit" className="m-3 btn btn-success">
                            Submit
                          </button>
                          <Link to="/createuser" className="m-3 btn btn-danger">
                            Not A User!
                          </Link>
                        </div>
                      </form>
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
