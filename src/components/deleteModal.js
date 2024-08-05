import React, { useState, useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';


const deleteModal = ({userToDelete}) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Delete user {user.id}, {user.name}? This cannot be undone</Modal.Title>
      </Modal.Header>
      <Modal.Body>

      </Modal.Body>
  )
}

export default deleteModal