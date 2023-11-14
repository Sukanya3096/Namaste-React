import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { useSelector } from "react-redux";
import { IMG_CDN_URL } from "../constants";
import veg from "../../images/veg.png";
import nonVeg from "../../images/non-veg.png";
import React, { useEffect, useState } from "react";
import { addToCart, removeFromCart } from "../utils/cartSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

export default Cart = () => {
  const restaurantInfo = useSelector((store) => store.cart.restaurantDetails);
  const cartDetails = useSelector((store) => store.cart.items);
  const [uniqueCartItems, setUniqueCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const newArrayOfObjects = cartDetails.reduce((accumulator, object) => {
      if (
        (objectFound = accumulator.find(
          (arrItem) => arrItem.card?.info?.id === object?.card?.info?.id
        ))
      ) {
        objectFound.times = objectFound.times + 1;
      } else {
        let obj = { ...object, times: 1 };
        accumulator.push(obj);
      }
      return accumulator;
    }, []);

    setUniqueCartItems(newArrayOfObjects);
  }, [cartDetails]);

  useEffect(() => {
    setTotalPrice(getTotalPrice());
  }, [uniqueCartItems]);

  const navigateToHome = () => {
    navigate(`/`);
  };

  const addItemToCart = (addOrRemoveFlag, item) => {
    if (addOrRemoveFlag === "add") {
      dispatch(addToCart(item));
    } else {
      dispatch(removeFromCart(item));
    }
    setTotalPrice(getTotalPrice());
  };

  const getTotalPrice = () => {
    let total = 0;
    uniqueCartItems.forEach((item) => {
      if (item.card?.info?.price) {
        total += (item.card?.info?.price / 100) * item.times;
      } else {
        total += (item.card?.info?.defaultPrice / 100) * item.times;
      }
    });
    console.log(total);
    return Math.round(total * 100) / 100 || total;
  };

  return (
    <main>
      <div className="mainContainer">
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            "& > :not(style)": {
              width: 800,
              height: 500,
            },
            justifyContent: "center",
          }}
        >
          <Paper>
            {uniqueCartItems.length === 0 ? (
              <div className="empty_cart">
                <div className="emptyImage"></div>
                <div className="empty_message ">Your cart is empty</div>
                <div className="empty_message2">
                  You can go to home to view more restaurants
                </div>
                <Button onClick={navigateToHome}>
                  SEE RESTAURANTS NEAR YOU
                </Button>
              </div>
            ) : (
              <>
                <div className="restaurantDetails">
                  <span className="restaurantImage">
                    {" "}
                    <img
                      className="restaurantImage"
                      alt="restaurant image"
                      height={50}
                      width={50}
                      src={
                        IMG_CDN_URL +
                        restaurantInfo.cards[0]?.card?.card?.info
                          ?.cloudinaryImageId
                      }
                    />
                  </span>
                  <span className="restaurantName">
                    <div className="restaurantNameName_name">
                      {restaurantInfo.cards[0]?.card?.card?.info?.name}
                    </div>
                    <div className="restaurantNameName_place">
                      {" "}
                      {restaurantInfo.cards[0]?.card?.card?.info?.areaName}
                    </div>
                  </span>
                </div>
                <div className="cartItems cart_bottom">
                  {uniqueCartItems.map((item) => (
                    <div key={item.card?.info?.id} className="item">
                      <div className="item_category">
                        {item.card?.info?.isVeg ? (
                          <img width={20} className="food__img" src={veg} />
                        ) : (
                          <img width={20} className="food__img" src={nonVeg} />
                        )}
                        <div className="item_name">{item.card?.info?.name}</div>
                        <div className="styles_cartAddButton">
                          <div className="button_style1 item_button">
                            <div
                              className="add_button"
                              onClick={() => {
                                addItemToCart("add", item);
                              }}
                            >
                              {item.times}
                            </div>
                            <div
                              onClick={() => {
                                addItemToCart("add", item);
                              }}
                              className={`add2 ${
                                item.times == 0 ? "add3 add1" : ""
                              }`}
                            >
                              +
                            </div>
                            <div
                              onClick={() => {
                                addItemToCart("remove", item);
                              }}
                              className={`add_sub2 ${
                                item.times == 0 ? "add3 add1" : ""
                              }`}
                            ></div>
                          </div>
                        </div>
                        <div className="item_price">
                          ₹{" "}
                          {item.card?.info?.price
                            ? (
                                (item.card?.info?.price / 100) *
                                item.times
                              ).toString()
                            : (
                                (item.card?.info?.defaultPrice / 100) *
                                item.times
                              ).toString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="cart_total">
                  <div>TO PAY</div>
                  <div className="cart_total_price">₹ {totalPrice}</div>
                </div>
              </>
            )}
          </Paper>
        </Box>
      </div>
    </main>
  );
};
