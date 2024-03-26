import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import "./profile-view.scss";
import UserInfo from "./user-info";
import { UpdateUser } from "./update-user";
import { FavoriteMovies } from "./favorite-movies";
import { MovieCard } from "../movie-card/movie-card";

export const ProfileView = ({ user, handleAddToFavorites, movies }) => {
  console.log("===user==", user);
  const localUser = JSON.parse(localStorage.getItem("user")) || {};

  const {
    UserName: storedUserName,
    Email: storedEmail,
    Birthday: storedBirthday,
  } = localUser;

  const [username, setUsername] = useState(storedUserName || "");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(storedEmail || "");
  const [birthday, setBirthday] = useState(storedBirthday || "");

  const favoriteMovies =
    localUser && localUser.FavoriteMovies
      ? movies.filter((m) => localUser.FavoriteMovies.includes(m._id))
      : [];
  console.log(favoriteMovies);

  const formData = {
    UserName: username,
    Email: email,
    Password: password,
    Birthday: birthday,
  };

  const handleSubmit = (event) => {
    event.preventDefault(event);

    fetch(
      `https://fierce-fortress-37859-bd3c98eebee1.herokuapp.com/users/${storedUser.UserName}`,
      {
        method: "PUT",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          alert("Update successful");
          return response.json();
        }
        alert("Update failed");
      })
      .then((data) => {
        localStorage.setItem("user", JSON.stringify(data));
        onSubmit(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleUpdate = (e) => {
    const inputTypeToSetter = {
      user: setUsername,
      password: setPassword,
      email: setEmail,
      birthday: setBirthday,
    };

    const setter = inputTypeToSetter[e.target.type];
    if (setter) {
      setter(e.target.value);
    }
  };

  const handleDeleteAccount = (id) => {
    fetch(
      `https://fierce-fortress-37859-bd3c98eebee1.herokuapp.com/users/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    ).then((response) => {
      if (response.ok) {
        alert("This account has been successfully deleted.");
        localStorage.clear();
        window.location.reload();
      } else {
        alert("Something went wrong.");
      }
    });
  };

  return (
    <div>
      <div style={{ paddingTop: "20px" }}>
        <UserInfo name={user && user.Username} email={user && user.Email} />
      </div>

      <div style={{ paddingTop: "20px" }}>
        <UpdateUser
          handleSubmit={handleSubmit}
          handleUpdate={handleUpdate}
          user={user || {}} // Provide an empty object as default if user is undefined
          formData={formData}
        />
      </div>

      <div>
        <h2 style={{ paddingTop: "20px" }}>My Favorite Flix</h2>
        <div
          className="movie-card-container"
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "flex-start", // Change to flex-start
            width: "100%",
            marginBottom: "20px",
            marginTop: "10px",
          }}
        >
          {favoriteMovies.map((movie) => (
            <div
              key={movie._id}
              style={{
                flex: "0 0 calc(25% - 20px)", // 25% width with 20px space between cards
                marginBottom: "10px", // Add margin to create space between cards
                marginRight: "20px", // Add right margin for space between cards
              }}
            >
              <MovieCard
                movie={movie}
                onAddToFavorites={() => handleAddToFavorites(movie._id)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
