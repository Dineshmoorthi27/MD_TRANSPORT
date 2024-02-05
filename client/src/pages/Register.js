import React from 'react';
import { Form, Input, message } from 'antd';
import { Link } from "react-router-dom";
import axios from "axios";
import leftImg from './left_img.png';
import rightImg from './right_img.png';
function Register() {
  const onFinish = async (values) => {
    try {
      const response = await axios.post("/api/users/register", values);
      if (response.data.success) {
        message.success(response.data.message);
      }
      else {
        message.error(response.data.message);
      }
    } catch (error) {
      message.error(error.message)
    }
  };
  return (
    <div className='h-screen d-flex justify-content-center align-items-center'>
      <div className='leftImage-login'>
        <img src={leftImg} alt="logo" />
      </div>
      <div className='w-400 card p-4'>
        <Form layout='vertical' onFinish={onFinish}>
          <h2>User Registration</h2>
          <Form.Item label='Name' name="name">
            <Input type="text" />
          </Form.Item>
          <Form.Item label='Email' name="email">
            <Input type="text" />
          </Form.Item>
          <Form.Item label='Password' name="password" >
            <Input type="password" />
          </Form.Item>

          <div className="d-flex justify-content-between text-center">
            <Link to="/login">Click Here to login </Link>
            <button className="secondary-btn" type='submit'>Register</button>
          </div>
        </Form>
      </div>
      <div className='rightImage-login'>
        <img src={rightImg} alt="right_img"></img>
      </div>
    </div>
  );
}

export default Register;
