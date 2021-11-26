import React from "react";

export default function TableReadOnly({
  item,
  handleEditClick,
  handleDeleteClick,
}) {
  return (
    <tr>
      <td>{item.email}</td>
      <td>{item.password.slice(1, 15)}...</td>
      <td>{item.role}</td>
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
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => handleDeleteClick(item._id)}
        >
          Remove
        </button>
      </td>
    </tr>
  );
}
