import { Button, Form, Input } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../features/auth/actions";
import { usePrevious } from "../../utility/hooks/usePrevious";
import ErrorMessage from "../ErrorMessage";

function Register() {
  const { isAuthenticated, error } = useSelector((state) => state.auth);
  const { isRegisterSuccess } = useSelector((state) => state.auth);
  const prevIsRegisterSuccess = usePrevious(isRegisterSuccess);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/account");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (isRegisterSuccess && prevIsRegisterSuccess === false) {
      navigate("/login");
    }
  }, [isRegisterSuccess, prevIsRegisterSuccess, navigate]);

  const onFinish = (values) => {
    dispatch(registerUser(values));
  };

  const onFinishFailed = () => {
    console.log("antd Register validation failed");
  };

  const validateConfirmPassword = ({ getFieldValue }) => {
    return {
      validator(_, value) {
        if (!value || getFieldValue("password") === value) {
          return Promise.resolve();
        }
        return Promise.reject("Passwords do not match");
      },
    };
  };

  return (
    <div>
      {error && <ErrorMessage error={error} />}
      <Form
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
        name="register"
        style={{
          maxWidth: 600,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="First Name"
          name="firstName"
          rules={[
            {
              required: true,
              message: "Please input your first name!",
            },
            {
              pattern: /^[A-Za-z]+$/,
              message: "First name must contain letters only",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Last Name"
          name="lastName"
          rules={[
            {
              required: true,
              message: "Please input your last name!",
            },
            {
              pattern: /^[A-Za-z]+$/,
              message: "Last name must contain letters only",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input type="email" />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          extra="Password can contain only alphanumeric characters"
          rules={[
            {
              required: true,
              message: "Please input a password!",
            },
            {
              pattern: /^[a-zA-Z0-9]+$/,
              message: "Password is not valid",
            },
            { min: 6, message: "Password must be at least 6 characters long" },
            { max: 30, message: "Password can have a maximum of 30 characters" },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Confirm Password"
          name="confirmPassword"
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            validateConfirmPassword,
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Register;
