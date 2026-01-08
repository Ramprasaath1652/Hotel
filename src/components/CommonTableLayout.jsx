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
    <div className="col-md-8">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="mb-0">{title}</h5>
        

        <input
          type="text"
          className="form-control"
          placeholder={placeholder}
          style={{ width: "250px" }}
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
        />
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
