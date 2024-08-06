import React from 'react';
import UserTable from '../../components/UserTable/UserTable';
import './AdminPage.css';

const AdminPage = () => {
    return (
        <div className='adminPage-container'>
            <h1 className='adminPage-title'>Admin Actions</h1>
            <UserTable />
        </div>
    );
};

export default AdminPage;
