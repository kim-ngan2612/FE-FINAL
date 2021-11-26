import React, { Fragment, useEffect, useState } from "react";
import "./admin.css";
import { useNavigate, Navigate } from "react-router-dom";
import Logo from "../../assets/logo.PNG";
import axiosClient from "../../utils/axiosClient";
import TableReadOnly from "../components/TableReadOnly";
import TableEdit from "../components/TableEdit";

export default function Admin() {
  const [data, setData] = useState([]);
  const [userID, setUserID] = useState(null);
  const [notification, setNotification] = useState("");
  const navigate = useNavigate();

  // Form edit
  const [editFormData, setEditFormData] = useState({
    _id: "",
    email: "",
    password: "",
    role: "",
  });
  const [editContactId, setEditContactId] = useState(null);

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/signin");
  }
  const userLists = async () => {
    try {
      const res = await axiosClient.get("/admin");
      setData(res);
      return res;
    } catch (error) {
      return error;
    }
  };

  const userInfor = async (values) => {
    console.log(values);
    try {
      const res = await axiosClient.get("/auth", values);
      setUserID(res);
      return res;
    } catch (error) {
      return error.response.data;
    }
  };
  // Edit
  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  // Submit edit
  const handleEditFormSubmit = async (event) => {
    event.preventDefault();

    const editedContact = {
      id: editContactId,
      email: editFormData.email,
      password: editFormData.password,
      role: editFormData.role,
    };

    const newContacts = [...data];

    try {
      const data = await axiosClient.put(
        `/admin/${editedContact.id}`,
        editedContact
      );
      setNotification(data);
    } catch (error) {
      console.log(error);
    }

    setData(newContacts);
    setEditContactId(null);
  };

  const handleEditClick = (event, item) => {
    event.preventDefault();
    setEditContactId(item._id);
    const formValues = {
      email: item.email,
      password: item.password,
      role: item.role,
    };

    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setEditContactId(null);
  };

  // Delete user
  const handleDeleteClick = async (contactId) => {
    try {
      const data = await axiosClient.delete(`/admin/${contactId}`);
      setNotification(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    userLists();
  }, [notification]);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      console.log("Hello Admin");
      // userInfor(JSON.parse(localStorage.getItem("token")));
    }
  }, [localStorage.getItem("token")]);

 

  return (
    <div className="container-background">
      <div className="menu-logo">
        <div className="navbar navbar-default">
          <div className="nav-left">
            <div className="btn-group">
              <a type="button" className="btn btn-secondary">
                Trang chủ
              </a>
            </div>
            <a type="button" className="btn btn-secondary">
              Giới thiệu
            </a>
          </div>{" "}
          {/*end nav left */}
          <a className="navbar-brand" href="#">
            <img src={Logo} alt="logo" />
          </a>
          <div className="nav-right">
            <div className="btn-group">
              <a
                type="button"
                className="btn btn-secondary"
                onClick={handleLogout}
              >
                Đăng xuất
              </a>
            </div>
            <div className="btn-group">
              <a
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  return navigate("/");
                }}
              >
                Customer
              </a>
            </div>
          </div>{" "}
          {/*end nav right*/}
        </div>{" "}
        {/*end navbar*/}
      </div>{" "}
      {/*end logo and menu*/}
      <div className="container">
        <form onSubmit={handleEditFormSubmit}>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Email</th>
                <th>Password</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.map((item, index) => {
                  return (
                    <Fragment>
                      {editContactId === item._id ? (
                        <TableEdit
                          key={index}
                          handleCancelClick={handleCancelClick}
                          editFormData={editFormData}
                          handleEditFormChange={handleEditFormChange}
                        />
                      ) : (
                        <TableReadOnly
                          key={index}
                          item={item}
                          handleEditClick={handleEditClick}
                          handleDeleteClick={handleDeleteClick}
                        />
                      )}
                    </Fragment>
                  );
                })}
            </tbody>
          </table>
        </form>
        <footer className="bg-dark text-white pb-1">
          <div className="container text-center text-md-left">
            <div className="row text-center text-md-left">
              <div className="col-md-3 col-lg-3 mx-auto mt-3">
                <h5 className="text-uppercase md-4 font-weight-bold text-warning">
                  DỊCH VỤ CHO THUÊ PHÒNG NGÂN BÌNH
                </h5>
                <p>
                  Cho thuê phòng ngắn hạn, dài hạn có đầy đủ tiện nghi, thiết bị
                  như bếp, tủ, bàn ghế,...
                </p>
              </div>
              <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
                <h5 className="text-uppercase mb-4 font-weight-bold text-warning">
                  LOẠI PHÒNG
                </h5>
                <p>
                  <a
                    href="#"
                    className="text-white"
                    style={{ textDecoration: "none" }}
                  >
                    Máy Lạnh
                  </a>
                </p>
                <p>
                  <a
                    href="#"
                    className="text-white"
                    style={{ textDecoration: "none" }}
                  >
                    Thường
                  </a>
                </p>
                <p>
                  <a
                    href="#"
                    className="text-white"
                    style={{ textDecoration: "none" }}
                  >
                    Có gác
                  </a>
                </p>
              </div>
              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
                <h5 className="text-uppercase mb-4 font-weight-bold text-warning">
                  CONTACT
                </h5>
                <p>
                  <i className="fas fa-home mr-3" /> 8C7, Hà Huy Giáp, phường
                  Thạnh Lộc, quận 12, TPHCM
                </p>
                <p>
                  <i className="fa fa-envelope mr-3" /> thuenha2ce@gmail.com
                </p>
                <p>
                  <i className="fas fa-phone mr-3" /> 0700456789
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
