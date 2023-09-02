import { useEffect, useState } from "react";
import { restaurant_FETCH_URL, FETCH_TYPE } from "../constants";
export const useRestaurantInfo = (lat, lng, resId) => {
  const [items, setItems] = useState();

  useEffect(() => {
    if (resId && lat && lng) {
      getRestaurantInfo();
    } else if (lat && lng) {
      getRestaurants(lat, lng);
    }
  }, [resId, lat, lng]);

  async function getRestaurantInfo() {
    const data = await fetch(
      `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${lat?.toString()}&lng=${lng?.toString()}&restaurantId=${resId}`
    );
    const response = await data.json();
    setItems(response.data);
  }

  async function getRestaurants() {
    // The commented code block below is an alternative way to return a promise that resolves after 1 second
    // This can be used as a mock for testing purposes
    // return new Promise((res, rej) => {
    //   setTimeout(() => res(restaurantList), 1000);
    // });

    // The latitude and longitude values are extracted and converted to strings using optional chaining
    const restaurant = await fetch(
      `${restaurant_FETCH_URL}lat=${lat?.toString()}&lng=${lng?.toString()}&${FETCH_TYPE}`
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
    restaurant
      ? setItems(
          restaurant[0].card.card?.gridElements?.infoWithStyle?.restaurants
        )
      : setItems(restaurant);
  }

  return items;
};
