import Restaurant from "./Restaurant";
import React, { useEffect, useState } from "react";
import Pagination from "./Pagination";
import { ShimmerSimpleGallery } from "react-shimmer-effects";
import { useOutletContext } from "react-router-dom";
import { useRestaurantInfo } from "../utils/useRestaurantInfo";
import { useOnlineStatus } from "../utils/useOnlineStatus";
import OffersCarousel from "./OffersCarousel";

export default Body = (props) => {
  const [searchText, getLat, getLng] = useOutletContext();
  const [listOfRestaurants, setListOfRestaurants] = useState();
  const [filteredrestaurants, setFilteredRestaurants] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const { restaurants: restaurants, header: header } = useRestaurantInfo(
    getLat,
    getLng
  );
  const onlineStatus = useOnlineStatus();
  // Define the number of records to display per page
  const [recordsPerPage] = useState(8);

  // Calculate the index of the last record on the current page
  const indexOfLastRecord = currentPage * recordsPerPage;

  // Calculate the index of the first record on the current page
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

  // Get the records to display on the current page by slicing the filteredrestaurants array
  const currentRecords = filteredrestaurants
    ? filteredrestaurants.slice(indexOfFirstRecord, indexOfLastRecord)
    : [];

  // Calculate the total number of pages based on the number of filtered restaurants and the records per page
  const nPages = filteredrestaurants
    ? Math.ceil(filteredrestaurants.length / recordsPerPage)
    : 0;

  // Check if the current page is the last page based on the number of records on the current page and the total number of filtered restaurants
  const isLastPage =
    currentRecords.length !== recordsPerPage ||
    indexOfLastRecord === filteredrestaurants.length;

  useEffect(() => {
    if (header?.id === "swiggy_not_present") {
      setFilteredRestaurants([]);
    } else {
      setListOfRestaurants(restaurants);
      // Reset the current page to 1.
      setCurrentPage(1);
    }
  }, [restaurants]);

  // This useEffect hook is responsible for filtering the list of restaurants based on the searchText input value.
  // It is triggered whenever the searchText or listOfRestaurants change.

  useEffect(() => {
    // Check if the searchText is not empty
    console.log("search: ", searchText);
    if (searchText && searchText !== "") {
      // Filter the listOfRestaurants array based on the name of each restaurant
      const filteredList = listOfRestaurants?.filter((restaurant) => {
        // Convert the restaurant name and searchText to lowercase and check if the restaurant name includes the searchText
        return restaurant.info.name
          .toLowerCase()
          .includes(searchText?.toLowerCase());
      });
      console.log(filteredList);
      // Update the state variable filteredRestaurants with the filtered list
      setFilteredRestaurants(filteredList);

      // Reset the currentPage to 1
      setCurrentPage(1);
    } else {
      // If the searchText is empty, set the filteredRestaurants to the original list of restaurants
      setFilteredRestaurants(listOfRestaurants);

      // Reset the currentPage to 1
      setCurrentPage(1);
    }
  }, [searchText, listOfRestaurants]);

  // This function is an asynchronous function named "getrestaurants"
  // It fetches a list of restaurants based on the provided latitude and longitude
  if (onlineStatus == false)
    return (
      <main>
        <div className="mainContainer">
          <div className="dishContainer">
            Looks like you are offline. Please check your internet connection!
          </div>
        </div>
      </main>
    );

  return (
    <main>
      <div className="mainContainer">
        <OffersCarousel {...header} />
        <div className="dishContainer">
          <div className="dishItemContainer">
            {filteredrestaurants && filteredrestaurants.length > 0 ? (
              currentRecords.map((restaurant, i) => {
                return <Restaurant {...restaurant.info} key={i} />;
              })
            ) : filteredrestaurants && filteredrestaurants.length === 0 ? (
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
