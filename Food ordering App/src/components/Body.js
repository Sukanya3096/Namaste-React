import Restuarant from "./Restuarant";
import React, { useEffect, useState } from "react";
import Pagination from "./Pagination";
import { restaurantList } from "../constants";

export default Body = (props) => {
  const [restuarants, setRestuarants] = useState(restaurantList);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(8);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = restuarants.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );
  const nPages = Math.ceil(restuarants.length / recordsPerPage);
  const isLastPage =
    currentRecords.length !== recordsPerPage ||
    indexOfLastRecord === restuarants.length;

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
