import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import { ShimmerSimpleGallery } from "react-shimmer-effects";
import { IMG_CDN_URL } from "../constants";
import StarRateSharpIcon from "@mui/icons-material/StarRateSharp";
import veg from "../../images/veg.png";
import nonVeg from "../../images/non-veg.png";
const RestuarantMenu = () => {
  const [searchText, getLat, getLng] = useOutletContext();
  const { id } = useParams();
  const [restuarant, setRestuarant] = useState(null);
  const [items, setItems] = useState(null);
  useEffect(() => {
    getRestuarantInfo();
  }, []);

  async function getRestuarantInfo() {
    const data = await fetch(
      `https://www.swiggy.com/dapi/menu/v4/full?lat=${getLat?.toString()}&lng=${getLng?.toString()}&menuId=${id}`
    );
    const response = await data.json();
    setRestuarant(response.data);
    getItems(response.data);
  }

  function getItems(data) {
    const items = Object.values(data.menu.items)
      .sort((a, b) => (a.category === b.category ? 1 : -1))
      .reduce((acc, obj) => {
        Object.entries(obj).forEach(([key, val]) => {
          if (key === "category") {
            if (!acc.hasOwnProperty(val)) {
              acc[val] = [obj];
            } else {
              acc[val].push(obj);
            }
          }
        });

        return acc;
      }, {});
    setItems(items);
  }

  return (
    <div className="mainContainer">
      <div className="menuContainer">
        {!restuarant && !items && (
          <ShimmerSimpleGallery card imageHeight={400} caption />
        )}
        {restuarant && (
          <>
            {" "}
            <div className="restuarant">
              <div className="restuarant__container">
                <div className="restuarant__container__pos">
                  <div className="restuarant__imageContainer">
                    <div className="restuarant__imageContainer__box">
                      <img
                        className="image__opaque"
                        width="254"
                        height="165"
                        src={IMG_CDN_URL + restuarant.cloudinaryImageId}
                      />
                    </div>
                  </div>
                  <div className="restuarant__nameContainer">
                    <div className="restuarant__nameContainer__pos">
                      <div className="restuarant__name">
                        <div className="restuarant__name__flex">
                          <h1 className="restuarant__name__flex__heading">
                            {restuarant.name}
                          </h1>
                        </div>
                      </div>
                      <div className="restuarant__opening__container">
                        <div className="restuarant__opening restuarant__opening__time">
                          {restuarant.availability.opened === false ? (
                            <span className="restuarant__opening__text1 restuarant__opening__text2 restuarant__opening__text3">
                              {restuarant.availability.nextOpenTimeMessage}
                            </span>
                          ) : null}{" "}
                          {restuarant.cuisines.map((res, i) =>
                            i === restuarant.cuisines.length - 1
                              ? res
                              : res + ", "
                          )}
                        </div>
                        <div className="restuarant__area restuarant__area2">
                          {restuarant.locality}, {restuarant.area}
                        </div>
                        <br />
                        <div className="restuarant__ratings restuarant__ratings__container">
                          <div className="ratings">
                            <div className="ratings__1">
                              <span>
                                <span className="icon_1">
                                  {" "}
                                  <StarRateSharpIcon />
                                </span>
                                {restuarant.avgRatingString}
                              </span>
                            </div>
                            <div className="ratings__2">
                              <span className="ratings_text">
                                {restuarant.totalRatingsString}
                              </span>
                            </div>
                          </div>
                          <div className="ratings">
                            <div className="ratings__1">
                              <span className="ratings_text__1">
                                {restuarant.sla.slaString}
                              </span>
                            </div>
                            <div className="ratings__2">Delivery Time</div>
                          </div>
                          <div className="ratings">
                            <div className="ratings__1">
                              <span>
                                ₹ {(restuarant.costForTwo / 100).toString()}
                              </span>
                            </div>
                            <div className="ratings__2">Cost for two</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {restuarant.aggregatedDiscountInfo && (
                    <div className="offer">
                      <div className="offer_container">
                        <div className="offer_text">Offer</div>
                        <div className="offer__inner">
                          {restuarant.aggregatedDiscountInfo.descriptionList.map(
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
                  {Object.entries(items).map(([key, val], i) => (
                    <React.Fragment key={i}>
                      <h2 className="contents__category contents__category__1">
                        {key}
                      </h2>
                      <div className="category__total">{val.length} items</div>
                      {val.map((item, j) => (
                        <div key={item.id}>
                          <div className=".contents__Container">
                            <div className="contents__Container__pos contents__Container__pos1">
                              <div className="styles_detailsContainer">
                                <div aria-hidden="true">
                                  {item.isVeg ? (
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
                                    {item.name}
                                  </h3>
                                </div>
                                <div className="itemPortionContainer">
                                  <span className="styles_itemPrice styles_price">
                                    ₹ {(item.price / 100).toString()}
                                  </span>
                                  <span className="item__tag styles_tag styles_itemDetails ">
                                    {restuarant.aggregatedDiscountInfo
                                      .shortDescriptionList && (
                                      <span className="styles_tagTitle">
                                        {
                                          restuarant.aggregatedDiscountInfo
                                            .shortDescriptionList[0].meta
                                        }
                                      </span>
                                    )}
                                  </span>
                                </div>
                                {item.description && (
                                  <div className="styles_itemDesc">
                                    {item.description}
                                  </div>
                                )}
                              </div>
                              <div className="itemImage__container">
                                {item.cloudinaryImageId && (
                                  <div>
                                    <button className="image_background styles_itemImage">
                                      <img
                                        className="styles_itemImage"
                                        width={256}
                                        loading="lazy"
                                        src={
                                          IMG_CDN_URL + item.cloudinaryImageId
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
                      ))}
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

export default RestuarantMenu;
