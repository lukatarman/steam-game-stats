import React, { useRef, useEffect } from "react";
import "./navbar.css";

const Navbar = () => {
  return (
    <nav
      class="navbar is-fixed-top is-black"
      role="navigation"
      aria-label="main navigation"
    >
      <div class="navbar-brand">
        <a class="navbar-item" href="https://bulma.io">
          <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28" />
        </a>

        <a
          role="button"
          class="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div id="navbarBasicExample" class="navbar-menu is-active">
        <div class="navbar-end">
          <div class="navbar-item">Search</div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
