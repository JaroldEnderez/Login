import React, { useState, useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';

const AddUserModal = ({ show, handleClose, addUser, updateUser, userToEdit }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    if(userToEdit){
      setUsername(userToEdit.username);
      setEmail(userToEdit.email);
      setPassword(''); // Password is usually not prefilled for security reasons
      setRole(userToEdit.role || (roles.length > 0 ? roles[0].name : ''));
    }else {
      setUsername('');
      setEmail('');
      setPassword('');
      setRole(roles.length > 0 ? roles[0].name : '');
    }
  }, [userToEdit,roles])



  const handleRoleChange = (e) => {
    e.preventDefault()
    setRole(e.target.value)
    console.log("Role: ", role)
  }

  const handleDelete = (e) => {

  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (userToEdit) {
      // Update user
      updateUser({ id: userToEdit.id, username, email, password, role });
    } else {
      // Add user
      addUser({ username, email, password, role });
    }
    handleClose();
  };
useEffect(() => {
  const fetchRoles = async() => {
    try{
      const response = await axios.get('http://127.0.0.1:8000/api/roles');
      const rolesData = response.data.roles
      setRoles(rolesData)

    if(rolesData.length === 1){
      setRole(rolesData[0].name)
    }
    }catch(error){
      console.log("An error occured: ", error)
    }
  }

  fetchRoles()
}, [])

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{userToEdit ? 'Edit User' : 'Add User'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formRole">
            <Form.Label>Role</Form.Label>
            <Form.Control
              as="select"
              value={role}
              onChange={handleRoleChange}
              required
            >
            {roles.map((role)=>(
                <option key={role.id} value={role.name}>
                  {role.name}
                </option>
            ))}
            </Form.Control>.
          </Form.Group>
          <Modal.Footer>
              <Button variant="primary" type="submit">
              {userToEdit ? 'Save Changes' : 'Add User'}
            </Button>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
          </Modal.Footer>

        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddUserModal