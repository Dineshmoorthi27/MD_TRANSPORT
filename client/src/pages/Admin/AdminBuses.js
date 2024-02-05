import React, { useEffect, useState } from 'react';
import PageTitle from '../../components/PageTitle';
import BusForm from '../../components/BusForm';
import { hideloading, showloading } from '../../redux/alertsSlice';
import { axiosInstance } from '../../helpers/axiosInstance';
import { message, Table } from 'antd';
import { useDispatch } from 'react-redux';

function AdminBuses() {
    const dispatch = useDispatch();
    const [showBusForm, setShowBusForm] = React.useState(false);
    const [buses, setBuses] = useState([]);
    const [selectedBus, setSelectedBus] = useState(null);

    //get all buses
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

    // delete buses
    const deleteBus = async (id) => {
        try {
            dispatch(showloading());
            const response = await axiosInstance.post("/api/buses/delete-bus", {
                _id: id,
            });
            dispatch(hideloading());
            if (response.data.success) {
                message.success(response.data.message);
            } else {
                message.error(response.data.message);
            }
        } catch (error) {
            dispatch(hideloading());
            message.error(error.message);
        }
    };


    const columns = [
        {
            title: " Transport Name",
            dataIndex: "name",
        },
        {
            title: " Vehicle Number",
            dataIndex: "number",
        },
        {
            title: "From",
            dataIndex: "from",
        },
        {
            title: "To",
            dataIndex: "to",
        },
        {
            title: "Jounary Date",
            dataIndex: "DOJ",
        },
        {
            title: "Status",
            dataIndex: "status",
        },
        {
            title: "Action",
            dataIndex: "action",
            render: (action, record) => (
                <div className='d-flex gap-3'>
                    <i class="ri-edit-2-fill" onClick={() => {
                        setSelectedBus(record);
                        setShowBusForm(true);
                    }
                    }></i>
                    <i class="ri-delete-bin-fill" onClick={() => {
                        deleteBus(record._id);
                    }
                    }></i>
                </div>
            )
        },

    ]

    useEffect(() => {
        getBuses();
    }, [])

    return (
        <div>
            <div className='d-flex justify-content-between'>
                <PageTitle title='Buses' />
                <button className='secondary-btn'
                    onClick={() => setShowBusForm(true)}
                >Add Bus</button>
            </div>

            <br />
            <Table dataSource={buses} columns={columns} />;

            {showBusForm &&
                <BusForm
                    showBusForm={showBusForm}
                    setShowBusForm={setShowBusForm}
                    type={selectedBus ? "edit" : "add"}
                    selectedBus={selectedBus}
                    setSelectedBus={getBuses}
                    getData={getBuses}


                />}
        </div>
    )
}

export default AdminBuses
