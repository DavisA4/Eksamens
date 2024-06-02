import React from "react";
import { Modal, Form, Input, InputNumber, Button, Upload } from "antd";
import axios from "axios";

const EditCarModal = ({ visible, onCancel, record, onUpdate }) => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      const formData = new FormData();
      formData.append("Model", values.Model);
      formData.append("Description", values.Description);
      formData.append("OneH", values.OneH);
      formData.append("TwoH", values.TwoH);
      formData.append("FiveH", values.FiveH);
      formData.append("OneD", values.OneD);

      if (values.image && values.image.length > 0) {
        // Add the uploaded images to the form data with the same field name "image"
        values.image.forEach((file, index) => {
          formData.append("image", file.originFileObj); // Use the same field name "image"
        });
      }

      const token = localStorage.getItem("token");

      // Make a PUT request to update the Masina
      const response = await axios.put(
        `http://localhost:8000/api/masinas/${record._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Masina updated successfully:", response.data);
      handleCancel();
      onUpdate();
    } catch (error) {
      console.error("Error updating Masina:", error);
      // Handle error
    }
  };

  const handleCancel = () => {
    onCancel();
    form.resetFields();
    form.setFieldsValue(null); // Reset initialValues to null
  };

  return (
    <Modal
      maskClosable={false}
      title="Rediģēt mašīnu"
      open={visible}
      onOk={() => form.submit()}
      onCancel={handleCancel}
      okText="Saglabā't"
      cancelText="Atcelt"
    >
      <Form
        form={form}
        initialValues={record}
        name="editCarForm"
        onFinish={onFinish}
      >
        <Form.Item
          name="Model"
          label="Marka"
          rules={[{ required: true, message: "Please input the model!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="Description"
          label="Apraksts"
          rules={[{ required: true, message: "Please input the description!" }]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          name="OneH"
          label="1h cena"
          rules={[{ required: true, message: "Please input the 1h price!" }]}
        >
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item
          name="TwoH"
          label="2h cena"
          rules={[{ required: true, message: "Please input the 2h price!" }]}
        >
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item
          name="FiveH"
          label="5h cena"
          rules={[{ required: true, message: "Please input the 5h price!" }]}
        >
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item
          name="OneD"
          label="1d cena"
          rules={[{ required: true, message: "Please input the 1 day price!" }]}
        >
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item
          name="image"
          label="Attēli"
          valuePropName="fileList"
          getValueFromEvent={(e) => e && e.fileList}
        >
          <Upload beforeUpload={() => false} maxCount={3}>
            <Button>Pievienot</Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditCarModal;
