import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import { ShimmerSimpleGallery } from "react-shimmer-effects";
import { IMG_CDN_URL } from "../constants";
import StarRateSharpIcon from "@mui/icons-material/StarRateSharp";

import { useRestaurantInfo } from "../utils/useRestaurantInfo";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import RestaurantCategory from "./RestaurantCategory";
import CartContext from "../utils/CartContext";
import { isNewFlag } from "../utils/cartSlice";
import { useSelector, useDispatch } from "react-redux";

const RestaurantMenu = () => {
  const [searchText, getLat, getLng] = useOutletContext();
  const [expanded, setExpanded] = useState(0);
  const [cartItemsValue, setCartItemsValue] = useState([]);
  const cartDetails = useSelector((store) => store.cart.items);
  const restaurantDetails = useSelector(
    (store) => store.cart.restaurantDetails
  );

  const { id } = useParams();
  const [items, setItems] = useState(null);
  const dispatch = useDispatch();

  const { restaurants: restaurant } = useRestaurantInfo(getLat, getLng, id);
  useEffect(() => {
    if (restaurant) {
      getItems(restaurant);
      if (
        cartDetails.length > 0 &&
        restaurantDetails.cards[0]?.card?.card?.info?.id !=
          restaurant.cards[0]?.card?.card?.info?.id
      ) {
        dispatch(isNewFlag(true));
      }
    }
  }, [restaurant]);

  const handleChange = (panel) => (event, isExpanded) => {
    console.log(isExpanded);
    setExpanded(isExpanded ? panel : false);
    console.log(expanded);
  };

  function getItems(data) {
    const items = data
      ? Object.values(data.cards[2].groupedCard.cardGroupMap.REGULAR.cards)
          .filter((item) => item?.card?.card?.itemCards)
          .map((item) => {
            return [...item.card.card.itemCards, item.card.card.title];
          })
      : data;

    setItems(items);
    console.log(restaurant);
  }

  return (
    <CartContext.Provider
      value={{
        items: cartItemsValue,
        id: 0,
        addToCart: () => {},
        removeFromCart: () => {},
        clearCart: () => {},
      }}
    >
      <div className="mainContainer">
        <div className="menuContainer">
          {!restaurant && (
            <ShimmerSimpleGallery card imageHeight={400} caption />
          )}
          {restaurant && items && items.length > 0 && (
            <>
              {" "}
              <div className="restaurant">
                <div className="restaurant__container">
                  <div className="restaurant__container__pos">
                    <div className="restaurant__imageContainer">
                      <div className="restaurant__imageContainer__box">
                        <img
                          className="image__opaque"
                          width="254"
                          height="165"
                          src={
                            IMG_CDN_URL +
                            restaurant.cards[0]?.card?.card?.info
                              ?.cloudinaryImageId
                          }
                        />
                      </div>
                    </div>
                    <div className="restaurant__nameContainer">
                      <div className="restaurant__nameContainer__pos">
                        <div className="restaurant__name">
                          <div className="restaurant__name__flex">
                            <h1 className="restaurant__name__flex__heading">
                              {restaurant.cards[0]?.card?.card?.info?.name}
                            </h1>
                          </div>
                        </div>
                        <div className="restaurant__opening__container">
                          <div className="restaurant__opening restaurant__opening__time">
                            {restaurant.cards[0]?.card?.card?.info?.availability
                              .opened === false ? (
                              <span className="restaurant__opening__text1 restaurant__opening__text2 restaurant__opening__text3">
                                {
                                  restaurant.cards[0]?.card?.card?.info
                                    ?.availability.nextOpenTimeMessage
                                }
                              </span>
                            ) : null}{" "}
                            {restaurant.cards[0]?.card?.card?.info?.cuisines.map(
                              (res, i) =>
                                i ===
                                restaurant.cards[0]?.card?.card?.info?.cuisines
                                  .length -
                                  1
                                  ? res
                                  : res + ", "
                            )}
                          </div>
                          <div className="restaurant__area restaurant__area2">
                            {restaurant.cards[0]?.card?.card?.info?.locality},{" "}
                            {restaurant.cards[0]?.card?.card?.info?.area}
                          </div>
                          <br />
                          <div className="restaurant__ratings restaurant__ratings__container">
                            <div className="ratings">
                              <div className="ratings__1">
                                <span>
                                  <span className="icon_1">
                                    {" "}
                                    <StarRateSharpIcon />
                                  </span>
                                  {
                                    restaurant.cards[0]?.card?.card?.info
                                      ?.avgRatingString
                                  }
                                </span>
                              </div>
                              <div className="ratings__2">
                                <span className="ratings_text">
                                  {
                                    restaurant.cards[0]?.card?.card?.info
                                      ?.totalRatingsString
                                  }
                                </span>
                              </div>
                            </div>
                            <div className="ratings">
                              <div className="ratings__1">
                                <span className="ratings_text__1">
                                  {
                                    restaurant.cards[0]?.card?.card?.info?.sla
                                      .slaString
                                  }
                                </span>
                              </div>
                              <div className="ratings__2">Delivery Time</div>
                            </div>
                            <div className="ratings">
                              <div className="ratings__1">
                                <span>
                                  ₹{" "}
                                  {(
                                    restaurant.cards[0]?.card?.card?.info
                                      ?.costForTwo / 100
                                  ).toString()}
                                </span>
                              </div>
                              <div className="ratings__2">Cost for two</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {restaurant.cards[0]?.card?.card?.info
                      ?.aggregatedDiscountInfo && (
                      <div className="offer">
                        <div className="offer_container">
                          <div className="offer_text">Offer</div>
                          <div className="offer__inner">
                            {restaurant.cards[0]?.card?.card?.info?.aggregatedDiscountInfo.descriptionList.map(
                              (res) => (
                                <div
                                  className="offer__inner__text"
                                  key={res.id}
                                >
                                  <div className="offer__inner__text__content">
                                    {res.meta}
                                  </div>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div id="menu-content" className="menuContainer menuContainer__1">
                <div className="menu__partition">
                  <div className="menu__contents">
                    {items?.map((val, i) => (
                      <Accordion
                        key={i}
                        expanded={expanded === i}
                        onChange={handleChange(i)}
                        sx={{ marginBottom: "20px" }}
                      >
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1bh-content"
                          id="panel1bh-header"
                        >
                          <Typography
                            sx={{
                              width: "33%",
                              flexShrink: 0,
                              fontWeight: "bold",
                            }}
                          >
                            {val[val.length - 1]} ({val.length - 1})
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails itemProp="val">
                          <Typography component="div">
                            {val.map((item, j) => {
                              if (j != val.length - 1) {
                                return (
                                  <RestaurantCategory
                                    item={item}
                                    restaurant={restaurant}
                                  />
                                );
                              }
                            })}
                          </Typography>
                        </AccordionDetails>
                      </Accordion>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </CartContext.Provider>
  );
};

export default RestaurantMenu;
