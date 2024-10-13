import React, { useEffect, useState } from 'react';
import { getUsers, deleteUser } from "../../api/AdminService"; // Assuming getUsers is an async function
import AdminNavBar from "../../components/admin/AdminNavBar";
import './UserList.css'; // Import a CSS file for styling
import { message } from 'antd'
const UserList = () => {
  const [users, setUsers] = useState([]);
  const [initLoading, setInitLoading] = useState(true);

  useEffect(() => {
    // Declare the async function inside the useEffect
    const fetchData = async () => {
      try {
        const response = await getUsers();
        setUsers(response.users); // Assuming `response.users` contains the users array
        setInitLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setInitLoading(false);
        message.error("Failed to fetch users!"); // Notify error on user fetch
      }
    };

    fetchData(); // Call the async function
  }, []); // Empty dependency array to run only once

  // Function to handle user deletion
  const deleteUsers = async (id) => {
    try {
      const response = await deleteUser(id); // Call API to delete user
      const messageText = "User deleted successfully";
      const updatedData = users.filter((item) => item.userId !== id);
      setUsers(updatedData);
      message.success(messageText);

    } catch (error) {
      console.error(`Error deleting user with id ${id}:`, error);
      message.error("Failed to delete user!");
    }
  };

  if (initLoading) return <div>Loading...</div>; // Loading state

  return (
    <>
      <AdminNavBar />
      <div className="user-list-container">

        <h1 className="user-list-title">User List</h1>
        <ul className="user-list">
          {users.map(user => (
            <li key={user._id} className="user-list-item">
              <div className="user-details">
                <span><strong>User Name:</strong> {user.userName}</span>
                <span><strong>ID:</strong> {user._id}</span>
                <span><strong>Type:</strong> {user.role}</span>
              </div>
              {user.role != "Admin" && <button className="delete-button" onClick={() => deleteUsers(user.userId)}>Delete</button>
              }
            </li>
          ))}
        </ul>


      </div>
    </>
  );
};

export default UserList;
