import React from "react";

export default function TableEdit({ editFormData, handleCancelClick,handleEditFormChange }) {
  return (
    <tr>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Enter a email..." 
          value={editFormData.email}
          onChange={handleEditFormChange}
          name="email"
        ></input>
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Enter an password..."
          value={editFormData.password}
          onChange={handleEditFormChange}
          name="password"
        ></input>
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Enter a role..."
          value={editFormData.role}
          onChange={handleEditFormChange}
          name="role"
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
