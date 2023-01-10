import Restuarant from "./Restuarant";
import React, { useEffect, useState } from "react";
import { restaurantList } from "../constants";

export default Body = (props) => {
  const [restuarants, setRestuarants] = useState(restaurantList);

  useEffect(() => {
    let identifier;
    if (props.searchText) {
      identifier = setTimeout(() => {
        (() => {
          const filteredData = restuarants.filter((restuarant) => {
            return restuarant.data.name
              .toLowerCase()
              .includes(props.searchText?.toLowerCase());
          });
          setRestuarants(filteredData);
        })();
      }, 500);
    } else {
      setRestuarants(restaurantList);
    }

    return () => {
      clearTimeout(identifier);
    };
  }, [props.searchText]);

  return (
    <main>
      <div className="mainContainer">
        <div className="dishContainer">
          <div className="dishItemContainer">
            {restuarants.map((restuarant) => {
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
