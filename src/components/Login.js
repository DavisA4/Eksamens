import React, { useEffect } from "react"; // Importē React no 'react' bibliotēkas
import { Form, Input, Button, message } from "antd"; // Importē Form, Input un Button no 'antd' bibliotēkas
import { useNavigate, Link } from "react-router-dom";

// Definē Login komponenti, kas ļauj lietotājam pieslēgties
const Login = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/"); // Redirect to main page if token exists
    }
  }, []);

  const onFinish = async (values) => {
    try {
      // Replace this fetch call with your own login API endpoint
      const response = await fetch(
        "http://localhost:8000/api/lietotaji/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );
      if (response.ok) {
        const data = await response.json();
        const token = data.token;
        localStorage.setItem("token", token); // Store token in localStorage
        message.success("Veiksmīga pieteikšanās");
        navigate("/");
      } else {
        message.error(
          "Neveiksmīga pieteikšanās. Lūdzu, pārbaudiet savu lietotājvārdu un paroli."
        );
      }
    } catch (error) {
      message.error(
        "Neveiksmīga pieteikšanās. Lūdzu, pārbaudiet savu lietotājvārdu un paroli."
      );
    }
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
        name="loginForm"
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
        onFinish={onFinish}
        autoComplete="off"
      >
        <h2 style={{ marginBottom: "20px" }}>Pieslēgties</h2>
        <Form.Item
          name="lietotajvards"
          style={{ width: "100%" }}
          rules={[
            { required: true, message: "Lūdzu, ievadiet lietotājvārdu!" },
          ]}
        >
          <Input placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="parole"
          style={{ width: "100%" }}
          rules={[{ required: true, message: "Lūdzu, ievadiet paroli!" }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
            Pieslēgties
          </Button>
        </Form.Item>
        <Link to="/registracija" style={{ cursor: "pointer", width: "100%", textAlign: "center" }}>Izveidot kontu</Link>
      </Form>
      
    </div>
  );
};

export default Login;
