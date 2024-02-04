import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import '../resourses/layout.css';
import { useSelector } from "react-redux";


function DefaultLayout({ children }) {
    const navigate = useNavigate();
    const location = useLocation();
    const [collapsed, setCollapsed] = React.useState(false);
    const { user } = useSelector(state => state.users);
    const userMenu = [
        {
            name: "Home",
            icon: 'ri-home-line',
            path: '/',
        },
        {
            name: 'Bookings',
            icon: 'ri-file-list-2-line',
            path: '/booking',
        },
        {
            name: 'profile',
            icon: 'ri-user-line',
            path: '/profile',
        },
        {
            name: 'Logout',
            icon: 'ri-logout-box-r-line',
            path: '/logout',
        }

    ];
    const adminMenu = [
        {
            name: 'Home',
            path: '/admin',
            icon: 'ri-home-line',
        },
        {
            name: 'Buses',
            path: '/admin/buses',
            icon: 'ri-bus-fill',
        },
        {
            name: 'Users',
            path: '/admin/users',
            icon: 'ri-user-line',
        },
        {
            name: 'Bookings',
            path: '/admin/bookings',
            icon: 'ri-file-list-2-line',
        },
        {
            name: 'Logout',
            path: '/logout',
            icon: 'ri-logout-box-r-line',
        },
    ];

    const menuToBeRendered = user?.isAdmin ? adminMenu : userMenu;
    const activeRoute = location.pathname;

    return (
        <div className="layout-parent">
            <div className="sidebar">
                <div className="sidebar-header">
                    <h1 className="logo">MD Transports</h1>
                    <h1 className="role">
                        {user && (
                            <>
                                {user.name}
                                <br />
                                Role: {user?.isAdmin ? 'Admin' : 'User'}
                            </>
                        )}
                    </h1>
                </div>
                <div className="d-flex flex-column gap-3 justify-content-start menu">
                    {menuToBeRendered.map((item, index) => (
                        <div className={`${activeRoute === item.path && 'active-menu-item'} menu-item`} key={index}>
                            <i className={item.icon}></i>
                            {!collapsed && (
                                <span
                                    onClick={() => {
                                        if (item.path === "/logout") {
                                            localStorage.removeItem("token");
                                            navigate("/login");
                                        } else {
                                            navigate(item.path);
                                        }
                                    }}
                                >
                                    {item.name}
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <div className="body">
                <div className="header">
                    {collapsed ? (
                        <i className="ri-menu-line" onClick={() => setCollapsed(!collapsed)}></i>
                    ) : (
                        <i className="ri-close-line" onClick={() => setCollapsed(!collapsed)}></i>
                    )}
                </div>
                <div className="content">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default DefaultLayout;
