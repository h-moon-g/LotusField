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
    <div id="nav-div">
      <div id="nav-logo-div">
        <NavLink id="nav-home-logo" exact to="/">
          Lotusfield
        </NavLink>
      </div>
      <div id="nav-buttons">
        {sessionUser ? (
          <OpenModalButton
            buttonText="Create Deck"
            id="nav-create"
            modalComponent={<CreateDeckModal />}
          />
        ) : null}
        {isLoaded && <ProfileButton id="nav-profile" user={sessionUser} />}
      </div>
    </div>
  );
}

export default Navigation;
