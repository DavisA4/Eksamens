import React, { useState } from "react";
import { Table, Modal, Button, Popconfirm, Space, message } from "antd";
import moment from "moment";
import axios from "axios";

const UserTable = ({ onUpdate, users }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleOpenModal = (user) => {
    setSelectedUser(user);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const columns = [
    {
      title: "Username",
      dataIndex: "lietotajvards",
      key: "username",
    },
    {
      title: "Statuss",
      dataIndex: "statuss",
      key: "statuss",
    },
    {
      title: "Izveidots",
      dataIndex: "izveidots",
      key: "izveidots",
      render: (text) => moment(text).format("YYYY-MM-DD HH:mm:ss"),
    },
    {
      title: "",
      key: "actions",
      render: (text, record) => (
        <>
          <Space size="middle">
            <Button
              onClick={() => handleOpenModal(record)}
              disabled={
                record.statuss === "Atteikts" || record.statuss === "Verificēts"
              }
            >
              Parbaudit
            </Button>
            <Popconfirm
              title="Vai tiešām vēlaties dzēst šo lietotāju?"
              onConfirm={() => handleDeleteUser(record._id)}
              okText="Jā"
              cancelText="Nē"
            >
              <Button danger>Dzēst</Button>
            </Popconfirm>
          </Space>
        </>
      ),
    },
  ];

  const handleDeleteUser = async (userId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token not found");
        return;
      }

      await axios.delete(`http://localhost:8000/api/lietotaji/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      onUpdate();
      message.success("Lietotājs veiksmīgi dzēsts");
      console.log("User deleted successfully");
    } catch (error) {
      console.error("Error deleting user:", error);
      message.error("Kļūda dzēšot lietotāju");
    }
  };

  const handleVerify = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token not found");
        return;
      }

      await axios.put(
        `http://localhost:8000/api/lietotaji/${selectedUser._id}/verify`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      onUpdate();
      handleCloseModal();
      console.log("User status updated successfully");
    } catch (error) {
      console.error("Error updating user status:", error);
    }
  };

  const handleReject = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token not found");
        return;
      }

      await axios.put(
        `http://localhost:8000/api/lietotaji/${selectedUser._id}/reject`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      onUpdate();
      handleCloseModal();
      console.log("User status updated successfully");
    } catch (error) {
      console.error("Error updating user status:", error);
    }
  };

  return (
    <>
      <Table dataSource={users} columns={columns} rowKey="username" />
      <Modal
        title={`Parbaudit lietotāja "${
          selectedUser ? selectedUser.lietotajvards : ""
        }" apliecību`}
        open={modalVisible}
        onCancel={handleCloseModal}
        footer={[
          <Button key="reject" onClick={handleReject}>
            Atteikt
          </Button>,
          <Button key="verify" type="primary" onClick={handleVerify}>
            Verificēt
          </Button>,
        ]}
      >
        {selectedUser && (
          <>
            <img
              src={selectedUser.licenseUrl}
              alt="License"
              style={{ maxWidth: "100%" }}
            />
          </>
        )}
      </Modal>
    </>
  );
};

export default UserTable;
