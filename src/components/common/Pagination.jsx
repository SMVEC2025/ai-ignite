"use client";

import React, { useState } from "react";

export default function Pagination() {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = 2; // Set this to the total number of pages you have

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const handlePreviousClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <ul className="pagination">
      <li className={currentPage === 1 ? "disabled" : ""}>
        <a onClick={handlePreviousClick}>
          <i className="icon-arrow-left" />
        </a>
      </li>
      {[...Array(totalPages)].map((_, index) => (
        <li key={index} className={currentPage === index + 1 ? "active" : ""}>
          <a onClick={() => handlePageClick(index + 1)}>{index + 1}</a>
        </li>
      ))}
      <li className={currentPage === totalPages ? "disabled" : ""}>
        <a onClick={handleNextClick}>
          <i className="icon-arrow-right" />
        </a>
      </li>
    </ul>
  );
}
