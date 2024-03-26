import React from "react";
import PropTypes from "prop-types";

function UserInfo({ email, name }) {
  return (
    <div>
      <h2>myFlix Profile</h2>
      <p>
        <strong>User:</strong> {name}
      </p>
      <p>
        <strong>Email:</strong> {email}
      </p>
    </div>
  );
}

UserInfo.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default UserInfo;
