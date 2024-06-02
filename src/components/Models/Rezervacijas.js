import React from "react";
import { Table, message } from "antd";
import moment from "moment";
import Header from "../Navbar";

import { DeleteOutlined } from "@ant-design/icons";
import axios from "axios";

const RezervacijasTable = ({ rezervacijas, onDelete }) => {
  // Apstrādā dzēšanas notikumu
  const handleDelete = async (userId) => {
    try {
      // Veic DELETE pieprasījumu, lai dzēstu rezervāciju pēc lietotāja ID
      await axios.delete(
        `http://localhost:8000/api/rezervacijas/delete-rezervacija/${userId}`
      );
      // Izsauc funkciju, lai atjaunotu rezervāciju datus
      onDelete();
      message.success("Rezervācijas veiksmīgi izdzēsta");
    } catch (error) {
      message.error("Dzēšana nav izdevusies");
    }
  };

  // Tabulas kolonnu definīcijas
  const columns = [
    {
      title: "Lietotāja ID",
      dataIndex: "userId",
      key: "userId",
    },
    {
      title: "Mašīnas ID",
      dataIndex: "carId",
      key: "carId",
    },
    {
      title: "Intervāli",
      dataIndex: "intervals",
      key: "intervals",
      render: (intervals) => {
        if (Array.isArray(intervals) && intervals.length === 2) {
          const start = moment(intervals[0]).format("YYYY-MM-DD HH:mm:ss");
          const end = moment(intervals[1]).format("YYYY-MM-DD HH:mm:ss");
          return `${start} - ${end}`;
        }
        return "Nederīgs intervāls";
      },
    },
    {
      title: "Cena",
      dataIndex: "cena",
      key: "cena",
      render: (text) => `${text} €`,
    },
    {
      title: "Izveidots",
      dataIndex: "izveidots",
      key: "izveidots",
      render: (text) => moment(text).format("YYYY-MM-DD HH:mm:ss"),
    },
    {
      title: "Darbība",
      key: "action",
      render: (text, record) => (
        // Ikonu, kas nodrošina iespēju dzēst rezervāciju
        <DeleteOutlined
          className="icons"
          onClick={() => handleDelete(record.userId)}
        />
      ),
    },
  ];

  return (
    <>
      <Header />
      {/* Attēlo rezervāciju tabulu ar norādītajām kolonnām un datiemu */}
      <Table dataSource={rezervacijas} columns={columns} rowKey="username" />;
    </>
  );
};

export default RezervacijasTable;
