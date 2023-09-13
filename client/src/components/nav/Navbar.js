import React, { useEffect, useState } from "react";
import {
  UserOutlined,
  LogoutOutlined,
  LoginOutlined,
  SettingOutlined,
  LikeOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../features/auth/actions";
import { useLogout } from "../../utility/hooks/useLogout";

function Navbar() {
  const [current, setCurrent] = useState("blog");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation(); 

  const { isLoginSuccess, isLogoutSuccess } = useSelector((state) => state.auth);

  useLogout(isLogoutSuccess);

  useEffect(() => {
    const path = location.pathname; 
    setCurrent(path);
  }, [location.pathname]); 

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const onClick = (e) => {
    if (e.key === "logout") {
      handleLogout();
      return;
    }
    navigate(e.key);
  };

  const items = [
    {
      label: "Blog",
      key: "/",
    },
    {
      label: "Account",
      key: "/account",
      icon: <UserOutlined />,
      onTitleClick: () => navigate("/account"),
      children: isLoginSuccess
        ? [
            {
              label: "Liked Posts",
              key: "/liked-posts",
              icon: <LikeOutlined />,
            },
            {
              label: "My Posts",
              key: "/my-posts",
              icon: <ProfileOutlined />,
            },
            {
              label: "Settings",
              key: "/settings",
              icon: <SettingOutlined />,
            },
            {
              label: "Log Out",
              key: "logout",
              icon: <LogoutOutlined />,
              danger: true,
            },
          ]
        : [
            {
              label: "Log In / Register",
              key: "/login",
              icon: <LoginOutlined />,
            },
          ],
    },
  ];

  return (
    <>
      <Menu mode="horizontal" items={items} selectedKeys={[current]} onClick={onClick} />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default Navbar;
