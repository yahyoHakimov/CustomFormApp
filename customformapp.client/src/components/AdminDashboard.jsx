import React, { useEffect, useState } from 'react';
import { fetchAllUsers, updateUserRole, blockUser, unblockUser } from '../services/adminService';

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const loadUsers = async () => {
            try {
                const response = await fetchAllUsers();
                setUsers(response);
            } catch (error) {
                console.error('Failed to load users:', error);
            }
        };

        loadUsers();
    }, []);

    const handleBlockUser = async (userId) => {
        try {
            await blockUser(userId);
            alert('User blocked successfully');
        } catch (error) {
            console.error('Failed to block user:', error);
        }
    };

    const handleUnblockUser = async (userId) => {
        try {
            await unblockUser(userId);
            alert('User unblocked successfully');
        } catch (error) {
            console.error('Failed to unblock user:', error);
        }
    };

    const handlePromoteUser = async (userId) => {
        try {
            await updateUserRole(userId, 'admin');
            alert('User promoted to admin');
        } catch (error) {
            console.error('Failed to promote user:', error);
        }
    };

    return (
        <div>
            <h2>Admin Dashboard</h2>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        {user.email} - {user.role}
                        <button onClick={() => handleBlockUser(user.id)}>Block</button>
                        <button onClick={() => handleUnblockUser(user.id)}>Unblock</button>
                        <button onClick={() => handlePromoteUser(user.id)}>Promote to Admin</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminDashboard;
