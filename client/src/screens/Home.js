import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Cards from "../components/Cards";
import Carousal from "../components/Carousal";
import AboutUs from "../components/AboutUs";
import OurTeam from "../components/OurTeam";

export default function Home() {
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  async function loadData() {
    let response = await fetch("http://localhost:5000/api/foodData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    response = await response.json();

    setFoodCat(response[1]);
    setFoodItem(response[0]);
  }

  useEffect(() => {
    loadData();
  }, []);

  const [searchedString, setSearchedString] = useState("");
  const [cardButton, setcardButton] = useState(false);
  const [showAlert, setShowAlert] = useState(true);

  return (
    <div>
      <Navbar />
      {cardButton
        ? showAlert && (
            <div
              className="alert alert-warning alert-dismissible fade show"
              role="alert"
            >
              You should Login Before You Proceed....
              <button
                type="button"
                className="close mx-close"
                onClick={() => setcardButton(false)}
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          )
        : null}
      <Carousal setSearchedString={setSearchedString} />
      <div
        className="container"
        style={{
          backgroundImage:
            "url(C:\\Users\\hp\\Downloads\\foodDeliveryApp\\my-app\\src\\img\\bg.png)",
        }}
      >
        <AboutUs />

        <h2 className="fs-1 text-center mt-3 mb-3 fw-bolder">
          Our Food Items{" "}
        </h2>
        {foodCat !== [] ? (
          foodCat.map((data, index) => {
            return (
              <div key={index} className="my-4">
                <h2 style={{ textAlign: "center" }}>{data.CategoryName}</h2>
                <hr />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexWrap: "wrap",
                  }}
                >
                  {foodItem !== [] ? (
                    foodItem
                      .filter((item) => {
                        return (
                          item.CategoryName === data.CategoryName &&
                          item.name
                            .toLowerCase()
                            .includes(searchedString.toLowerCase())
                        );
                      })
                      .map((categFoodItem) => {
                        return (
                          <div key={categFoodItem._id} className="my-3 mx-3">
                            <Cards
                              imglink={categFoodItem.img}
                              title={categFoodItem.name}
                              description={categFoodItem.description}
                              options={categFoodItem.options[0]}
                              setcardButton={setcardButton}
                              id={categFoodItem._id}
                            />
                          </div>
                        );
                      })
                  ) : (
                    <div>No Such Data Found</div>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div>...loading</div>
        )}
      </div>

      <OurTeam />
      <Footer />
    </div>
  );
}
