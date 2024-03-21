import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function UpdateUser ({handleSubmit, handleUpdate, user}) {
  return (
    <Form className='profile-form' onSubmit={(e) => handleSubmit(e)}>
      <Form.Group controlId="formUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type='text'
          name='username'
          defaultValue={user.Username}
          onChange={e => handleUpdate(e)}
          style={{ width: '200px' }} // Adjust the width as needed
        />
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type='password'
          name='password'
          defaultValue={user.Password}
          onChange={e => handleUpdate(e)}
          style={{ width: '200px' }} // Adjust the width as needed
        />
      </Form.Group>

      <div style={{ paddingTop: '10px' }}>
        <Button variant='primary' type='submit'>
          Update
        </Button>
      </div>
    </Form>
  );
}

export default UpdateUser;
