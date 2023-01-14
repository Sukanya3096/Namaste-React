import Restuarant from "./Restuarant";
import React, { useEffect, useState } from "react";
import Pagination from "./Pagination";
import { restaurantList } from "../constants";

export default Body = (props) => {
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
    let identifier;
    getRestuarants().then((response) => {
      if (props.searchText && props.searchText !== "") {
        const filteredData = response.filter((restuarant) => {
          return restuarant.data.name
            .toLowerCase()
            .includes(props.searchText?.toLowerCase());
        });
        setFilteredRestuarants(filteredData);
        setCurrentPage(1);
      } else {
        setFilteredRestuarants(response);
        setCurrentPage(1);
      }
    });
  }, [props.searchText]);

  async function getRestuarants() {
    return new Promise((res, rej) => {
      setTimeout(() => res(restaurantList), 1000);
    });
  }

  return (
    <main>
      <div className="mainContainer">
        <div className="dishContainer">
          <div className="dishItemContainer">
            {filteredRestuarants ? (
              currentRecords.map((restuarant) => {
                return (
                  <Restuarant {...restuarant.data} key={restuarant.data.id} />
                );
              })
            ) : (
              <div>Loading...</div>
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
