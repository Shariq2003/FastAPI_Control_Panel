import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UserTable.css';

const UserTable = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://127.0.0.1:8000/admin/users', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setUsers(response.data);
        };

        fetchUsers();
    }, []);

    const handleDelete = async (userId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this user?");
        if (confirmDelete) {
            const token = localStorage.getItem('token');
            await axios.delete(`http://127.0.0.1:8000/admin/users/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setUsers(users.filter(user => user.id !== userId));
            alert('User deleted successfully.');
        }
    };

    return (
        <div className="userTable-container">
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
                            <td>{user.is_admin ? "Yes" : "No"}</td>
                            <td>
                                {!user.is_admin && (
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
    );
};

export default UserTable;
