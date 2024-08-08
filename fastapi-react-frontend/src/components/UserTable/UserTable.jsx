import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AxiosApi from '../../services/axios.api'; // Import your AxiosApi
import './UserTable.css';
import toast from 'react-hot-toast';

const UserTable = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        try {
            const token=sessionStorage.getItem('token')
            const data = await AxiosApi.get('/admin/users', {
                Authorization: `Bearer ${token}`,
            });
            setUsers(data);
            toast.success('Users Fetched Successfully!');
        } catch (error) {
            toast.error('Error in fetching Data');
            navigate('/login');
        }
    };

    const handleDelete = async (userId) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this user?');
        if (confirmDelete) {
            try {
                const token = sessionStorage.getItem('token')
                await AxiosApi.del(`/admin/users/${userId}`, {
                    Authorization: `Bearer ${token}`,
                });
                setUsers(users.filter(user => user.id !== userId));
                toast.success('User deleted successfully.');
            } catch (error) {
                toast.error('User deletion unsuccessful.');
            }
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <>
            <div className="userTable-container">
                <h1>Users Table</h1>
                <table className="userTable">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Is Admin</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>
                                    {user.role !== 'ADMIN' && (
                                        <button
                                            className="deleteButton"
                                            onClick={() => handleDelete(user.id)}
                                        >
                                            Delete
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default UserTable;
