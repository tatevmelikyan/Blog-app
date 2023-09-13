import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../features/user/actions";
import { useNavigate } from "react-router-dom";
import Title from "antd/es/typography/Title";
import { Spin } from "antd";

function Account() {
  const { user, isGetUserRequest, isGetUserFailure } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      dispatch(getUser());
    }
  }, [dispatch, user]);

  return (
    <div>
      {!user ? (
        <Spin />
      ) : (
        <Title>
          Hello {user.firstName} {user.lastName}
        </Title>
      )}
    </div>
  );
}

export default Account;
