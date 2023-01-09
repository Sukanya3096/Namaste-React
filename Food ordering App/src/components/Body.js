import Restuarant from "./Restuarant";
import React from "react";
import { restaurantList } from "../constants";

export default Body = () => {
  return (
    <main>
      <div className="mainContainer">
        <div className="dishContainer">
          <div className="dishItemContainer">
            {restaurantList.map((restuarant) => {
              return (
                <Restuarant {...restuarant.data} key={restuarant.data.id} />
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
};
