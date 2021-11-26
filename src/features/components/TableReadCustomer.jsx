import React from "react";

export default function TableReadCustomer({
  item,
  handleEditClick,
  handleDeleteClick,
}) {
  return (
    <tr>
      <td>{item.fullName}</td>
      <td>{item.cmnd}</td>
      <td>{item.numberPhone}</td>
      <td>{item.numberRoom}</td>
      <td>{item.debit}</td>
      <td>
        <div className="btn-group">
          <button
            type="button"
            className="btn btn-primary"
            onClick={(event) => handleEditClick(event, item)}
          >
            Update
          </button>
        </div>
        <div className="btn-group" />
        <div className="btn-group">
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => handleDeleteClick(item._id)}
          >
            Remove
          </button>
        </div>
      </td>
    </tr>
  );
}
