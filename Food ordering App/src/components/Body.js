import Restuarant from "./Restuarant";
import React, { useEffect, useState } from "react";
import Pagination from "./Pagination";
import { RESTUARANT_FETCH_URL, FETCH_TYPE } from "../constants";
import { ShimmerSimpleGallery } from "react-shimmer-effects";
import { useOutletContext } from "react-router-dom";
import { Link } from "react-router-dom";

export default Body = (props) => {
  const [searchText, getLat, getLng] = useOutletContext();
  const [listOfRestuarants, setListOfRestuarants] = useState();
  const [filteredRestuarants, setFilteredRestuarants] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  // Define the number of records to display per page
  const [recordsPerPage] = useState(8);

  // Calculate the index of the last record on the current page
  const indexOfLastRecord = currentPage * recordsPerPage;

  // Calculate the index of the first record on the current page
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

  // Get the records to display on the current page by slicing the filteredRestuarants array
  const currentRecords = filteredRestuarants
    ? filteredRestuarants.slice(indexOfFirstRecord, indexOfLastRecord)
    : [];

  // Calculate the total number of pages based on the number of filtered restaurants and the records per page
  const nPages = filteredRestuarants
    ? Math.ceil(filteredRestuarants.length / recordsPerPage)
    : 0;

  // Check if the current page is the last page based on the number of records on the current page and the total number of filtered restaurants
  const isLastPage =
    currentRecords.length !== recordsPerPage ||
    indexOfLastRecord === filteredRestuarants.length;

  // This useEffect hook is used to fetch the restaurants.

  useEffect(() => {
    // Call the getRestuarants function to fetch the restaurants.
    getRestuarants().then((response) => {
      // Update the filtered restaurants state with the filtered data.
      setListOfRestuarants(response);

      // Reset the current page to 1.
      setCurrentPage(1);
    });
  }, [getLat, getLng]);

  // This useEffect hook is responsible for filtering the list of restaurants based on the searchText input value.
  // It is triggered whenever the searchText or listOfRestaurants change.

  useEffect(() => {
    // Check if the searchText is not empty
    if (searchText && searchText !== "") {
      // Filter the listOfRestaurants array based on the name of each restaurant
      const filteredList = listOfRestaurants.filter((restaurant) => {
        // Convert the restaurant name and searchText to lowercase and check if the restaurant name includes the searchText
        return restaurant.info.name
          .toLowerCase()
          .includes(searchText?.toLowerCase());
      });

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

  // This function is an asynchronous function named "getRestuarants"
  // It fetches a list of restaurants based on the provided latitude and longitude
  async function getRestuarants() {
    // The commented code block below is an alternative way to return a promise that resolves after 1 second
    // This can be used as a mock for testing purposes
    // return new Promise((res, rej) => {
    //   setTimeout(() => res(restaurantList), 1000);
    // });

    // The latitude and longitude values are extracted and converted to strings using optional chaining
    const restuarant = await fetch(
      `${RESTUARANT_FETCH_URL}lat=${getLat?.toString()}&lng=${getLng?.toString()}&${FETCH_TYPE}`
    )
      // The response from the fetch request is converted to JSON
      .then((response) => response.json())
      // The resulting data is filtered to only include cards that have the property "restaurants"
      .then((result) => {
        return result.data?.cards.filter((card) => {
          if (card.card.card?.gridElements?.infoWithStyle?.restaurants) {
            return card.card.card.gridElements.infoWithStyle.restaurants;
          }
        });
      })
      // Any error that occurs during the fetch or data processing is logged to the console
      .catch((err) => console.log(err));

    // If the fetched list of restaurants is not null or empty, the first restaurant is returned
    // Otherwise, the fetched list itself is returned
    return restuarant
      ? restuarant[0].card.card?.gridElements?.infoWithStyle?.restaurants
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
                    to={"/restuarant/" + restuarant?.info?.id}
                    key={restuarant?.info?.id}
                  >
                    <Restuarant {...restuarant.info} />
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
