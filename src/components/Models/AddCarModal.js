// AddCarModal komponente
import React, { useState } from "react";
import { Modal, Form, Input, Upload, Button, InputNumber } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Map from "./Map";

const AddCarModal = ({ isVisible, onCancel, onUpdate }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [clickedCoordinates, setClickedCoordinates] = useState(null);

  // Funkcija, kas tiek izsaukta, kad forma tiek iesniegta
  const onFinish = async (values) => {
    try {
      const formData = new FormData();
      // Pievieno visus formā ievadītos datus formData objektam
      Object.keys(values).forEach((key) => {
        formData.append(key, values[key]);
      });

      // Pievieno attēlu failus formData objektam
      fileList.forEach((file) => {
        formData.append("image", file.originFileObj);
      });

      // Pievieno klikšķa koordinātas formData objektam, ja tās ir pieejamas
      if (clickedCoordinates) {
        formData.append("coordinates", JSON.stringify(clickedCoordinates));
      }

      // Nosūta POST pieprasījumu serverim ar formData
      const response = await fetch(
        "http://localhost:8000/api/masinas/add-masina",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        // Ja pieprasījums ir veiksmīgs, notīra formu un failu sarakstu
        form.resetFields();
        setFileList([]);
        onUpdate();
        onCancel();
      } else {
        console.error("Failed to add car model:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding car model:", error);
    }
  };

  // Funkcija, kas tiek izsaukta, kad klikšķināts uz kartes
  const handleMapClick = (coordinates) => {
    console.log("Clicked coordinates:", coordinates);
    setClickedCoordinates(coordinates); // Atjaunina stāvokli ar klikšķa koordinātām
  };

  // Funkcija failu normalizēšanai
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  // Funkcija, kas tiek izsaukta, kad mainās failu saraksts
  const handleUploadChange = ({ fileList }) => {
    const newFileList = fileList.slice(-3); // Ierobežo failu skaitu līdz 3
    setFileList(newFileList);
  };

  // Funkcija, kas tiek izsaukta, kad tiek atcelts modālais logs
  const handleCancel = () => {
    form.resetFields();
    setFileList([]);
    onCancel();
  };

  return (
    <Modal
      title="Pievienot mašīnu"
      visible={isVisible}
      onOk={() => form.submit()}
      onCancel={handleCancel}
      okText="Pievienot"
      cancelText="Atcelt"
    >
      <Form form={form} name="addCarForm" onFinish={onFinish}>
        <Form.Item
          name="Model"
          label="Marka"
          rules={[{ required: true, message: "Lūdzu, ierakstiet modeli!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="Description"
          label="Apraksts"
          rules={[{ required: true, message: "Lūdzu, ierakstiet aprakstu!" }]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          name="OneH"
          label="1h cena"
          rules={[{ required: true, message: "Lūdzu, ierakstiet 1h cenu!" }]}
        >
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item
          name="TwoH"
          label="2h cena"
          rules={[{ required: true, message: "Lūdzu, ierakstiet 2h cenu!" }]}
        >
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item
          name="FiveH"
          label="5h cena"
          rules={[{ required: true, message: "Lūdzu, ierakstiet 5h cenu!" }]}
        >
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item
          name="OneD"
          label="1d cena"
          rules={[{ required: true, message: "Lūdzu, ierakstiet 1 dienas cenu!" }]}
        >
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item
          name="image"
          label="Attēls"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload
            beforeUpload={() => false}
            fileList={fileList}
            onChange={handleUploadChange}
            maxCount={3}
          >
            <Button icon={<UploadOutlined />}>Pievienot</Button>
          </Upload>
        </Form.Item>
        <Form.Item label="Karte" name="location">
          <Map
            center={[56.9496, 24.1052]}
            zoom={13}
            onMapClick={handleMapClick}
            allowMarkerAddition={true} // Atļaut pievienot marķieri
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddCarModal;
