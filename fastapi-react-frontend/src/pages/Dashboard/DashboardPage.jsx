import React, { useEffect, useState } from 'react'
import TopBar from '../../components/TopBar/TopBar'
import SideBar from '../../components/SideBar/SideBar'
import Auth from '../../services/auth'
import PrincipalService from '../../services/principal.service'
import PrincipalState from '../../services/principal.state'
import { useNavigate } from 'react-router-dom';
import AdminDashboard from '../../components/AdminDashboard/AdminDashboard'
import UserDashboard from '../../components/UserDashboard/UserDashboard'
import UserTable from "../../components/UserTable/UserTable"
import UserProfile from '../../components/UserProfile/UserProfile'
import './DashboardPage.css'
import toast from 'react-hot-toast'

const DashboardPage = () => {
    const [role, setRole] = useState(sessionStorage.getItem("role"));
    const [selectedAction, setSelectedAction] = useState("Dashboard");
    const navigate = useNavigate();
    const authorize = async () => {
        try {
            await Auth.authorize();
            await PrincipalService.isAuthenticated()
            const userIdentity = PrincipalState.getIdentity();
            setRole(userIdentity.role);
        } catch (err) {
            navigate("/login");
        }

    };

    const AdminActions = [
        { "title": "Profile" },
        { "title": "Users" },
        { "title": "Add New User" },
        { "title": "Logout" },
    ];

    const UserActions = [
        { "title": "Profile" },
        { "title": "Logout" },
    ];
    const renderContent = () => {
        if (role === "ADMIN") {
            switch (selectedAction) {
                case "Profile":
                    return <UserProfile/>;
                case "Users":
                    return <UserTable/>;
                case "Add New User":
                    return <div><h1>Add New User</h1></div>;
                case "Logout":
                    return;
                default:
                    return ;
            }
        } else {
            switch (selectedAction) {
                case "Profile":
                    return <UserProfile />;
                case "Logout":
                    return ;
                default:
                    return ;
            }
        }
    };
    const handleActionClick = (action) => {
        setSelectedAction(action);
    };
    const handleLogout = () => {
        toast.success("Logout Successfully!");
        Auth.cleanAuth();
        sessionStorage.removeItem("role"); // Clear role from sessionStorage
        navigate("/login"); // Redirect to login page
    };
    useEffect(() => {
        authorize();
    }, []); // Added empty dependency array to run only once on mount

    useEffect(() => {
        if (selectedAction === "Logout") {
            handleLogout();
        }
    }, [selectedAction]);
    return (
        <>
            <div className='dashboard-container'>
                <TopBar />
                <div className='content-conatiner'>
                    <SideBar Actions={role === "ADMIN" ? (AdminActions) : (UserActions)} handleActionClick={handleActionClick}/>
                    {
                        role === "ADMIN" ? (
                            <AdminDashboard>{renderContent()}</AdminDashboard>
                        ) : (
                                <UserDashboard >{renderContent()}</UserDashboard>
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default DashboardPage;
