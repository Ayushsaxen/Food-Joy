import React from "react";
import { useCart, useDispatchCart } from "../components/ContextReducer";
export default function Cart(props) {
  let data = useCart();
  let dispatch = useDispatchCart();

  if (data.length === 0) {
    return (
      <div>
        <div className="m-5 w-100 text-center fs-3 text-white">
          The Cart Is Empty!
        </div>
      </div>
    );
  }
  let totalPrice = data.reduce((total, food) => total + food.price, 0);
  console.log("cart", data);

  async function handleCheckOut(event) {
    const response = await fetch("http://localhost:5000/api/cartorderdata", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: localStorage.getItem("userEmail"),
        order: data,
        price: totalPrice,
      }),
    });

    const json = await response.json();
    console.log(json);
    if (json.success) {
      dispatch({ type: "ORDERRECEIVED" });
      alert("YAY! Order Received");

      props.onCheckout();
    }
  }

  return (
    <div>
      <div className="container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md bg-dark">
        <table className="table table.hover">
          <thead className="text-success fs-4">
            <tr>
              <th scope="col" style={{ color: "white" }}>
                #
              </th>
              <th scope="col" style={{ color: "white" }}>
                Name
              </th>
              <th scope="col" style={{ color: "white" }}>
                Quantity
              </th>
              <th scope="col" style={{ color: "white" }}>
                Option
              </th>
              <th scope="col" style={{ color: "white" }}>
                Amount
              </th>
              <th scope="col" style={{ color: "white" }}></th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => {
              return (
                <tr key={index} style={{ color: "white" }}>
                  <th key={index} scope="row" style={{ color: "white" }}>
                    {" "}
                    {index + 1}
                  </th>
                  <td key={index} style={{ color: "white" }}>
                    {food.name}
                  </td>
                  <td key={index} style={{ color: "white" }}>
                    {food.qty}
                  </td>
                  <td key={index} style={{ color: "white" }}>
                    {food.size}
                  </td>
                  <td key={index} style={{ color: "white" }}>
                    {food.price}
                  </td>
                  <td key={index}>
                    <button
                      className="btn p-2 bg-danger"
                      onClick={() => {
                        dispatch({ type: "REMOVE", index: index });
                      }}
                    >
                      delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div>
          <h1 className="fs-2" style={{ color: "white" }}>
            Total Price: {totalPrice}/-
          </h1>
        </div>
        <div>
          <button className="btn bg-success mt-5 " onClick={handleCheckOut}>
            {" "}
            Check Out{" "}
          </button>
        </div>
      </div>
    </div>
  );
}
