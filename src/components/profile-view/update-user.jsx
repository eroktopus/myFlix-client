import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import PropTypes from "prop-types";

export const UpdateUser = ({ user, formData, handleUpdate, handleSubmit }) => {
  return (
    <div>
      <h2>Update User Info</h2>
      <Form className="profile-form" onSubmit={(e) => handleSubmit(e)}>
        <Form.Group controlId="formUsername" style={{ paddingBottom: "10px" }}>
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            name="username"
            defaultValue={user && user.Username}
            onChange={(e) => handleUpdate(e)}
            style={{ width: "200px" }}
          />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            name="password"
            defaultValue={user && user.Password}
            onChange={(e) => handleUpdate(e)}
            style={{ width: "200px" }}
          />
        </Form.Group>

        <div style={{ paddingTop: "20px" }}>
          <Button variant="primary" type="submit">
            Update
          </Button>
        </div>
      </Form>
    </div>
  );
};

UpdateUser.propTypes = {
  formData: PropTypes.object.isRequired,
  handleUpdate: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};
