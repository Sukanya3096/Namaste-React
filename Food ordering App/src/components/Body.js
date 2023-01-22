import Restuarant from "./Restuarant";
import React, { useEffect, useState } from "react";
import Pagination from "./Pagination";
import { RESTUARANT_FETCH_URL, FETCH_TYPE } from "../constants";
import { ShimmerSimpleGallery } from "react-shimmer-effects";
import { useOutletContext } from "react-router-dom";
import { Link } from "react-router-dom";

export default Body = (props) => {
  const [searchText, getLat, getLng] = useOutletContext();
  const [filteredRestuarants, setFilteredRestuarants] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(8);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredRestuarants
    ? filteredRestuarants.slice(indexOfFirstRecord, indexOfLastRecord)
    : [];
  const nPages = filteredRestuarants
    ? Math.ceil(filteredRestuarants.length / recordsPerPage)
    : 0;
  const isLastPage =
    currentRecords.length !== recordsPerPage ||
    indexOfLastRecord === filteredRestuarants.length;

  useEffect(() => {
    setFilteredRestuarants("");
    getRestuarants().then((response) => {
      if (searchText && searchText !== "") {
        const filteredData = response.filter((restuarant) => {
          return restuarant.data.name
            .toLowerCase()
            .includes(searchText?.toLowerCase());
        });
        setFilteredRestuarants(filteredData);
        setCurrentPage(1);
      } else {
        setFilteredRestuarants(response);
        setCurrentPage(1);
      }
    });
  }, [searchText, getLat, getLng]);

  async function getRestuarants() {
    // return new Promise((res, rej) => {
    //   setTimeout(() => res(restaurantList), 1000);
    // });
    const restuarant = await fetch(
      `${RESTUARANT_FETCH_URL}lat=${getLat?.toString()}&lng=${getLng?.toString()}&${FETCH_TYPE}`
    )
      .then((response) => response.json())
      .then((result) => {
        return result.data?.cards.filter((card) => {
          if (card.cardType === "seeAllRestaurants") {
            return card.data.data.cards;
          }
        });
      })
      .catch((err) => console.log(err));

    return restuarant && restuarant.length > 0
      ? restuarant[0].data.data.cards
      : restuarant;
  }

  return (
    <main>
      <div className="mainContainer">
        <div className="dishContainer">
          <div className="dishItemContainer">
            {filteredRestuarants && filteredRestuarants.length > 0 ? (
              currentRecords.map((restuarant) => {
                return (
                  <Link
                    to={"/restuarant/" + restuarant.data.id}
                    key={restuarant.data.id}
                  >
                    <Restuarant {...restuarant.data} />
                  </Link>
                );
              })
            ) : filteredRestuarants && filteredRestuarants.length === 0 ? (
              <div>Currently no restaurants available </div>
            ) : (
              <ShimmerSimpleGallery card imageHeight={200} caption />
            )}
          </div>
          <Pagination
            nPages={nPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            isLastPage={isLastPage}
          />
        </div>
      </div>
    </main>
  );
};
