import '../styles/UserTable.css'
import '../styles/Global.css'
import React, { useState, useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import axios from 'axios';
import AddUserModal from './AddUserModal';
import 'bootstrap/dist/css/bootstrap.min.css';


const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEdit,setShowEdit] = useState(false)
  const [userToEdit,setUserToEdit] = useState('')

  const handleShow = () => setShowModal(true);
  const handleClose = () => {
    setUserToEdit(null)
    setShowModal(false);
  }

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/users');
      setUsers(response.data.users);
    } catch (error) {
      console.log("An error occurred: ", error);
    }
  };
  useEffect(() => {

    fetchUsers();
  }, []);

  const addUser = async (user) => {
    console.log(user);
    try {
      await axios.post('http://127.0.0.1:8000/api/register', user, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      fetchUsers(); // Refresh the user list after adding a new user
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const updateUser = async (user) => {
    console.log(user);
    try {
      await axios.put(`http://127.0.0.1:8000/api/users/${user.id}`, user, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      fetchUsers(); // Refresh the user list after editing a user
    } catch (error) {
      console.error('Error editing user:', error);
    }
  };

  const handleEditClick = (user) => {
    setUserToEdit(user)
    handleShow()
  }

  const handleDeleteClick = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      // Call the delete function if confirmed
      deleteUser(userId);
    }
  };
  
  const deleteUser = async (userId) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/users/${userId}`);
      fetchUsers(); // Refresh the user list after deletion
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className='container'>
      <div className="header">
        <h2>User List</h2>
        <Button variant="primary" onClick={handleShow}>
          Add User
        </Button>
      </div>

      <AddUserModal show={showModal} handleClose={handleClose} addUser={addUser} updateUser={updateUser} userToEdit={userToEdit}/>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td className='email-td'>
                <div className='email-container'>
                  {user.email}
                </div>
                <div className='button-group'>
                  <Button variant="warning" onClick={() => handleEditClick(user)}>
                      Edit
                    </Button>
                    <Button variant="danger" onClick={() => handleDeleteClick(user.id)}>
                      Delete
                    </Button>
                </div>
              </td>
              
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default UserTable;
