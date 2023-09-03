import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import { ShimmerSimpleGallery } from "react-shimmer-effects";
import { IMG_CDN_URL } from "../constants";
import StarRateSharpIcon from "@mui/icons-material/StarRateSharp";
import veg from "../../images/veg.png";
import nonVeg from "../../images/non-veg.png";
import { useRestaurantInfo } from "../utils/useRestaurantInfo";
const RestaurantMenu = () => {
  const [searchText, getLat, getLng] = useOutletContext();
  const { id } = useParams();
  const [items, setItems] = useState(null);

  const { restaurants: restaurant } = useRestaurantInfo(getLat, getLng, id);
  useEffect(() => {
    if (restaurant) {
      getItems(restaurant);
    }
  }, [restaurant]);

  function getItems(data) {
    const items = data
      ? Object.values(data.cards[2].groupedCard.cardGroupMap.REGULAR.cards)
          .filter((item) => item?.card?.card?.itemCards)
          .map((item) => {
            return [...item.card.card.itemCards, item.card.card.title];
          })
      : data;

    setItems(items);
  }

  return (
    <div className="mainContainer">
      <div className="menuContainer">
        {!restaurant && <ShimmerSimpleGallery card imageHeight={400} caption />}
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
                              <div className="offer__inner__text" key={res.id}>
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
                  {/* {console.log(items)} */}
                  {items?.map((val, i) => (
                    <React.Fragment>
                      <h2 className="contents__category contents__category__1">
                        {val[val.length - 1]}
                      </h2>
                      <div className="category__total">
                        {val.length - 1} items
                      </div>
                      {val.map((item, j) => {
                        if (j != val.length - 1) {
                          return (
                            <div key={item.card?.info?.id}>
                              <div className=".contents__Container">
                                <div className="contents__Container__pos contents__Container__pos1">
                                  <div className="styles_detailsContainer">
                                    <div aria-hidden="true">
                                      {item.card?.info?.isVeg ? (
                                        <img
                                          width={20}
                                          className="food__img"
                                          src={veg}
                                        />
                                      ) : (
                                        <img
                                          width={20}
                                          className="food__img"
                                          src={nonVeg}
                                        />
                                      )}
                                    </div>
                                    <div className="food__name__container">
                                      <h3 className="food__name__text">
                                        {item.card?.info?.name}
                                      </h3>
                                    </div>
                                    <div className="itemPortionContainer">
                                      <span className="styles_itemPrice styles_price">
                                        ₹{" "}
                                        {item.card?.info?.price
                                          ? (
                                              item.card?.info?.price / 100
                                            ).toString()
                                          : (
                                              item.card?.info?.defaultPrice /
                                              100
                                            ).toString()}
                                      </span>
                                      <span className="item__tag styles_tag styles_itemDetails ">
                                        {restaurant.cards[0]?.card?.card?.info
                                          .aggregatedDiscountInfo
                                          .shortDescriptionList && (
                                          <span className="styles_tagTitle">
                                            {
                                              restaurant.cards[0]?.card?.card
                                                ?.info.aggregatedDiscountInfo
                                                .shortDescriptionList[0].meta
                                            }
                                          </span>
                                        )}
                                      </span>
                                    </div>
                                    {item.description && (
                                      <div className="styles_itemDesc">
                                        {item.card?.info?.description}
                                      </div>
                                    )}
                                  </div>
                                  <div className="itemImage__container">
                                    {item.card?.info?.cloudinaryImageId && (
                                      <div>
                                        <button className="image_background styles_itemImage">
                                          <img
                                            className="styles_itemImage"
                                            width={256}
                                            loading="lazy"
                                            src={
                                              IMG_CDN_URL +
                                              item.card?.info?.cloudinaryImageId
                                            }
                                          />
                                        </button>
                                      </div>
                                    )}
                                    <div className="styles_itemAddButton">
                                      <div className="button_style1 button_style2">
                                        <div className="add_button">ADD</div>
                                        <div className="add1 add2 add3">+</div>
                                        <div className="add1 add_sub2 add3"></div>
                                        <div className="add_sub_13 add1 add3">
                                          0
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              {!(j === val.length - 1) && (
                                <div className="item__border"></div>
                              )}
                            </div>
                          );
                        }
                      })}
                      <div className="category__border"></div>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default RestaurantMenu;
