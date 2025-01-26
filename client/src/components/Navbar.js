import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Modal from "../Modals";
import Cart from "../screens/Cart";
import { useCart, useDispatchCart } from "../components/ContextReducer";
import CustOrderfd from "../screens/CustOrderfd";

import FoodBankIcon from "@mui/icons-material/FoodBank";

export default function Navbar() {
  let data = useCart();
  let dispatch = useDispatchCart();

  const navigate = useNavigate();
  const [cartView, setCartView] = useState(false);
  const [custOrder, setCustOrder] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  function handleLogout() {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userEmail");
    dispatch({ type: "ORDERRECEIVED" });
    navigate("/");
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-navbar shadow-sm">
        <div className="container-fluid">
          <div className="d-flex justify-content-between align-items-center w-100">
            <Link
              className="navbar-brand d-flex align-items-center text-white fs-2 fw-bold"
              to="/"
            >
              <FoodBankIcon style={{ fontSize: "2.5rem" }} />
              <span className="ms-2">Food Joy</span>
            </Link>

            <button
              className="navbar-toggler"
              type="button"
              aria-label="Toggle navigation"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>

          <div
            className={`collapse navbar-collapse ${isMenuOpen ? "show" : ""}`}
          >
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {!localStorage.getItem("authToken") ? (
                <li className="nav-item">
                  <div className="d-flex flex-column flex-lg-row align-items-center justify-content-center justify-content-lg-start">
                    <Link
                      className="btn btn-outline-white my-1 my-lg-0 mx-2"
                      to="/login"
                    >
                      Login
                    </Link>
                    <Link
                      className="btn btn-outline-white my-1 my-lg-0 mx-2"
                      to="/createuser"
                    >
                      Signup
                    </Link>
                  </div>
                </li>
              ) : (
                <li className="nav-item">
                  <div className="d-flex flex-column flex-lg-row align-items-center justify-content-center justify-content-lg-end">
                    <button
                      className="btn btn-outline-light my-1 mx-2 mx-btn mx-btn-h"
                      onClick={() => setCartView(true)}
                    >
                      Cart{" "}
                      <span className="badge bg-danger text-white mx-2">
                        {data.length}
                      </span>
                    </button>

                    <button
                      className="btn btn-outline-light my-1 mx-2 mx-btn-h"
                      aria-current="page"
                      onClick={() => setCustOrder(true)}
                    >
                      Orders
                    </button>

                    <button
                      className="btn btn-outline-danger my-1 mx-2"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>

                  {cartView && (
                    <Modal onClose={() => setCartView(false)}>
                      <Cart onCheckout={() => setCartView(false)} />
                    </Modal>
                  )}

                  {custOrder && (
                    <Modal onClose={() => setCustOrder(false)}>
                      <CustOrderfd />
                    </Modal>
                  )}
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
