import React from "react";

export default function TableEditCustomer({
  editFormData,
  handleCancelClick,
  handleEditFormChange,
}) {
  return (
    <tr>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Enter a full name..."
          value={editFormData.fullName}
          onChange={handleEditFormChange}
          name="fullName"
        ></input>
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Enter an cmnd..."
          value={editFormData.cmnd}
          onChange={handleEditFormChange}
          name="cmnd"
        ></input>
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Enter your phone..."
          value={editFormData.numberPhone}
          onChange={handleEditFormChange}
          name="numberPhone"
        ></input>
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Enter number room..."
          value={editFormData.numberRoom}
          onChange={handleEditFormChange}
          name="numberRoom"
        ></input>
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Enter number debit..."
          value={editFormData.debit}
          onChange={handleEditFormChange}
          name="debit"
        ></input>
      </td>

      <td>
        <div className="btn-group">
          <button type="submit" className="btn btn-primary">
            Save
          </button>
        </div>
        <div className="btn-group" />
        <button
          type="button"
          className="btn btn-danger"
          onClick={handleCancelClick}
        >
          Cancel
        </button>
      </td>
    </tr>
  );
}
