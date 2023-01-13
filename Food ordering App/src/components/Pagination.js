import React from "react";

const Pagination = ({ nPages, currentPage, setCurrentPage, isLastPage }) => {
  const pageNumbers = [...Array(nPages + 1).keys()].slice(1);

  const nextPage = () => {
    if (currentPage !== nPages) setCurrentPage(currentPage + 1);
  };
  const prevPage = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };
  return (
    <nav className="pt-4">
      <ul className="pagination justify-content-center">
        {currentPage !== 1 && (
          <li className="page-item">
            <a
              className="page-link"
              aria-label="Previous"
              onClick={prevPage}
              href="#"
            >
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
        )}
        {pageNumbers.map((pgNumber) => (
          <li
            key={pgNumber}
            className={`page-item ${currentPage == pgNumber ? "active" : ""} `}
          >
            <a
              onClick={() => setCurrentPage(pgNumber)}
              className="page-link"
              href="#"
            >
              {pgNumber}
            </a>
          </li>
        ))}
        {!isLastPage && (
          <li className="page-item">
            <a
              className="page-link"
              onClick={nextPage}
              href="#"
              aria-label="Next"
            >
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Pagination;
