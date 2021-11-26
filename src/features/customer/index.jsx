import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.PNG";
import axiosClient from "../../utils/axiosClient";
import TableEditCustomer from "../components/TableEditCustomer";
import TableReadCustomer from "../components/TableReadCustomer";
import { Form, Input, Button, Checkbox, Modal } from "antd";
export default function Customer() {
  const [data, setData] = useState([]);
  const [userID, setUserID] = useState(null);
  const [notification, setNotification] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();

  // Form edit
  const [editFormData, setEditFormData] = useState({
    _id: "",
    fullName: "",
    cmnd: "",
    numberPhone: "",
    numberRoom: "",
    debit: "",
    currency: "VND",
  });
  const [editContactId, setEditContactId] = useState(null);

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/signin");
  }
  const userLists = async () => {
    try {
      const res = await axiosClient.get("/customer");
      setData(res);
      return res;
    } catch (error) {
      return error;
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
      _id: editContactId,
      fullName: editFormData.fullName,
      cmnd: editFormData.cmnd,
      numberPhone: editFormData.numberPhone,
      numberRoom: editFormData.numberRoom,
      debit: editFormData.debit,
      currency: editFormData.currency || "VND",
    };

    const newContacts = [...data];

    try {
      const data = await axiosClient.put(
        `/customer/${editedContact._id}`,
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
      fullName: item.fullName,
      cmnd: item.cmnd,
      numberPhone: item.numberPhone,
      numberRoom: item.numberRoom,
      debit: item.debit,
    };

    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setEditContactId(null);
  };

  // Delete user
  const handleDeleteClick = async (contactId) => {
    try {
      const data = await axiosClient.delete(`/customer/${contactId}`);
      setNotification(data);
    } catch (error) {
      console.log(error);
    }
  };

  // Modal add customer
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // Submit form add
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    values.currency = "USD";
    try {
      const res = await axiosClient.post("/customer/", values);
      setNotification(res);

      setIsModalVisible(false);
    } catch (error) {
      console.log(error.response.data.message);
    }
    form.resetFields();
  };
  useEffect(() => {
    userLists();
  }, [notification]);

  useEffect(() => {
    const userInfor = async () => {
      if (localStorage.getItem("token")) {
        console.log(localStorage.getItem("token"));
        try {
          const res = await axiosClient.get("/auth");
          console.log(res);
          setUserID(res);
        } catch (error) {
          console.log(error.response.data);
        }
      }
    };
    userInfor();
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

            {userID?.role === "sadmin" ? (
              <div
                className="btn-group"
                onClick={() => {
                  return navigate("/admin");
                }}
              >
                <a type="button" className="btn btn-secondary">
                  Go to Admin
                </a>
              </div>
            ) : (
              <></>
            )}

            <div className="btn-group">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={showModal}
              >
                Add customer
              </button>
            </div>
          </div>{" "}
        </div>{" "}
      </div>{" "}
      <div className="container">
        <form onSubmit={handleEditFormSubmit}>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Cmnd</th>
                <th>Number Phone</th>
                <th>Number Room</th>
                <th>Debit</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.map((item, index) => {
                  return (
                    <Fragment key={index}>
                      {editContactId === item._id ? (
                        <TableEditCustomer
                          handleCancelClick={handleCancelClick}
                          editFormData={editFormData}
                          handleEditFormChange={handleEditFormChange}
                        />
                      ) : (
                        <TableReadCustomer
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

        <Modal
          title="Basic Modal"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[
            <Button key="back" onClick={handleCancel}>
              Cancel
            </Button>,
          ]}
        >
          <Form
            form={form}
            name="basic"
            labelCol={{
              span: 6,
            }}
            wrapperCol={{
              span: 16,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              label="Full Name"
              name="fullName"
              rules={[
                {
                  required: true,
                  message: "Please input full name!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Cmnd"
              name="cmnd"
              rules={[
                {
                  required: true,
                  message: "Please input your cmnd",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Phone"
              name="numberPhone"
              rules={[
                {
                  required: true,
                  message: "Please input your phone",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Number Room"
              name="numberRoom"
              rules={[
                {
                  required: true,
                  message: "Please input number room",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Debit"
              name="debit"
              rules={[
                {
                  required: true,
                  message: "Please input debit!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 6,
                span: 0,
              }}
            >
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Modal>

        {/* Footer */}
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
