import { IMG_CDN_URL } from "../constants";
import { AddRounded, Favorite, StarRounded } from "@mui/icons-material";
import React, { useState } from "react";

export default Restaurant = ({
  name,
  cuisines,
  cloudinaryImageId,
  avgRating,
  costForTwoString,
}) => {
  const [isFavourite, setFavourite] = useState(false);
  const [currentValue, setCurrentValue] = useState(
    Math.floor(Number(avgRating))
  );

  return (
    <div className="itemCard">
      <div className="itemContent">
        <div className="imgBox">
          <img
            src={IMG_CDN_URL + cloudinaryImageId}
            alt="restuarant image"
            className="itemImg"
          />
        </div>
        <div
          className={`isFavourite ${isFavourite ? "active" : ""}`}
          onClick={() => setFavourite(!isFavourite)}
        >
          <Favorite />
        </div>
        <h3 className="itemName">{name}</h3>
        <h5 className="cuisine">{cuisines.join(", ")}</h5>
        <div className="bottom">
          <div className="ratings">
            {Array.apply(null, { length: 5 }).map((e, i) => (
              <i
                key={i}
                className={`rating ${currentValue > i ? "orange" : "gray"}`}
                onClick={() => handleClick(i + 1)}
              >
                <StarRounded />
              </i>
            ))}
            <h5>{costForTwoString}</h5>
          </div>
          <i
            className="addToCart"
            onClick={() => {
              setCart(Items.find((n) => n.id === id));
            }}
          >
            <AddRounded />
          </i>
        </div>
      </div>
    </div>
  );
};
