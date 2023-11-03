import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import OpenModalButton from "../OpenModalButton/index";
import CreateDeckModal from "../CreateDeckModal";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <div>
      <div>
        <NavLink exact to="/">
          Home
        </NavLink>
      </div>
      {sessionUser ? (
        <OpenModalButton
          buttonText="Create Deck"
          modalComponent={<CreateDeckModal />}
        />
      ) : null}
      {isLoaded && (
        <div>
          <ProfileButton user={sessionUser} />
        </div>
      )}
    </div>
  );
}

export default Navigation;
