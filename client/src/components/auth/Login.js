import { Button, Form, Input } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { usePrevious } from "../../utility/hooks/usePrevious";
import { loginUser } from "../../features/auth/actions";
import ErrorMessage from "../ErrorMessage";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoginRequest, isLoginSuccess, isLoginFailure, error } = useSelector(
    (state) => state.auth
  );
  const prevIsLoginSuccess = usePrevious(isLoginSuccess);

  useEffect(() => {}, []);

  useEffect(() => {
    if (isLoginSuccess && prevIsLoginSuccess === false) {
      navigate("/account");
    }
  }, [isLoginSuccess, prevIsLoginSuccess, navigate]);

  const onFinish = (values) => {
    dispatch(loginUser(values));
  };

  const onFinishFailed = () => {
    console.log("antd login validation failed");
  };

  return (
    <div>
      {error && <ErrorMessage error={error} />}
      <Form
       labelCol={{ span: 8 }}
       wrapperCol={{ span: 16 }}
        name="login"
        style={{
          maxWidth: 600,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
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
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
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
            Log In
          </Button>
        </Form.Item>
      </Form>
      <p>
        Don't have an account yet? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}

export default Login;
