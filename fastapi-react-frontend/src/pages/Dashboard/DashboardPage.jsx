import React, { useEffect, useState } from 'react'
import TopBar from '../../components/TopBar/TopBar'
import SideBar from '../../components/SideBar/SideBar'
import Dashboard from '../../components/Dashboard/Dashboard'
import Auth from '../../services/auth'
import PrincipalService from '../../services/principal.service'
import PrincipalState from '../../services/principal.state'
import {useNavigate} from 'react-router-dom';

import './DashboardPage.css'

const DashboardPage = () => {
    const [is_admin,setIs_admin]=useState(false);
    const navigate=useNavigate();
    const authorize = async () => {
        try {
            await Auth.authorize();
            await PrincipalService.isAuthenticated()
            const userIdentity = PrincipalState.getIdentity();
            setIs_admin(userIdentity.is_admin);
        } catch (err) { 
            navigate("/login");
        }

    };
    const Actions=[
        {
            "title":"Users",
        }, {
            "title": "Add New User",
        }, {
            "title": "Profile",
        }, {
            "title": "Logout",
        }
    ]
    useEffect(()=>{
        authorize();
    })
    return (
        <>
            <div className='dashboard-container'>
                <TopBar />
                <div className='content-conatiner'>
                    <SideBar Actions={Actions}/>
                    <Dashboard/>
                </div>
            </div>
        </>
    )
}

export default DashboardPage;
