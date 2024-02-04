import { message } from "antd";
import axios from "axios";
import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { setUser } from "../redux/usersSlice";
import { showloading, hideloading } from "../redux/alertsSlice";
import DefaultLayout from "./DefaultLayout";

function ProtectedRoute({ children }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);
  const navigate = useNavigate();

  const validateToken = useCallback(async () => {
    try {
      dispatch(showloading())
      const response = await axios.post('/api/users/get-user-by-id', {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      dispatch(hideloading())
      if (response.data.success) {
        dispatch(setUser(response.data.data));
      } else {
        message.error(response.data.message);
        localStorage.removeItem('token');
        navigate('/login');
      }
    } catch (error) {
      dispatch(hideloading())
      message.error(error.message);
      localStorage.removeItem('token');
      navigate('/login');
    }
  }, [dispatch, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      if (localStorage.getItem('token')) {
        await validateToken();
      } else {
        navigate('/login');
      }
    };

    fetchData();
  }, [navigate, validateToken]);

  return (
    <div>{user && <DefaultLayout>{children}</DefaultLayout>}</div>
  );
}

export default ProtectedRoute;
