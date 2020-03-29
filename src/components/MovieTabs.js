import React from "react";

const MovieTabs = props => {
  const { sort_by, updateSortBy, page, updatePage, data } = props;
  const handleClick = value => {
    return () => {
      updateSortBy(value);
    };
  };

  const pageMinus = value => {
    return () => {
      if (value === 1) {
        return false;
      } else {
        updatePage(value - 1);
      }
    };
  };

  const pagePlus = value => {
    return () => {
      updatePage(value + 1);
    };
  };

  const firstPage = () => {
    return () => {
      updatePage(1);
    };
  };

  const getClassLink = value => {
    return `nav-link ${sort_by === value ? "active" : ""}`;
  };
  return (
    <div>
      <div className="d-flex align-items-center mb-3">
        <div>
          <button
            type="button"
            className={`btn
          ${page === 1 ? "btn-secondary disabled" : "btn-dark"}`}
            onClick={firstPage()}
          >
            First Page
          </button>
        </div>
        <div>
          <button
            type="button"
            className={`btn  mx-3
          ${page === 1 ? "btn-secondary disabled" : "btn-primary"}`}
            onClick={pageMinus(page)}
          >
            Previous
          </button>
        </div>

        <div className="d-flex align-items-center" style={{ fontSize: "16px" }}>
          <p className="mx-3 pt-2">Current Page: {page}</p>
        </div>
        <div className="ml-4">
          <button
            type="button"
            className="btn btn-primary mx-3"
            onClick={pagePlus(page)}
          >
            Next
          </button>
        </div>
        <p className="pt-2">Total Pages: {data.total_pages}</p>
      </div>

      <ul className="tabs nav nav-pills">
        <li className="nav-item">
          <div
            className={getClassLink("popularity.desc")}
            onClick={handleClick("popularity.desc")}
            style={{ cursor: "pointer" }}
          >
            Popularity desc
          </div>
        </li>
        <li className="nav-item">
          <div
            className={getClassLink("revenue.desc")}
            onClick={handleClick("revenue.desc")}
            style={{ cursor: "pointer" }}
          >
            Revenue desc
          </div>
        </li>
        <li className="nav-item">
          <div
            className={getClassLink("vote_average.desc")}
            onClick={handleClick("vote_average.desc")}
            style={{ cursor: "pointer" }}
          >
            Vote average desc
          </div>
        </li>
      </ul>
    </div>
  );
};

export default MovieTabs;
