import React, { useState } from "react";
import { Form, Input, Button, Upload, message } from "antd";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Registracija = () => {
  const [fileList, setFileList] = useState([]); // State to manage uploaded files
  const navigate = useNavigate(); // Hook for navigation

  // Function to handle form submission
  const onFinish = async (values) => {
    try {
      const formData = new FormData();
      fileList.forEach((file) => {
        formData.append("image", file.originFileObj);
      });
      formData.append("lietotajvards", values.lietotajvards);
      formData.append("parole", values.parole);

      const response = await axios.post(
        "http://localhost:8000/api/lietotaji/registracija",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 201) {
        message.success("Veiksmīga reģistrācija");
        navigate("/login");
      } else {
        message.error("Reģistrācija neizdevas: " + response.data.message);
      }
    } catch (error) {
      console.error("Kļūda reģistrējoties:", error);
      if (error.response && error.response.data) {
        message.error("Reģistrācija neizdevas: " + error.response.data.message);
      } else {
        message.error("Notika kļūda. Mēģiniet velreiz.");
      }
    }
  };

  // Function to handle file changes
  const onChange = ({ fileList }) => {
    setFileList(fileList);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Form
        name="registrationForm"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
          borderRadius: "5px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          width: "300px",
          backgroundColor: "white",
        }}
        initialValues={{ remember: true }}
        onFinish={onFinish} // Bind the onFinish handler
        autoComplete="off"
      >
        <h2 style={{ marginBottom: "20px" }}>Reģistrācija</h2>
        <Form.Item
          name="lietotajvards"
          style={{ width: "100%" }}
          rules={[
            { required: true, message: "Lūdzu, ierakstiet lietotājvārdu!" },
          ]}
        >
          <Input placeholder="Lietotājvārds" />
        </Form.Item>
        <Form.Item
          name="parole"
          style={{ width: "100%" }}
          rules={[{ required: true, message: "Lūdzu, ierakstiet paroli!" }]}
        >
          <Input.Password placeholder="Parole" />
        </Form.Item>
        <Form.Item>
          <Upload
            beforeUpload={() => false} // Disable automatic upload
            onChange={onChange}
            fileList={fileList}
            maxCount={1}
            accept="image/*"
          >
            <Button>Braukšanas apliecība</Button>
          </Upload>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
            Reģistrēties
          </Button>
        </Form.Item>
        <Link to="/login" style={{ cursor: "pointer", width: "100%", textAlign: "center" }}>
          Pieslēgties
        </Link>
      </Form>
    </div>
  );
};

export default Registracija; // Export the Registracija component
