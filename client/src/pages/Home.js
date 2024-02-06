import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { axiosInstance } from '../helpers/axiosInstance';
import { hideloading, showloading } from '../redux/alertsSlice';
import { useDispatch } from 'react-redux';
import { Row, Col, message } from 'antd';
import Bus from '../components/Bus';
function Home() {
  const dispatch = useDispatch();
  const [buses, setBuses] = useState([]);

  //get bus
  const getBuses = async () => {
    try {
      dispatch(showloading());
      const response = await axiosInstance.post("/api/buses/get-all-buses", {});
      dispatch(hideloading());
      if (response.data.success) {
        setBuses(response.data.data);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideloading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    getBuses();
  }, [])

  return (
    <div>
      <div>

      </div>
      <div>
        <Row>
          {buses.map(bus => (
            <Col lg={12} xs={24} sm={24}>
              <Bus bus={bus} />
            </Col>
          ))
          }

        </Row>

      </div>
    </div>
  );
}

export default Home;
