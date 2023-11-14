import React, { useState } from "react";
import veg from "../../images/veg.png";
import nonVeg from "../../images/non-veg.png";
import { IMG_CDN_URL } from "../constants";
import StarIcon from "@mui/icons-material/Star";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  removeFromCart,
  addItemsFromNewRestaurantFlag,
  addRestaurantDetails,
} from "../utils/cartSlice";

const RestaurantCategory = ({ item, restaurant }) => {
  const [addedItems, setAddedItems] = useState(0);
  const isCartNew = useSelector((store) => store.cart.isNew);
  const dispatch = useDispatch();

  const addItemToCart = (addOrRemoveFlag) => {
    if (isCartNew) {
      dispatch(addItemsFromNewRestaurantFlag(true));
    } else {
      if (addOrRemoveFlag === "add") {
        setAddedItems((addedItems) => (addedItems += 1));
        dispatch(addToCart(item));
      } else {
        setAddedItems((addedItems) => (addedItems -= 1));
        dispatch(removeFromCart(item));
      }
      dispatch(addRestaurantDetails(restaurant));
    }
  };
  return (
    <div key={item.card?.info?.id}>
      <div className=".contents__Container">
        <div className="contents__Container__pos contents__Container__pos1">
          <div className="styles_detailsContainer">
            <div aria-hidden="true">
              {item.card?.info?.isVeg ? (
                <img width={20} className="food__img" src={veg} />
              ) : (
                <img width={20} className="food__img" src={nonVeg} />
              )}
              <span className="best_seller">
                {item.card?.info?.isBestseller ? (
                  <>
                    <StarIcon sx={{ fontSize: "1rem", marginTop: "-1px" }} />{" "}
                    <span style={{ marginLeft: "-4px" }}>Bestseller</span>
                  </>
                ) : null}
              </span>
            </div>
            <div className="food__name__container">
              <h3 className="food__name__text">{item.card?.info?.name}</h3>
            </div>
            <div className="itemPortionContainer">
              <span className="styles_itemPrice styles_price">
                ₹{" "}
                {item.card?.info?.price
                  ? (item.card?.info?.price / 100).toString()
                  : (item.card?.info?.defaultPrice / 100).toString()}
              </span>
            </div>
            {item.card?.info?.description && (
              <div className="styles_itemDesc">
                {item.card?.info?.description}
              </div>
            )}
          </div>
          <div className="itemImage__container">
            {item.card?.info?.imageId && (
              <div>
                <button className="image_background styles_itemImage">
                  <img
                    className="styles_itemImage"
                    width={256}
                    loading="lazy"
                    src={IMG_CDN_URL + item.card?.info?.imageId}
                  />
                </button>
              </div>
            )}
            <div className="styles_itemAddButton">
              <div className="button_style1 button_style2">
                <div
                  className="add_button"
                  onClick={() => {
                    addItemToCart("add");
                  }}
                >
                  {addedItems === 0 ? "ADD" : addedItems}
                </div>
                <div
                  onClick={() => {
                    addItemToCart("add");
                  }}
                  className={`add2 ${addedItems == 0 ? "add3 add1" : ""}`}
                >
                  +
                </div>
                <div
                  onClick={() => {
                    addItemToCart("remove");
                  }}
                  className={`add_sub2 ${addedItems == 0 ? "add3 add1" : ""}`}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="item__border"></div>
    </div>
  );
};

export default RestaurantCategory;
