import React, { useEffect } from "react";
import Posts from "./components/posts/Posts";
import Navbar from "./components/nav/Navbar";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import NotFound from "./components/nav/NotFound";
import Login from "./components/auth/Login";
import Account from "./components/user/Account";
import { useDispatch, useSelector } from "react-redux";
import Register from "./components/auth/Register";
import { getUser } from "./features/user/actions";
import { loginUserSuccess } from "./features/auth/actions";
import ProtectAuth from "./components/protect/ProtectAuth";
import LikedPosts from "./components/posts/LikedPosts";
import UserPosts from "./components/posts/UserPosts";

function App() {
  const dispatch = useDispatch();

  const { isGetUserSuccess } = useSelector((state) => state.user);
  const { isLoginSuccess } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  useEffect(() => {
    if (isGetUserSuccess && !isLoginSuccess) {
      dispatch(loginUserSuccess());
    }
  }, [dispatch, isGetUserSuccess, isLoginSuccess]);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Navbar />}>
        <Route index element={<Posts />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/account"
          element={
            <ProtectAuth>
              <Account />
            </ProtectAuth>
          }
        />
        <Route
          path="/liked-posts"
          element={
            <ProtectAuth>
              <LikedPosts />
            </ProtectAuth>
          }
        />
        <Route
          path="/my-posts"
          element={
            <ProtectAuth>
              <UserPosts />
            </ProtectAuth>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
