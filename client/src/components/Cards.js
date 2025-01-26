import React, { useState, useEffect } from "react";
import { useDispatchCart, useCart } from "./ContextReducer";

export let setcartButtonText;

export default function Cards(props) {
  let keylist = Object.keys(props.options);
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");
  const [cartButtonText, setcartButtonText] = useState("Add To Cart");

  let dispatch = useDispatchCart();
  let data = useCart();

  useEffect(() => {
    setSize(keylist[0]);
  }, []);

  async function handleAddToCart() {
    if (!localStorage.getItem("authToken")) {
      props.setcardButton(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      await dispatch({
        type: "ADD",
        id: props.id,
        name: props.title,
        qty: qty,
        img: props.imglink,
        size: size,
        price: finalPrice,
      });
      console.log(data);
      setcartButtonText("added");
      setTimeout(() => {
        setcartButtonText("Add To Cart");
      }, 3000);
    }
  }

  let finalPrice = qty * parseInt(props.options[size]);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          className="card mt-3"
          style={{
            width: "40vh",
            maxWidth: "360px",
            height: "25vw",
            minHeight: "430px",
            display: "flex",
            flexDirection: "column",
            flexShrink: 1,
            boxShadow: "10px 5px 5px grey",
          }}
        >
          <img
            src={props.imglink}
            className="card-img-top"
            alt="..."
            style={{
              height: "40vw",
              maxHeight: "180px",
              width: "100%",
              objectFit: "cover",
            }}
          />
          <div
            className="card-body"
            style={{
              flex: "1",
              display: "flex",
              flexDirection: "column",
              flexShrink: 1,
              backgroundImage:
                "url('https://www.transparenttextures.com/patterns/always-grey.png')",
            }}
          >
            <h5
              className="card-title"
              style={{
                fontSize: "calc(30px + 0.1vw)",
                textAlign: "center",
                marginBottom: "0px",
              }}
            >
              {props.title}
            </h5>
            <div className="w-100" style={{ position: "relative" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                  marginTop: "10px",
                }}
              >
                <select
                  className="m-2 p-1 h-200 bg-success rounded"
                  style={{
                    width: "20%",
                    textAlign: "center",
                    fontFamily: "cursive",
                    fontSize: "110%",
                    color: "white",
                  }}
                  onChange={(e) => {
                    setQty(e.target.value);
                  }}
                >
                  {Array.from(Array(6), (e, i) => {
                    return (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    );
                  })}
                </select>
                <select
                  className="m-2 h-200  p-1 bg-success rounded"
                  style={{
                    width: "50%",
                    textAlign: "center",
                    fontFamily: "cursive",
                    fontSize: "110%",
                    color: "white",
                  }}
                  value={size}
                  id="sizeSelect"
                  onChange={(e) => {
                    setSize(e.target.value);
                  }}
                >
                  {keylist.map((keyData, index) => {
                    return (
                      <option key={index} value={keyData} className="p-2">
                        {keyData}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div>
                <div
                  className="mx-1"
                  style={{
                    textAlign: "center",
                    marginTop: "5px",
                    marginBottom: "15px",
                  }}
                >
                  <h3> ₹{finalPrice}/- </h3>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <button
                  className="btn btn-danger justify-center"
                  onClick={handleAddToCart}
                >
                  {cartButtonText}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
