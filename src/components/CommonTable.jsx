import React from "react";

const CommonTable = ({
  columns,
  data,
  rowKey,
  onEdit,
  onDelete,
}) => {
  return (
    <table className="table table-bordered table-striped text-center align-middle">
      <thead
        className="table-light"
        style={{ position: "sticky", top: 0 }}
      >
        <tr>
          {columns.map((col, index) => (
            <th key={index}>{col.header}</th>
          ))}
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {data.map((row) => (
          <tr key={row[rowKey]}>
            {columns.map((col, index) => (
              <td className= 'text-start' key={index}>
                {col.render
                  ? col.render(row[col.accessor], row)
                  : row[col.accessor]}
              </td>
            ))}

            <td>
              <button
                className="btn btn-warning btn-sm me-2 fw-bold"
                onClick={() => onEdit(row)}
              >
                🖋️Edit
              </button>
              <button
                className="btn btn-danger btn-sm fw-bold"
                onClick={() => onDelete(row)}
              >
                🗑️Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CommonTable;

