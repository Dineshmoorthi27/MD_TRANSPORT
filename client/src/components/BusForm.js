import React from "react";
import { Form, Modal, Row, Col, Select, message } from 'antd';
import { axiosInstance } from "../helpers/axiosInstance";
import { useDispatch } from 'react-redux';
import { showloading, hideloading } from "../redux/alertsSlice";
const { Option } = Select;

function BusForm({
    showBusForm,
    setShowBusForm,
    type = 'add',
    getData,
    selectedBus,
    setSelectedBus,
}) {
    const dispatch = useDispatch();
    const onFinish = async (values) => {
        try {
            dispatch(showloading())
            let response = null
            if (type === 'add') {
                response = await axiosInstance.post('/api/buses/add-bus', values);
            } else {
                response = await axiosInstance.post('/api/buses/update-bus', {
                    ...values,
                    _id: selectedBus._id,
                })
            }
            if (response.data.success) {
                message.success(response.data.message);
            } else {
                message.error(response.data.message);
            }
            getData();
            setShowBusForm(false);
            setSelectedBus(null);

            dispatch(hideloading());
        }

        catch (error) {
            message.error(error.message);
            dispatch(hideloading());
        }
    }
    return (
        <Modal width={800}
            title={`${type === 'add' ? 'Add a Bus' : 'Edit Bus'} Information`}
            open={showBusForm}
            onCancel={() => {
                setSelectedBus(null);
                setShowBusForm(false);
            }}
            footer={false}>
            <Form layout="vertical" onFinish={onFinish} initialValues={selectedBus}>
                <Row gutter={[10, 10]}>
                    <Col lg={24} xs={24}>
                        <Form.Item label="Bus Name" name="name">
                            <input type="text" style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>
                    <Col lg={12} xs={24}>
                        <Form.Item label="Bus Number" name="number">
                            <input type="text" style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>
                    <Col lg={12} xs={24}>
                        <Form.Item label="Capacity" name="capacity">
                            <input type="text" style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>
                    <Col lg={12} xs={24}>
                        <Form.Item label="From" name="from">
                            <input type="text" style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>
                    <Col lg={12} xs={24}>
                        <Form.Item label="To" name="to">
                            <input type="text" style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>
                    <Col lg={8} xs={24}>
                        <Form.Item label="Journey Date" name="DOJ">
                            <input type="date" style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>
                    <Col lg={8} xs={24}>
                        <Form.Item label="Departure" name="departure">
                            <input type="time" style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>
                    <Col lg={8} xs={24}>
                        <Form.Item label="Arrival" name="arrival">
                            <input type="time" style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>
                    <Col lg={12} xs={24}>
                        <Form.Item label="Type" name="type">
                            <Select style={{ width: '100%' }} defaultValue="ALL CLASSES">
                                <Option value="ALL CLASSES">ALL CLASSES</Option>
                                <Option value="AC SLEEPER">AC SLEEPER</Option>
                                <Option value="AC SLEEPER SEATER">AC SLEEPER SEATER</Option>
                                <Option value="AIR CONDITIONED">AIR CONDITIONED</Option>
                                <Option value="CLASSIC">CLASSIC</Option>
                                <Option value="LUXURY">LUXURY</Option>
                                <Option value="DELUXE">DELUXE</Option>
                                <Option value="DELUX 3X2">DELUX 3X2</Option>
                                <Option value="NON AC SLEEPER">NON AC SLEEPER</Option>
                                <Option value="NON AC SLEEPER SEATER">NON AC SLEEPER SEATER</Option>
                                <Option value="ORDINARY">ORDINARY</Option>
                                <Option value="ULTRA DELUX">ULTRA DELUX</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col lg={12} xs={24}>
                        <Form.Item label="Price" name="Price">
                            <input type="text" style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>

                    <div className="d-flex justify-content-end">
                        <button className='secondary-btn' type="submit">Save</button>
                    </div>
                </Row>
            </Form>
        </Modal>
    )
}

export default BusForm;
