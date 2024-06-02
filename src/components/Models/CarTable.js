import React, { useState, useEffect } from "react";
import { Table, Space } from "antd";
import axios from "axios";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import EditCarModal from "./EditCarModal";

const CarTable = ({filteredData}) => {
  // State to store the data fetched from the database
  const [data, setData] = useState([]);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  // Function to fetch data from the database
  const fetchData = async () => {
    try {
      // Make a GET request to fetch data from the database
      const response = await axios.get("http://localhost:8000/api/masinas");
      // Set the data state with the fetched data
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Call the fetchData function

  useEffect(() => {
    fetchData();
  }, []);

  const handleEdit = (record) => {
    // Extract only the necessary fields from the record
    const selectedRecord = {
      _id: record._id,
      Model: record.Model,
      Description: record.Description,
      OneH: record.OneH,
      TwoH: record.TwoH,
      FiveH: record.FiveH,
      OneD: record.OneD,
    };

    setSelectedRecord(selectedRecord);
    setEditModalVisible(true);
  };

  const handleEditCancel = () => {
    setEditModalVisible(false);
    setSelectedRecord(null);
  };

  const handleDelete = async (recordId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `http://localhost:8000/api/masinas/${recordId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Car deleted successfully:", response.data);
      // Update the data state or refetch data if necessary
    } catch (error) {
      console.error("Error deleting car:", error);
      // Handle error
    }
  };

  const columns = [
    {
      title: "Marka",
      dataIndex: "Model",
      key: "Model",
      sorter: (a, b) => a.Model.localeCompare(b.Model),
    },
    {
      title: "Apraksts",
      dataIndex: "Description",
      key: "Description",
      sorter: (a, b) => a.Description.localeCompare(b.Description),
    },
    {
      title: "1h",
      dataIndex: "OneH",
      key: "OneH",
      sorter: (a, b) => a.OneH - b.OneH,
      render: (text) => `${text} €`,
    },
    {
      title: "2h",
      dataIndex: "TwoH",
      key: "TwoH",
      sorter: (a, b) => a.TwoH - b.TwoH,
      render: (text) => `${text} €`,
    },
    {
      title: "5h",
      dataIndex: "FiveH",
      key: "FiveH",
      sorter: (a, b) => a.FiveH - b.FiveH,
      render: (text) => `${text} €`,
    },
    {
      title: "1 diena",
      dataIndex: "OneD",
      key: "OneD",
      sorter: (a, b) => a.OneD - b.OneD,
      render: (text) => `${text} €`,
    },
    {
      title: "",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <EditOutlined
           className="icons"
            onClick={() => handleEdit(record)}
          />
          <DeleteOutlined
           className="icons"
            onClick={() => handleDelete(record._id)}
          />
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Table dataSource={filteredData} columns={columns} />
      <EditCarModal
        visible={editModalVisible}
        onCancel={handleEditCancel}
        record={selectedRecord}
        onUpdate={fetchData}
      />
    </div>
  );
};

export default CarTable;
