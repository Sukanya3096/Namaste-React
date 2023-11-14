import { IMG_CDN_URL } from "../constants";
import { StarRounded } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";

export default Restaurant = ({
  name,
  id,
  cuisines,
  isOpen,
  cloudinaryImageId,
  avgRating,
  costForTwoString,
  aggregatedDiscountInfoV3,
  totalRatingsString,
}) => {
  const [isFavourite, setFavourite] = useState(false);
  const [currentValue, setCurrentValue] = useState(
    Math.floor(Number(avgRating))
  );
  const navigate = useNavigate();

  const navigateToRestaurant = () => {
    navigate(`/restaurant/${id}`);
  };

  const onFavouriteClick = () => {
    setFavourite(!isFavourite);
  };

  return (
    <Card
      sx={{
        maxWidth: 345,
        width: 300,
        marginBottom: 6,
        cursor: "pointer",
        ":hover": {
          boxShadow: 20, // theme.shadows[20]
        },
        filter: isOpen ? "" : "grayscale(100%)",
      }}
      onClick={navigateToRestaurant}
    >
      <CardMedia
        sx={{ height: 140, width: 300 }}
        image={IMG_CDN_URL + cloudinaryImageId}
        title="restaurant image"
      />
      <CardContent
        sx={{
          height: 185,
          maxHeight: 200,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Typography
          gutterBottom
          variant="body1"
          component="div"
          className="d-flex justify-content-between"
        >
          {name}
          <IconButton
            aria-label="add to favorites"
            size="sm"
            sx={{ marginTop: -0.9 }}
            onClick={(e) => {
              e.stopPropagation();
              onFavouriteClick();
            }}
          >
            <FavoriteIcon color={isFavourite ? "warning" : "inherit"} />
          </IconButton>
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {cuisines.join(", ")}
          {/* <Chip
            label={isOpen ? "Open" : "Closed"}
            color={isOpen ? "success" : "error"}
            variant="outlined"
            size="small"
          />
          {aggregatedDiscountInfoV3 ? aggregatedDiscountInfoV3.header : ""} */}
        </Typography>
        <Typography variant="subtitle2" color="coral">
          {aggregatedDiscountInfoV3 && aggregatedDiscountInfoV3.header
            ? `${aggregatedDiscountInfoV3.header} ${aggregatedDiscountInfoV3.subHeader}`
            : ""}
        </Typography>
        <Typography variant="caption">
          <div className="d-flex align-items-center">
            <div className="mt-2">
              {Array.apply(null, { length: 5 }).map((e, i) => (
                <i
                  key={i}
                  className={`rating ${currentValue > i ? "orange" : "gray"}`}
                  onClick={() => handleClick(i + 1)}
                >
                  <StarRounded />
                </i>
              ))}
            </div>
            <span className="ms-2 mt-2 text-warning fs-6 fw-bold">
              {totalRatingsString}
            </span>
          </div>
        </Typography>
      </CardContent>
    </Card>
  );
};
