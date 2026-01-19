import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const CommonTableLayout = ({
  title,
  searchValue,
  onSearchChange,
  placeholder,
  dataLength,
  children,
}) => {
  return (
    <div className="col-md-8  mt-2 mt-md-0">
      <label className="form-label fw-bold">Search for GroupName </label>

      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3  gap-2">
        <input
          type="text"
          className="form-control"
          placeholder={placeholder}
          style={{ width: "250px" }}
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        <h5 className="mb-0">{title}</h5>
      </div>

      {dataLength === 0 ? (
        <p className="text-center text-muted">No records found.</p>
      ) : (
        <div
          style={{
            maxHeight: "calc(100vh - 350px)",
            overflowY: "auto",
            overflowX: "auto",
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default CommonTableLayout;
