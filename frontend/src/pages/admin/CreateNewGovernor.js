// src/components/CreateAdmin.js
import React, { useState } from 'react';
import { Form, Input, Button, notification } from 'antd';
import { createGovernor } from "../../api/AdminService"; // Adjust the path as necessary
import AdminNavBar from "../../components/admin/AdminNavBar";
import { message } from "antd";

const CreateGovernor = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await createGovernor(username, password);
      message.success(`Governer ${response.userName} created successfully`)
      setUsername(''); // Reset the form
      setPassword('');
    } catch (error) {
      message.error(error.message)
    };
  }
  return (
    <> <AdminNavBar />
      <div style={{ width: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ddd', borderRadius: '5px' }}>
        <h2>Create New Governor</h2>
        <Form onFinish={handleSubmit}>
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input a username!' }]}
          >
            <Input value={username} onChange={(e) => setUsername(e.target.value)} />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input a password!' }]}
          >
            <Input.Password value={password} onChange={(e) => setPassword(e.target.value)} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
              Create Governor
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default CreateGovernor;
