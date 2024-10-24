import React, { useEffect, useState } from 'react';
import { fetchAllUsers, updateUserRole, blockUser, unblockUser } from '../services/adminService';

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const loadUsers = async () => {
            setLoading(true);
            try {
                const response = await fetchAllUsers();
                setUsers(response);
            } catch (error) {
                console.error('Failed to load users:', error);
                setError('Failed to load users. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        loadUsers();
    }, []);

    const handleBlockUser = async (userId) => {
        try {
            await blockUser(userId);
            alert('User blocked successfully');
            setUsers(users.map(user => user.id === userId ? { ...user, blocked: true } : user));
        } catch (error) {
            console.error('Failed to block user:', error);
            alert('Failed to block user');
        }
    };

    const handleUnblockUser = async (userId) => {
        try {
            await unblockUser(userId);
            alert('User unblocked successfully');
            setUsers(users.map(user => user.id === userId ? { ...user, blocked: false } : user));
        } catch (error) {
            console.error('Failed to unblock user:', error);
            alert('Failed to unblock user');
        }
    };

    const handleToggleRole = async (userId, currentRole) => {
        const newRole = currentRole === 'admin' ? 'user' : 'admin';
        try {
            await updateUserRole(userId, newRole);
            alert(`User role changed to ${newRole}`);
            setUsers(users.map(user => user.id === userId ? { ...user, role: newRole } : user));
        } catch (error) {
            console.error(`Failed to change role to ${newRole}:`, error);
            alert(`Failed to change role to ${newRole}`);
        }
    };

    return (
        <div>
            <h2>Admin Dashboard</h2>
            {loading ? (
                <p>Loading users...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <ul>
                    {users.map((user) => (
                        <li key={user.id}>
                            {user.email} - {user.role} - {user.blocked ? 'Blocked' : 'Active'}
                            <button onClick={() => handleBlockUser(user.id)} disabled={user.blocked}>
                                Block
                            </button>
                            <button onClick={() => handleUnblockUser(user.id)} disabled={!user.blocked}>
                                Unblock
                            </button>
                            <button onClick={() => handleToggleRole(user.id, user.role)}>
                                {user.role === 'admin' ? 'Demote to User' : 'Promote to Admin'}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AdminDashboard;
