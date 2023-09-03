"use strict";
import { useEffect, useState } from "react";
import { restaurant_FETCH_URL, FETCH_TYPE } from "../constants";
export const useRestaurantInfo = (lat, lng, resId) => {
  const [items, setItems] = useState({ restaurants: null, header: null });

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
    setItems({ restaurants: response.data, header: null });
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
        return result.data;
      })
      // Any error that occurs during the fetch or data processing is logged to the console
      .catch((err) => console.log(err));

    // If the fetched list of restaurants is not null or empty, the first restaurant is returned
    // Otherwise, the fetched list itself is returned
    restaurant
      ? getRestaurantData(restaurant)
      : setItems({ restaurants: restaurant, header: null });
  }

  function getRestaurantData(restaurant) {
    const restaurants = restaurant.cards.filter((card) => {
      if (card.card.card?.gridElements?.infoWithStyle?.restaurants) {
        return card.card.card.gridElements.infoWithStyle.restaurants;
      }
    });

    setItems({
      restaurants:
        restaurants[0]?.card.card?.gridElements?.infoWithStyle?.restaurants,
      header: getHeaders(restaurant),
    });
  }

  function getHeaders(restaurant) {
    const header = {
      header: restaurant.cards[0].card.card?.header,
      id: restaurant.cards[0].card.card?.id,
      cards: restaurant.cards[0].card.card?.imageGridCards,
    };

    return header;
  }

  return items;
};
