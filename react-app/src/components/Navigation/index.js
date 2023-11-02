import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  let createDeckButton = null;
  if (sessionUser) {
    createDeckButton = (
      <div>
        <button>Create deck</button>
      </div>
    );
  }

  return (
    <div>
      <div>
        <NavLink exact to="/">
          Home
        </NavLink>
      </div>
      {createDeckButton}
      {isLoaded && (
        <div>
          <ProfileButton user={sessionUser} />
        </div>
      )}
    </div>
  );
}

export default Navigation;
