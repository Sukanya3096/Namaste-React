import Restuarant from "./Restuarant";
import React, { useEffect, useState } from "react";
import Pagination from "./Pagination";
import { restaurantList } from "../constants";

export default Body = (props) => {
  const [filteredRestuarants, setFilteredRestuarants] =
    useState(restaurantList);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(8);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredRestuarants.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );
  const nPages = Math.ceil(filteredRestuarants.length / recordsPerPage);
  const isLastPage =
    currentRecords.length !== recordsPerPage ||
    indexOfLastRecord === filteredRestuarants.length;

  useEffect(() => {
    let identifier;
    if (props.searchText) {
      identifier = setTimeout(() => {
        (() => {
          const filteredData = restaurantList.filter((restuarant) => {
            return restuarant.data.name
              .toLowerCase()
              .includes(props.searchText?.toLowerCase());
          });
          setFilteredRestuarants(filteredData);
          setCurrentPage(1);
        })();
      }, 500);
    } else {
      setFilteredRestuarants(restaurantList);
      setCurrentPage(1);
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
            {currentRecords.map((restuarant) => {
              return (
                <Restuarant {...restuarant.data} key={restuarant.data.id} />
              );
            })}
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
